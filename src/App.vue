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
            <!-- FIX: REMOVE ON PROD -->
            <header-component
              v-if="!wqo64ijap1.xm2wgc167y"
              :steps="steps"
              :currentStep="currentStep.number"
              @onSelectStep="selectCurrentStep"
            ></header-component>

            <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
            <v-card class="py-3 elevation-10">
              <v-container v-if="wqo64ijap1.xm2wgc167y" class="px-3">
                <div class="red pa-3 rounded elevation-3">
                  <h3
                    class="text-center white--text"
                    background-color="error"
                    color="error"
                  >
                    {{ wqo64ijap1.message }}
                  </h3>
                </div>
              </v-container>

              <!-- FIX: REMOVE ON PROD -->
              <div v-if="!wqo64ijap1.xm2wgc167y">
                <!-- FIX: TEST -->
                <v-container fluid>
                  <v-btn @click="setNotification('Prueba desde botón')" color="primary">
                    <v-icon class="mr-2">mdi-alert-circle</v-icon>
                    Test
                  </v-btn>
                </v-container>
                <!-- FIX: TEST -->

                <component
                  v-for="step in steps"
                  :key="step.id"
                  :is="step.component + '-component'"
                  v-show="currentStep.number === step.number"
                  :ref="step.component"
                  :step="step"
                ></component>
              </div>

              <!-- Controles para recorrer los pasos -->
              <!-- FIX: REMOVE ON PROD -->
              <v-card-actions v-if="!wqo64ijap1.xm2wgc167y">
                <!-- Prev step -->
                <v-btn v-if="!isFirst" color="secondary" @click="prevStep">
                  Anterior
                </v-btn>

                <!-- Next step -->
                <v-btn v-if="!isLast" color="primary" @click="nextStep" class="ml-auto">
                  Siguiente
                </v-btn>

                <!-- Download information -->
                <v-btn v-if="isLast" color="success" class="ml-auto">
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
// Dev
import devtools from 'devtools-detect'

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

  created () {
    this.currentStep = this.steps[1]
  },

  // FIX: REMOVE IN PROD
  mounted () {
    // this.zf9ssmc8rg()
  },

  data () {
    return {
      currentStep: null,
      steps: Steps,

      notification: {
        show: true,
        timeout: 7000,
        error: false,
        message: ''
      },

      collectedDataFromModels: [],

      // FIX: REMOVE ON PROD
      wqo64ijap1: {
        xm2wgc167y: false,
        message: ''
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

      this.saveDataFromCurrentModel()
      this.currentStep = this.steps[this.currentStep.number]
    },

    validateCurrentModel (modelName) {
      //
      // Throw a validation method for current component
      const model = this.$refs[modelName][0]

      model.validateModel()

      //
      // Return the value from a computed
      // property of the component
      return model.$refs.base.isValid.value
    },

    saveDataFromCurrentModel () {
      if (!this.validateCurrentModel) return

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

    // =============================================
    // FIX: REMOVE ON PROD
    // =============================================
    zf9ssmc8rg () {
      const that = this

      this.checkOpenDevToolsFromChrome()

      this.checkDevTools()

      this.onResize()

      const body = document.getElementsByTagName('body')[0]
      body.addEventListener('contextmenu', e => {
        that.showUnlicensedMessage()
        e.preventDefault()
      })

      document.onkeydown = function (e) {
        // prevent key CTRL + U
        if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
          return false
        }
        // prevent key F12
        if (event.keyCode === 123) {
          that.showUnlicensedMessage()
          return false
        }

        // prevent CTRL + Shift + I
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
          that.showUnlicensedMessage()
          return false
        }

        // prevent CTRL + Shift + J
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
          that.showUnlicensedMessage()
          return false
        }

        // prevent CTRL + S
        if (e.ctrlKey && e.keyCode === 'S'.charCodeAt(0)) {
          that.showUnlicensedMessage('Aún no es posible guardar el proyecto.')
          return false
        }
      }
    },

    showUnlicensedMessage (message) {
      this.wqo64ijap1.xm2wgc167y = true
      this.wqo64ijap1.message = message || 'Sin permiso para ver el código fuente.'
    },

    checkDevTools () {
      if (devtools.isOpen) {
        this.showUnlicensedMessage()
      }
    },

    checkOpenDevToolsFromChrome () {
      const that = this
      const element = new Image()

      Object.defineProperty(element, 'id', {
        get: function () {
          alert('No trates de abrir las dev tools')
          that.showUnlicensedMessage()
        }
      })

      console.log('%c', element)
    },

    onResize () {
      window.addEventListener('resize', () => this.checkOpenDevToolsFromChrome())
    }
  }
}
</script>
