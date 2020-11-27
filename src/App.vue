<template>
  <v-app id="wrapper">
    <div id="my_nav">
      <navbar-component></navbar-component>
    </div>

    <div id="content" class="dev grey lighten-3">
      <v-main>
        <v-container>
          <!-- Contiene la visualización de los pasos a seguir -->
          <header-component
            :steps="steps"
            :currentStep="currentStep.number"
          ></header-component>

          <!--
            Renderiza un componente dinámico en base al paso seleccionado.
           -->
          <v-card class="py-3 elevation-10">
            <component :is="getCurrentComponent"></component>

              <!-- Controles para recorrer los pasos -->
              <v-card-actions d-flex class="px-3">
                <v-btn text color="secondary" @click="prevStep">Anterior</v-btn>
                <v-btn text color="primary" @click="nextStep" class="ml-auto">Siguiente</v-btn>
              </v-card-actions>
          </v-card>

        </v-container>
      </v-main>
    </div>

    <div id="my_footer" class="dev">
      <footer-component></footer-component>
    </div>
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'
import NavbarComponent from './components/NavbarComponent'
import StepperComponent from './components/StepperComponent'
import FooterComponent from './components/FooterComponent'

// Modelos dinámicos
import ModelosComponent from './components/ModelosComponent'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    HeaderComponent,
    StepperComponent,
    FooterComponent,
    ModelosComponent
  },

  created () {
    this.currentStep = this.steps[0]
  },

  computed: {
    getCurrentComponent () {
      return this.currentStep.component + '-component'
    }
  },

  data: () => ({
    currentStep: null,
    steps: [
      { title: 'Modelos', number: 1, component: 'modelos' },
      { title: 'Sociodemográficos', number: 2, component: 'sociodemograficos' },
      { title: 'Comportamiento del cliente', number: 3, component: 'comportamiento' },
      { title: 'Geográficos', number: 4, component: 'geograficos' },
      { title: 'Datos', number: 5, component: 'datos' },
      { title: 'Formulario', number: 6, component: 'formulario' }
    ]
  }),

  watch: {
    steps (val) {
      if (this.currentStep > val) {
        this.currentStep = val
      }
    }
  },

  methods: {
    nextStep () {
      //
      // Verifica si el siguiente es el último elemento
      if (this.currentStep + 1 >= this.steps[this.steps.length - 1].number) {
        return
      }
      this.currentStep = this.currentStep + 1
    },

    prevStep () {
      //
      // Verifica que no sea menor que el primer elemento
      if (this.currentStep - 1 <= 0) return
      this.currentStep = this.currentStep - 1
    }
  }
}
</script>
