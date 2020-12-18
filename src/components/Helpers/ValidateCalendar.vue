<template>
  <div>
    <slot :results="results"></slot>
  </div>
</template>

<script>
const results = () => ({
  valid: false,
  message: ''
})

export default {
  name: 'ValidateCalendar',

  props: {
    model: {
      type: [Array, String],
      required: true
    },

    rules: {
      type: String,
      required: true,
      validator: function (value) {
        return value.split('|').some(el => ['required', 'range', 'none'].includes(el))
      }
    },

    field: {
      type: String,
      required: false
    },

    message: {
      type: String,
      required: false,
      default: ''
    }
  },

  mounted () {
    //
    // If vmodel is not Array
    if (Array.isArray(this.model)) {
      this.modelArray = this.model
    } else {
      this.modelString = this.model
    }
  },

  data () {
    return {
      results: results(),
      modelArray: [],
      modelString: ''
    }
  },

  watch: {
    model: {
      handler (newVal) {
        if (Array.isArray(this.model)) {
          this.modelArray = newVal
        } else {
          this.modelString = newVal
        }
      }
    },

    modelArray: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.results = this.validate(newVal, 'array')
        //
        // Emit change event
        this.emitChange(newVal)
        //
        // Emit validation event
        this.emitValidation(this.results)
      }
    },

    modelString: {
      handler (newVal) {
        this.results = this.validate(newVal, 'string')
        //
        // Emit change event
        //
        // Emit validation event
      }
    }
  },

  methods: {
    validate (values, flag) {
      let retval

      for (const fn of this.rules.split('|')) {
        retval = this[fn](values, flag)
        if (!retval.valid) return retval
      }

      return retval
    },

    required (vmodel, flag) {
      //
      // If vmodel is string
      if (flag === 'string') {
        return this.$_requiredStringType(vmodel)
      }

      //
      // If the vmodel is Array
      return this.$_requiredArrayType(vmodel)
    },

    $_requiredArrayType (vmodel) {
      if (vmodel === [] || vmodel.length <= 0 || vmodel === undefined || vmodel === null) {
        return this.setResults(
          false,
          this.getMessage(`El campo ${this.field ? `para "${this.field}"` : ''} es requerido.`)
        )
      }

      return this.setResults(true)
    },

    $_requiredStringType (vmodel) {
      if (vmodel === undefined || vmodel === null || vmodel === '') {
        return this.setResults(
          false,
          this.getMessage(`El campo ${this.field ? `para "${this.field}"` : ''} es requerido.`)
        )
      }

      return this.setResults(true)
    },

    range (vmodel, flag) {
      if (vmodel && vmodel.length < 2) {
        return this.setResults(
          false,
          this.getMessage(
            `Se necesita especificar una fecha fin ${
              this.field ? `para el campo "${this.field}"` : ''
            }`
          )
        )
      }

      return this.setResults(true)
    },

    none (values, flag = null) {
      return this.setResults(true, 'Sin validación')
    },

    getMessage (message) {
      return message || 'Falló la validación'
    },

    setResults (valid, message = null) {
      return {
        valid: valid,
        message: message || ''
      }
    },

    emitChange (data) {
      this.$emit('on-change', data)
    },

    emitValidation (data) {
      this.$emit('on-validate', data)
    }
  }
}
</script>
