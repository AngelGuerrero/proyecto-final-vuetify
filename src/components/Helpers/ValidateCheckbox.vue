<template>
  <div>
    <!-- <pre>
      {{ $data }}
    </pre> -->
    <p v-show="results.message" class="help error--text mt-3">
      {{ results.message }}
    </p>

    <v-checkbox
      v-for="item in localItems"
      :key="item.id"
      v-model="item.checked"
      :label="item.slug"
      :name="item.group"
      :checked="item.checked"
      :value="item.slug"
      :error="!results.valid"
    ></v-checkbox>
  </div>
</template>

<script>
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
    items: {
      type: Array,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
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

    validation: {
      type: String,
      required: true,
      validator: function (value) {
        return ['none', 'one', 'all'].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      results: results(),

      localItems: Array.from(this.items)
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
        this.results = this.validate(this.validation, newValue)

        this.emitValidate(this.results)
        this.emitChange(this.localItems)
      }
    }
  },

  methods: {
    /**
     * validate
     *
     * Validate all the checkboxes rendered
     * based in type validation indicated as
     * the prop.
     */
    validate (validation, items) {
      let retval = { valid: true, message: '' }

      switch (validation) {
        //
        // Case require at least some checkbox checked
        //
        case 'one':
          retval = this.validateAtLeastOne(items)
          break
        //
        // Case require all checkboxes checked
        //
        case 'all':
          retval = this.validateAll(items)
          break
        //
        // Case component does not require validations
        //
        case 'none':
          retval.valid = false
          retval.message = this.message
            ? this.message
            : 'Component has not validations.'
          break
        default:
          break
      }

      return retval
    },

    /**
     * validateAtLeastOne
     *
     * Validate at least one of the checkboxes be checked.
     */
    validateAtLeastOne (items) {
      const retval = { valid: true, message: '' }

      const valid = items.some(item => item.checked)

      if (!valid) {
        retval.valid = false
        retval.message = this.message
          ? this.message
          : `Debes seleccionar un campo de ${this.title}`
        return retval
      }

      return retval
    },

    /**
     * validateAll
     *
     * Validates all checkboxes be checked
     */
    validateAll (items) {
      const retval = { valid: true, message: '' }

      const valid = items.every(item => item.checked)

      if (!valid) {
        retval.valid = false
        retval.message = this.message
          ? this.message
          : `Debes seleccionar todos los campos de ${this.title}.`
        return retval
      }

      return retval
    },

    //
    // Private
    //

    emitValidate (data) {
      this.$emit('on-validate', data)
    },

    emitChange (data) {
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
