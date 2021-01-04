<template>
  <v-container fluid class="pa-3">
    <v-btn color="black" dark>Test</v-btn>

    <!-- Iterates over all steps -->
    <stepper-component
      :steps="steps"
      :currentStep="currentStep.number"
      @on-select-step="selectCurrentStep"
      :mobile="$vuetify.breakpoint.smAndDown"
    ></stepper-component>

    <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
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
      <v-container>
        <stepper-action></stepper-action>
      </v-container>
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
      $getInitialValidation: () => this.getInitialValidation,

      $isFirst: () => this.isFirst,

      $isLast: () => this.isLast,

      $getSteps: () => this.getSteps
    }
  },

  created () {
    this.currentStep = this.steps[0]
  },

  mounted () {
    //
    // Listen events
    EventBus.$on('on-prev-step', () => this.prevStep())

    EventBus.$on('on-next-step', () => this.nextStep())

    EventBus.$on('on-download', () => this.onDownload())
  },

  data () {
    return {
      steps: Steps,
      currentStep: null
    }
  },

  computed: {
    getInitialValidation () {
      if (!this.currentStep) {
        return false
      }

      return this.currentStep.initialValidation
    },

    getSteps () {
      return this.steps
    },

    isFirst () {
      const first = this.steps[0]
      return this.currentStep.number === first.number
    },

    isLast () {
      const last = this.steps[this.steps.length - 1]
      return this.currentStep.number === last.number
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
      //
      // Get the reference
      const model = this.$refs[modelName][0]

      //
      // Update initial validation on this step
      this.steps[this.currentStep.number - 1].initialValidation = true

      //
      // Return the value from a computed property
      return model.$refs.base.isValid.value
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
      // a.download = 'mydata.json' // <--
      const formulario = this.steps.find(el => el.name === 'formulario')
      a.download = formulario.data ? formulario.data.archivo.selected : 'mydata.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
}
</script>
