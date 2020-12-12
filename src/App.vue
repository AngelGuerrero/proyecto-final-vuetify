<template>
  <v-app id="vuetify-app">
    <div id="wrapper">
      <nav id="my_nav">
        <navbar-component />
      </nav>

      <div id="content" class="blue-grey lighten-5">
        <v-main class="pb-9">
          <v-container>
            <!-- Contiene la visualización de los pasos a seguir -->
            <!-- FIX: REMOVE ON PROD -->
            <header-component
              v-if="!licensed.show"
              :steps="steps"
              :currentStep="currentStep.number"
              @onSelectStep="selectCurrentStep"
            ></header-component>

            <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
            <v-card class="py-3 elevation-10">
              <v-container v-if="licensed.show" class="px-3">
                <div class="red pa-3 rounded elevation-3">
                  <h3
                    class="text-center white--text"
                    background-color="error"
                    color="error"
                  >
                    {{ licensed.message }}
                  </h3>
                </div>
              </v-container>

              <!-- FIX: Consultar la mejor manera de mostrar este mensaje -->
              <!-- <v-container>
                <v-alert type="warning">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, quisquam?
                </v-alert>
              </v-container> -->

              <!-- FIX: REMOVE ON PROD -->
              <div v-if="!licensed.show">
                <modelos-component
                  v-show="currentStep.number === 1"
                  :ref="currentStep.component"
                  :name="currentStep.component"
                  :title="currentStep.title"
                />

                <sociodemograficos-component
                  v-show="currentStep.number === 2"
                />

                <comportamiento-component v-show="currentStep.number === 3" />

                <geograficos-component v-show="currentStep.number === 4" />

                <datos-component v-show="currentStep.number === 5" />

                <formulario-component v-show="currentStep.number === 6" />
              </div>

              <!-- Controles para recorrer los pasos -->
              <!-- FIX: REMOVE ON PROD -->
              <v-card-actions>
                <v-btn v-if="!isFirst" color="secondary" @click="prevStep">
                  Anterior
                </v-btn>

                <v-btn
                  v-if="!isLast"
                  color="primary"
                  @click="nextStep"
                  class="ml-auto"
                >
                  Siguiente
                </v-btn>
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
    this.currentStep = this.steps[0]
  },

  // FIX: REMOVE IN PROD
  mounted () {
    // this.security()
    // console.log(this.$refs[this.currentStep.component].isValid)
  },

  data: () => ({
    currentStep: null,
    steps: [
      { title: 'Modelos', number: 1, component: 'modelos' },
      {
        title: 'Sociodemográficos',
        number: 2,
        component: 'sociodemograficos'
      },
      {
        title: 'Comportamiento del cliente',
        number: 3,
        component: 'comportamiento'
      },
      {
        title: 'Geográficos',
        number: 4,
        component: 'geograficos'
      },
      { title: 'Datos', number: 5, component: 'datos' },
      {
        title: 'Formulario',
        number: 6,
        component: 'formulario'
      }
    ],

    collectedDataFromModels: null,

    // FIX: REMOVE ON PROD
    licensed: {
      show: false,
      message: ''
    }
  }),

  computed: {
    getCurrentComponent () {
      return this.currentStep.component + '-component'
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
      //
      // Check if the next is the last step
      if (
        this.currentStep.number + 1 >
        this.steps[this.steps.length - 1].number
      ) {
        return
      }

      //
      // Check if is valid before continue
      if (!this.validateCurrentModel(this.currentStep.component)) {
        return
      }

      this.currentStep = this.steps[this.currentStep.number]
      window.scrollTo(0, 0)
    },

    validateCurrentModel (modelName) {
      //
      // Throw a validation method for current component
      const { message, data } = this.$refs[modelName].validateModel()

      console.log('message :>> ', message)
      console.log('data :>> ', data)

      //
      // Return the value from a computed
      // property of the component
      return this.$refs[modelName].isValid.value
    },

    // =============================================
    // FIX: REMOVE ON PROD
    // =============================================
    security () {
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
      this.licensed.show = true
      this.licensed.message =
        message || 'Sin permiso para ver el código fuente.'
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
          alert('Do not open devtools')
          that.showUnlicensedMessage()
        }
      })

      console.log('%c', element)
    },

    onResize () {
      window.addEventListener('resize', () =>
        this.checkOpenDevToolsFromChrome()
      )
    }
  }
}
</script>
