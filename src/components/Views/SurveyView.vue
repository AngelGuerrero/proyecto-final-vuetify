<template>
  <div>
    <v-btn color="black" dark @click="mobile = !mobile">Toggle mobile</v-btn>

    <!-- <example-component></example-component> -->

    <!-- Iterates over all steps -->
    <stepper-component
      :steps="steps"
      :currentStep="currentStep.number"
      @on-select-step="selectCurrentStep"
      :mobile="mobile"
    ></stepper-component>

    <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
    <v-card class="elevation-10 pa-4" v-show="!mobile">
      <component
        v-for="step in steps"
        :key="step.id"
        :is="step.component + '-component'"
        v-show="currentStep.number === step.number"
        :ref="step.component"
        :step="step"
        :initialValidation="step.initialValidation"
      ></component>

      <!-- Control steps -->
      <v-card-actions>
        <!-- Prev step -->
        <v-btn v-if="!isFirst" @click="prevStep" color="black" dark>
          Anterior
        </v-btn>

        <!-- Next step -->
        <v-btn v-if="!isLast" @click="nextStep" color="indigo" dark class="ml-auto">
          Siguiente
        </v-btn>

        <!-- Download information -->
        <v-btn v-if="isLast" @click="onDownload" color="success" class="ml-auto">
          Descargay y enviar
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Show notification -->
    <v-snackbar
      v-model="notification.show"
      :timeout="notification.timeout"
      top
      right
      :color="notification.error ? 'error' : 'success'"
      elevation="24"
      class="white--text"
    >
      <h3>
        {{ notification.message }}
      </h3>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import StepperComponent from '@/components/StepperComponent'
// Modelos dinámicos
import ModelosComponent from '@/components/ModelosComponent'
import SociodemograficosComponent from '@/components/SociodemograficosComponent'
import ComportamientoComponent from '@/components/ComportamientoComponent'
import GeograficosComponent from '@/components/GeograficosComponent'
import DatosComponent from '@/components/DatosComponent'
import FormularioComponent from '@/components/FormularioComponent'
import Steps from '@/models/Steps'

import ExampleComponent from '@/components/ExampleComponent'

export default {
  name: 'SurveyView',

  components: {
    StepperComponent,
    ModelosComponent,
    SociodemograficosComponent,
    ComportamientoComponent,
    GeograficosComponent,
    DatosComponent,
    FormularioComponent,
    // example
    ExampleComponent
  },

  provide () {
    return {
      $getInitialValidation: () => this.getInitialValidation
    }
  },

  created () {
    this.currentStep = this.steps[0]
  },

  data () {
    return {
      steps: Steps,
      currentStep: null,

      mobile: false,

      notification: {
        show: false,
        timeout: 7000,
        error: false,
        message: ''
      }
    }
  },

  computed: {
    getInitialValidation () {
      if (!this.currentStep) {
        return false
      }

      return this.currentStep.initialValidation
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
      // Update its initial validation for this current step
      this.steps[this.currentStep.number - 1].initialValidation = true

      //
      // Return the value from a computed
      // property of the component
      return model.$refs.base.isValid.value
    },

    saveDataFromCurrentModel () {
      if (!this.validateCurrentModel(this.currentStep.component)) return

      const baseComponent = this.$refs[this.currentStep.component][0].$refs.base

      const getval = baseComponent.getData()

      const index = this.steps.findIndex(item => item.number === this.currentStep.number)

      this.steps[index].data = getval

      this.setNotification('¡Datos guardados correctamente!')
    },

    setNotification (message, error) {
      this.notification.show = true
      this.notification.error = error || false
      this.notification.message = message
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
      a.download = 'mydata.json' // <--
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
}
</script>
