<template>
  <div>
    <!-- <div v-for="step in steps" :step="step.number" :key="step.id">
      <v-card class="mb-12 elevation-0">
        <v-container>
          <component
            v-show="currentStep.number === step.number"
            :is="step.component + '-component'"
            :ref="step.component"
            :step="step"
            :initialValidation="step.initialValidation"
          ></component>
        </v-container>
      </v-card>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
// Modelos dinámicos
import ModelosComponent from '@/components/ModelosComponent'
import SociodemograficosComponent from '@/components/SociodemograficosComponent'
import ComportamientoComponent from '@/components/ComportamientoComponent'
import GeograficosComponent from '@/components/GeograficosComponent'
import DatosComponent from '@/components/DatosComponent'
import FormularioComponent from '@/components/FormularioComponent'

export default {
  name: 'RenderSteps',

  components: {
    ModelosComponent,
    SociodemograficosComponent,
    ComportamientoComponent,
    GeograficosComponent,
    DatosComponent,
    FormularioComponent
  },

  props: {
    steps: {
      type: Array,
      required: true
    },

    currentStep: {
      type: Number,
      required: true
    }
  }
}
</script>
