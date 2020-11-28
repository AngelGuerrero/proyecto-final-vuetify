<template>
  <v-app>
    <div id="wrapper">
      <nav id="my_nav">
        <navbar-component></navbar-component>
      </nav>

      <div id="content" class="blue-grey lighten-5">
        <v-main class="pb-9">
          <v-container>
            <!-- Contiene la visualización de los pasos a seguir -->
            <header-component
              :steps="steps"
              :currentStep="currentStep.number"
              @onSelectStep="selectCurrentStep"
            ></header-component>
            <!-- Renderiza un componente dinámico en base al paso seleccionado. -->
            <v-card class="py-3 elevation-10">
              <component :is="getCurrentComponent"></component>

              <!-- Controles para recorrer los pasos -->
              <v-card-actions d-flex class="px-3">
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

      <div id="my_footer" class="dev d-flex justify-center align-center black">
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
import StepperComponent from './components/StepperComponent'

// Modelos dinámicos
import ModelosComponent from './components/ModelosComponent'
import SociodemograficosComponent from './components/SociodemograficosComponent'
import ComportamientoComponent from './components/ComportamientoComponent'
import GeograficosComponent from './components/GeograficosComponent'
import DatosComponent from './components/DatosComponent'
import FormularioComponent from './components/FormularioComponent'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    HeaderComponent,
    StepperComponent,

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
    }
  },

  data: () => ({
    currentStep: null,
    steps: [
      { title: 'Modelos', number: 1, component: 'modelos' },
      { title: 'Sociodemográficos', number: 2, component: 'sociodemograficos' },
      {
        title: 'Comportamiento del cliente',
        number: 3,
        component: 'comportamiento'
      },
      { title: 'Geográficos', number: 4, component: 'geograficos' },
      { title: 'Datos', number: 5, component: 'datos' },
      { title: 'Formulario', number: 6, component: 'formulario' }
    ]
  }),

  methods: {
    selectCurrentStep (step) {
      this.currentStep = step
    },

    nextStep () {
      //
      // Verifica si el siguiente es el último elemento
      if (
        this.currentStep.number + 1 >
        this.steps[this.steps.length - 1].number
      ) {
        return
      }
      this.currentStep = this.steps[this.currentStep.number]
      window.scrollTo(0, 0)
    },

    prevStep () {
      //
      // Verifica que no sea menor que el primer elemento
      if (this.currentStep.number - 1 <= 0) return
      this.currentStep = this.steps[this.currentStep.number - 2]
      window.scrollTo(0, 0)
    }
  }
}
</script>
