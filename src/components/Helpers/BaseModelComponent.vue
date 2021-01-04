<template>
  <div>
    <!--
      Alert
      Show error alert if the component is not valid
     -->
    <v-alert v-if="getAlert.message" type="error">
      <div class="justify-center d-flex">
        <span class="font-weight-bold">
          {{ getAlert.message }}
        </span>
      </div>
    </v-alert>

    <v-card-title class="justify-center">
      <h1 class="title text-sm-h4">{{ pageTitle }}</h1>
    </v-card-title>

    <v-container>
      <p class="text-center" v-html="pageDescription"></p>
    </v-container>

    <!--
        DEFAULT
        This is the default slot
     -->
    <slot :isValid="isValid" :mutate="mutate"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseModelComponent',

  inject: ['$getInitialValidation', '$getCurrentStep', '$getAlert'],

  props: {
    /**
     * model.
     *
     * With this information the component
     * will do the validations, respectively,
     * it will check if all required model
     * are valid or not.
     */
    model: {
      type: Object,
      required: true
    },

    /**
     * name.
     *
     * Name of the component.
     * Is required for debug purposes.
     */
    name: {
      type: String,
      required: true
    },

    /**
     * pageTitle.
     *
     * Text of the page that will be shown.
     */
    pageTitle: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * pageDescription.
     *
     * Text description of the page.
     */
    pageDescription: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      //
      // Creates a copy from
      // props for mutate values.
      l_model: this.model
    }
  },

  computed: {
    /**
     * isValid.
     *
     * Computed property for let it know to parent
     * if all model passed as prop are valid or not.
     */
    isValid () {
      if (this.getCurrentStep.name !== this.name) {
        const val = { value: false, message: `'${this.name}' actually is not being validated`, data: null }
        console.warn('val.message :>> ', val.message)
        return val
      }

      return this.validateItems(this.l_model)
    },

    getInitialValidation () {
      return this.$getInitialValidation()
    },

    getCurrentStep () {
      return this.$getCurrentStep()
    },

    getAlert () {
      return this.$getAlert()
    }
  },

  methods: {
    //
    // Return selected data
    validateModel (callback) {
      console.log(`%c✨ Validating '${this.name}'✨`, 'color:skyblue;')
      return callback(this.isValid)
    },

    validateItems (items) {
      let retval = { value: true, message: '', data: items }

      if (!this.getInitialValidation) {
        return { value: false, message: '', data: null }
      }

      console.log('')
      console.group(`=== 👾 Validating model '${this.name}' 🤞 ===`)
      const notValid = Object.values(items).some(value => !value.validation.valid)
      console.log('notValid :>> ', notValid)

      if (notValid) {
        retval = {
          value: false,
          message: `Debes completar todos los campos de la sección '${this.pageTitle}'`,
          data: null
        }
      }

      console.groupEnd()
      console.log('')

      //
      // Only log purposes
      if (retval.value) console.log('🎉🎉🎉 Valid! 🎉🎉🎉')

      return retval
    },

    getData () {
      console.log('')
      console.group('===== Select data for return ===== ')

      const getchilds = items => {
        if (!items[0]) return {}

        const retval = []

        for (const value of Object.values(items[0])) {
          retval.push({
            name: value.name,
            selected: value.vmodel
          })
        }

        return retval
      }

      const retval = Object.entries(this.l_model).map(item => {
        const data = {
          [item[0]]: {
            selected: item[1].vmodel,
            childs: []
          }
        }

        if (item[1].hasChilds) {
          data[item[0]].childs.push(getchilds(item[1].items))
        }

        return data
      })

      console.table(retval)
      console.log(JSON.stringify(retval, null, 4))
      console.groupEnd()
      console.log('')

      return retval
    },

    mutate (model, property, data) {
      this.l_model[model.name][property] = data
    }
  }
}
</script>
