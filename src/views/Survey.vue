<template>
  <v-container :fluid="$vuetify.breakpoint.mdAndDown" class="pa-3">
    <!-- Iterates over all steps -->
    <stepper-component
      :steps="steps"
      :currentStep="currentStep.number"
      @on-select-step="selectCurrentStep"
      :mobile="$vuetify.breakpoint.smAndDown"
    ></stepper-component>

    <!--
        NOTE: Shows different structure for not mobile screens,
              basically show the component without header, and content outside.
    -->
    <v-card class="elevation-10 pa-4" v-show="!$vuetify.breakpoint.smAndDown">
      <component
        v-for="step in steps"
        :key="step.id"
        :is="step.component + '-component'"
        v-show="currentStep.number === step.number"
        :ref="step.component"
        :step="step"
        :initialValidation="step.initialValidation"
      ></component>
      <stepper-action></stepper-action>
      <v-container></v-container>
    </v-card>
  </v-container>
</template>

<script>
import StepperComponent from '@/components/StepperComponent'
import StepperAction from '@/components/StepperAction'
// Modelos dinámicos
import ModelosComponent from '@/components/ModelosComponent'
import SociodemograficosComponent from '@/components/SociodemograficosComponent'
import ComportamientoComponent from '@/components/ComportamientoComponent'
import GeograficosComponent from '@/components/GeograficosComponent'
import DatosComponent from '@/components/DatosComponent'
import FormularioComponent from '@/components/FormularioComponent'
import Steps from '@/models/Steps'
import { EventBus } from '@/EventBus.js'

export default {
  name: 'SurveyView',

  components: {
    StepperComponent,
    StepperAction,
    ModelosComponent,
    SociodemograficosComponent,
    ComportamientoComponent,
    GeograficosComponent,
    DatosComponent,
    FormularioComponent
  },

  provide () {
    return {
      $isFirst: () => this.isFirst,

      $isLast: () => this.isLast,

      $getSteps: () => this.getSteps,

      $getCurrentStep: () => this.getCurrentStep,

      $getInitialValidation: () => this.getInitialValidation,

      $getAlert: () => this.getAlert
    }
  },

  created () {
    this.currentStep = this.steps[0]

    //
    // Listen events
    EventBus.$on('on-prev-step', () => {
      this.prevStep()
    })

    EventBus.$on('on-next-step', () => {
      this.nextStep()
    })

    EventBus.$on('on-download', () => {
      this.onDownload()
    })
  },

  data () {
    return {
      steps: Steps,
      currentStep: null,
      alert: {
        type: 'error',
        message: null
      }
    }
  },

  computed: {
    isFirst () {
      const first = this.steps[0]
      return this.currentStep.number === first.number
    },

    isLast () {
      const last = this.steps[this.steps.length - 1]
      return this.currentStep.number === last.number
    },

    getSteps () {
      return this.steps
    },

    getCurrentStep () {
      return this.currentStep
    },

    getInitialValidation () {
      if (!this.currentStep) {
        return false
      }

      return this.currentStep.initialValidation
    },

    getAlert () {
      return this.alert
    },

    showNext () {
      return !this.isLast && this.currentStep.validate
    }
  },

  methods: {
    selectCurrentStep (step) {
      this.currentStep = step
    },

    prevStep () {
      //
      // Check not to be less or equal than first element
      if (this.currentStep.number - 1 <= 0) return
      this.currentStep = this.steps[this.currentStep.number - 2]
      window.scrollTo(0, 0)
    },

    nextStep () {
      window.scrollTo(0, 0)

      //
      // Check if the next is the last step
      if (this.currentStep.number + 1 > this.steps[this.steps.length - 1].number) {
        return
      }

      //
      // Check if is valid before continue
      if (!this.validateCurrentModel(this.currentStep.component)) {
        return
      }

      //
      // Mark current step as valid
      this.steps[this.currentStep.number - 1].valid = true

      // Save the data into data steps
      this.saveDataFromCurrentModel()

      //
      // Next step
      this.currentStep = this.steps[this.currentStep.number]
    },

    validateCurrentModel (modelName) {
      window.scrollTo(0, 0)
      //
      // Update initial validation on this step
      this.steps[this.currentStep.number - 1].initialValidation = true

      //
      // Check if the model in refs is not undefined
      if (this.$refs[modelName][0]) {
        const model = this.$refs[modelName][0]
        //
        // Is the same action for evert each model, then, exists a function
        // that performs this action for all models, exists in baseMixin file.
        //
        // If you need some special action based in the response,
        // then you can override it inside of the model.
        const getval = model.validateModel()

        //
        // Based in the response of validation of this model set an according message.
        this.alert.message = getval.message

        return getval.value
      }

      return false
    },

    saveDataFromCurrentModel () {
      const baseComponent = this.$refs[this.currentStep.component][0].$refs.base

      const getval = baseComponent.getData()

      const index = this.steps.findIndex(item => item.number === this.currentStep.number)

      this.steps[index].data = getval

      EventBus.$emit('on-set-notification', '¡Datos guardados correctamente!')
    },

    onDownload () {
      if (!this.validateCurrentModel(this.currentStep.component)) return

      //
      // Mark current step as valid
      this.steps[this.currentStep.number - 1].valid = true

      this.saveDataFromCurrentModel()

      this.download()
    },

    download () {
      const data = JSON.stringify(this.steps)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      //
      // Change this for the name of the file
      // requested at the end of the program.
      a.download = `${this.getFileName().data}.json`

      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },

    getFileName () {
      const retval = { error: false, message: 'ok', data: 'mydata' }

      try {
        const formulario = this.steps.find(el => el.name === 'formulario')

        if (formulario) {
          const archivo = formulario.data.find(el => Object.keys(el)[0] === 'archivo').archivo
          retval.data = archivo.selected
        }
      } catch (error) {
        retval.error = true
        retval.message = error.message
      }

      return retval
    }
  }
}
</script>
