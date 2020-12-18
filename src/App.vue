<template>
  <v-app id="vuetify-app">
    <div id="wrapper">
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

      <nav id="my_nav">
        <navbar-component />
      </nav>

      <div id="content" class="blue-grey lighten-5">
        <v-main class="pb-9">
          <v-container fluid>
            <!-- Contiene la visualización de los pasos a seguir -->
            <header-component
              :steps="steps"
              :currentStep="currentStep.number"
              @on-select-step="selectCurrentStep"
            ></header-component>

            <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
            <v-card class="py-3 elevation-10">
              <div>
                <component
                  v-for="step in steps"
                  :key="step.id"
                  :is="step.component + '-component'"
                  v-show="currentStep.number === step.number"
                  :ref="step.component"
                  :step="step"
                  :initialValidation="step.initialValidation"
                ></component>
              </div>

              <!-- Controles para recorrer los pasos -->
              <v-card-actions>
                <!-- Prev step -->
                <v-btn v-if="!isFirst" @click="prevStep" color="secondary">
                  Anterior
                </v-btn>

                <!-- Next step -->
                <v-btn v-if="!isLast" @click="nextStep" color="primary" class="ml-auto">
                  Siguiente
                </v-btn>

                <!-- Download information -->
                <v-btn v-if="isLast" @click="onDownload" color="success" class="ml-auto">
                  Descargay y enviar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-main>
      </div>

      <div id="my_footer" class="d-flex justify-center align-center black">
        <p class="white--text mb-0">
          © 2020 | Proyecto Final UAEM
        </p>
      </div>
    </div>
  </v-app>
</template>

<script>
// import Vue from 'vue'
import HeaderComponent from './components/HeaderComponent'
import NavbarComponent from './components/NavbarComponent'
// Modelos dinámicos
import ModelosComponent from './components/ModelosComponent'
import SociodemograficosComponent from './components/SociodemograficosComponent'
import ComportamientoComponent from './components/ComportamientoComponent'
import GeograficosComponent from './components/GeograficosComponent'
import DatosComponent from './components/DatosComponent'
import FormularioComponent from './components/FormularioComponent'
// Models
import Steps from './models/Steps'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    HeaderComponent,
    ModelosComponent,
    SociodemograficosComponent,
    ComportamientoComponent,
    GeograficosComponent,
    DatosComponent,
    FormularioComponent
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
      // this.currentStep.initialValidation = true
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
