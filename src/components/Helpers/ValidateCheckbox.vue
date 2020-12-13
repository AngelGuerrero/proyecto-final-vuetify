<template>
  <component :is="wrapper" :class="wrapperClasses">
    <!--
        HEADER
        custom header. Injects results data of validations
        to handle in parent component.
      -->
    <slot name="header" :results="results">
      <p v-show="results.message" class="help error--text mt-3" :class="headerClasses">
        {{ results.message }}
      </p>
    </slot>

    <component v-if="!custom" :is="tag" :class="contentClasses">
      <v-checkbox
        v-for="item in localItems"
        :key="item.id"
        v-model="item.checked"
        :label="item.slug"
        :name="item.group"
        :checked="item.checked"
        :value="item.slug"
        :error="!results.valid"
        :success="successStatus ? results.valid : null"
        :class="itemsClasses"
      ></v-checkbox>
    </component>

    <component :is="tag" :class="contentClasses" v-if="custom">
      <!-- <pre>
        {{ $data }}
      </pre> -->
      <slot :results="results"></slot>
    </component>

    <!--
        FOOTER
        custom footer. Injects results data of validations, and
        injects a validate function to perform from parent.
      -->
    <slot name="footer" :results="results" :validate="validate"></slot>
  </component>
</template>

<script>
import Section from '../../models/Section'

//
// Data
//
const results = () => ({
  valid: false,
  message: ''
})

export default {
  name: 'ValidateCheckbox',

  props: {
    custom: {
      type: Boolean,
      required: false,
      default: false
    },

    wrapper: {
      type: String,
      required: false,
      default: 'div'
    },

    tag: {
      type: String,
      required: false,
      default: 'div'
    },

    wrapperClasses: {
      type: String,
      required: false,
      default: null
    },

    headerClasses: {
      type: String,
      required: false,
      default: null
    },

    contentClasses: {
      type: String,
      required: false,
      default: null
    },

    itemsClasses: {
      type: String,
      reqired: false,
      default: null
    },

    //
    // You can pass only class model Checkbox
    model: {
      type: Object,
      required: false,
      default: null
    },

    items: {
      type: Array,
      required: false,
      default: () => []
    },

    title: {
      type: String,
      required: false,
      default: null
    },

    /**
     * message
     *
     * Custom message when validation has errors
     */
    message: {
      type: String,
      required: false,
      default: ''
    },

    successStatus: {
      type: Boolean,
      required: false,
      default: false
    },

    validation: {
      type: String,
      required: true,
      validator: function (value) {
        return ['none', 'one', 'all'].indexOf(value) !== -1
      }
    }
  },

  created () {
    this.localModel = this.model ? Section.getNewInstance(this.model) : null
    this.localItems = this.model ? this.localModel.getItems() : this.items ? this.items : []
    debugger

    this.localMessage =
      this.message !== ''
        ? this.message
        : this.validation === 'one'
          ? `Debes seleccionar un campo ${this.model ? 'de ' + this.model.getTitle() : ''}`
          : this.validation === 'all'
            ? `Debes seleccionar todos los campos ${this.model ? 'de ' + this.model.getTitle() : ''}`
            : ''
  },

  mounted () {
    this.validate(this.localItems)
  },

  data () {
    return {
      results: results(),

      localModel: null,
      localItems: this.items || [],
      localTitle: this.title || this.model.getTitle() || null,
      localMessage: ''
    }
  },

  watch: {
    /**
     * Watch changes of items passed as prop
     */
    items: {
      deep: true,
      immediate: true,
      handler (newValue) {
        console.group('🌟⚡ Validando items ⚡🌟')
        this.validate(newValue)
        console.groupEnd()
      }
    },

    localItems: {
      deep: true,
      immediate: true,
      handler (newValue) {
        console.group('🌟⚡ Validando local items ⚡🌟')
        this.validate(newValue)
        console.groupEnd()
      }
    }
  },

  methods: {
    validate (newValue) {
      //
      // In every change perform validation
      // and emit the result to parent,
      // using a custom event.
      //
      this.results = this.$_validateCheckboxes(this.validation, newValue)

      this.$_emitValidateOfCheckboxes(this.results)
      this.$_emitChangeOfCheckboxes(newValue)
    },

    // ==================
    // Private
    // ==================

    /**
     * Validate checkboxes
     *
     * Private function that
     * validates all the checkboxes rendered
     * based in type validation indicated as
     * the prop.
     */
    $_validateCheckboxes (validation, items) {
      let retval = { valid: true, message: '' }

      switch (validation) {
        //
        // Case require at least some checkbox checked
        //
        case 'one':
          console.log('🤞 Validating one item 🤞')
          retval = this.$_validateAtLeastOneCheckbox(items)
          break
        //
        // Case require all checkboxes checked
        //
        case 'all':
          console.log('🤞 Validating all items 🤞')
          retval = this.$_validateAllCheckboxes(items)
          break
        //
        // Case component does not require validations
        //
        case 'none':
          retval.valid = true
          retval.message = this.message ? this.message : null
          break
        default:
          break
      }

      return retval
    },

    /**
     * $_validateAtLeastOneCheckbox
     *
     * Validate at least one of the checkboxes be checked.
     */
    $_validateAtLeastOneCheckbox (items) {
      const retval = { valid: true, message: '' }

      const valid = items.some(item => item.checked)

      if (!valid) {
        retval.valid = false
        retval.message = this.localMessage
      }

      return retval
    },

    /**
     * $_validateAllCheckboxes
     *
     * Validates all checkboxes be checked
     */
    $_validateAllCheckboxes (items) {
      const retval = { valid: true, message: '' }

      const valid = items.every(item => item.checked)

      if (!valid) {
        retval.valid = false
        retval.message = this.localMessage
      }

      return retval
    },

    $_emitValidateOfCheckboxes (data) {
      this.$emit('on-validate', data)
    },

    $_emitChangeOfCheckboxes (data) {
      const retval = data
        .filter(item => item.checked)
        .reduce((acc, curr) => {
          acc.push(curr.slug)
          return acc
        }, [])
      this.$emit('on-change', retval)
    }
  }
}
</script>
