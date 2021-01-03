<template>
  <div>
    <h1>StepperHeader</h1>
    <v-stepper-header v-show="!mobile">
      <v-stepper-step
        v-for="step in steps"
        :key="`${step.number}-step`"
        :complete="currentStep > step.number"
        :step="step.number"
        class="quicksand"
      >
        {{ step.label }}
      </v-stepper-step>
    </v-stepper-header>

    <!--
      Mobile version
     -->
    <div v-show="mobile" v-for="step in steps" :key="step.id">
      <v-stepper-step
        :key="`${step.number}-step`"
        :complete="currentStep > step.number"
        :step="step.number"
        class="quicksand"
      >
        {{ step.label }}
      </v-stepper-step>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import RenderSteps from '@/components/RenderSteps'
import ModelosComponent from '@/components/ModelosComponent'
import SociodemograficosComponent from '@/components/SociodemograficosComponent'
import ComportamientoComponent from '@/components/ComportamientoComponent'
import GeograficosComponent from '@/components/GeograficosComponent'
import DatosComponent from '@/components/DatosComponent'
import FormularioComponent from '@/components/FormularioComponent'

export default {
  name: 'StepperHeader',

  components: {
    RenderSteps,
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
    },

    mobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>
