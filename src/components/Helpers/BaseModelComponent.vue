<template>
  <div>
    <!--
      Alert
      Show error alert if the component is not valid
     -->
    <v-container fluid>
      <v-alert v-if="alert.show" type="error" elevation="1">
        <div class="d-flex justify-center">
          {{ isValid.message }}
        </div>
      </v-alert>
    </v-container>

    <v-card-title class="justify-center">
      <h1 class="text-center subtitle-1 text-sm-h4">{{ pageTitle }}</h1>
    </v-card-title>

    <!--
        DEFAULT
        This is the default slot
     -->
    <v-card-text>
      <!--
          DESCRIPTION
          Description of the section.
        -->
      <v-container>
        <p class="text-center" v-html="pageDescription"></p>
      </v-container>

      <slot :isValid="isValid" :mutate="mutate"></slot>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'BaseModelComponent',

  inject: ['$getInitialValidation'],

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
      // Alert object to show a message to user.
      alert: {
        show: false,
        message: null
      },

      //
      // Creates a copy from
      // props for mutate values.
      l_model: this.model
    }
  },

  computed: {
    getInitialValidation () {
      return this.$getInitialValidation()
    },

    /**
     * isValid.
     *
     * Computed property for let it know to parent
     * if all model passed as prop are valid or not.
     */
    isValid () {
      let retval = { value: true, message: '', data: this.l_model }

      if (!this.getInitialValidation) {
        this.setMessage(false, '')
        return {
          value: false,
          message: 'Validación inicial ignorada',
          data: null
        }
      }

      console.log('')
      console.group(`=== 👾 Validating model '${this.name}' 🤞 ===`)
      for (const [key, value] of Object.entries(this.l_model)) {
        console.log(key, ' | valid :>> ', value.validation.valid)

        if (!value.validation.valid) {
          retval = {
            value: false,
            message: `Debes completar todos los campos de la sección '${this.pageTitle}'`,
            data: null
          }
          this.setMessage(!retval.value, retval.message)
          break
        }
      }
      console.groupEnd()
      console.log('')

      //
      // Only log purposes
      if (retval.value) console.log('🎉🎉🎉 Valid! 🎉🎉🎉')

      return retval
    }
  },

  methods: {
    //
    // Return selected data
    validateModel (callback) {
      console.log(`%c✨ Validating '${this.name}'✨`, 'color:skyblue;')
      return callback(this.isValid)
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

      // console.table(retval)
      // console.log(JSON.stringify(retval, null, 4))
      console.groupEnd()
      console.log('')

      return retval
    },

    setMessage (show, message) {
      this.alert.show = show
      this.alert.message = show ? message : ''
    },

    mutate (model, property, data) {
      this.l_model[model.name][property] = data
    }
  }
}
</script>
