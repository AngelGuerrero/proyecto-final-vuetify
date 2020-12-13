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
        <p class="text-center">
          {{ pageDescription }}
        </p>
      </v-container>

      <slot :isValid="isValid" :mutate="mutate"></slot>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'ModelosComponent',

  props: {
    /**
     * propmodel.
     *
     * With this information the component
     * will do the validations, respectively,
     * it will check if all required model
     * are valid or not.
     */
    propmodel: {
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
      model: this.propmodel
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
      let retval = { value: true, message: '', data: this.model }

      // console.clear()
      console.group('=== 👾 Validating model 🤞 ===')
      for (const [key, value] of Object.entries(this.model)) {
        console.log(key, ' | valid :>> ', value.validation.valid)

        if (!value.validation.valid) {
          retval = {
            value: false,
            message: `Debes completar todos los campos de '${this.name}'`,
            data: null
          }
          break
        }
      }
      //
      // Only log purposes
      if (retval.value) console.log('🎉🎉🎉 Valid! 🎉🎉🎉')
      console.groupEnd()

      this.setMessage(!retval.value, retval.message)
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
      const retval = Object.entries(this.model).map(item => {
        return {
          [item[0]]: {
            selected: item[1].vmodel
          }
        }
      })
      console.table(retval)
      console.groupEnd()
      console.log('')

      return retval
    },

    setMessage (show, message) {
      this.alert.show = show
      this.alert.message = show ? message : ''
    },

    mutate (model, property, data) {
      this.model[model][property] = data
    }
  }
}
</script>
