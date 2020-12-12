<template>
  <component :is="wrapper" :class="wrapperClasses">
    <!--
        HEADER
        Slot header. Injects results data of validations
        to handle in parent component.
      -->
    <slot name="header" :results="results">
      <p v-show="results.message" class="help error--text mt-3" :class="headerClasses">
        {{ results.message }}
      </p>
    </slot>

    <component :is="tag" :class="contentClasses">
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

    <!--
        FOOTER
        Slot footer. Injects results data of validations, and
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
      type: Section,
      required: false,
      default: () => ({})
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
    if (this.model) {
      this.localModel = Section.getNewInstance(this.model)
      this.localItems = this.localModel.getItems()
    }

    this.localMessage = this.validation === 'all' && this.message ? this.message : null
  },

  data () {
    return {
      results: results(),

      localModel: null,
      localItems: this.items || [],
      localTitle: this.title || this.model.getTitle() || null,
      localMessage: this.message || this.model.getErrorMessages() || null
    }
  },

  watch: {
    /**
     * Watch changes of items passed as prop
     */
    localItems: {
      deep: true,
      immediate: true,
      handler (newValue) {
        //
        // In every change perform validation
        // and emit the result to parent,
        // using a custom event.
        //
        this.results = this.$_validateCheckboxes(this.validation, newValue)

        this.$_emitValidateOfCheckboxes(this.results)
        this.$_emitChangeOfCheckboxes(this.localItems)
      }
    }
  },

  methods: {
    validate () {
      this.$_validateCheckboxes(this.validation, this.items)
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
          retval = this.$_validateAtLeastOneCheckbox(items)
          break
        //
        // Case require all checkboxes checked
        //
        case 'all':
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
          ? this.localMessage
          : `Debes seleccionar un campo de ${this.localTitle}`
        return retval
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
          ? this.localMessage
          : `Debes seleccionar todos los campos de ${this.localTitle}.`
        return retval
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
