<template>
  <div>
    <v-stepper v-model="currentStep" class="my-3" :vertical="mobile">
      <!--
      Mobile version
     -->
      <div v-show="mobile" v-for="step in steps" :key="step.number + 'step-mobile'">
        <v-stepper-step
          :key="'step-header-mobile-' + step.id"
          :complete="currentStep > step.number"
          :step="step.number"
          class="quicksand"
        >
          {{ step.label }}
        </v-stepper-step>

        <v-stepper-content if="mobile" :step="step.number">
          <v-container class="px-1 mb-12 elevation-0">
            <component
              :is="step.component + '-component'"
              :ref="step.component"
              :step="step"
              :initialValidation="step.initialValidation"
            ></component>
          </v-container>
          <stepper-action></stepper-action>
        </v-stepper-content>

        <v-divider v-if="step.number !== steps.length" :key="step.id"></v-divider>
      </div>

      <v-stepper-header v-show="!mobile">
        <template v-for="step in steps">
          <v-stepper-step
            :key="step.number + 'not-mobile'"
            :complete="currentStep > step.number"
            :step="step.number"
            class="quicksand"
          >
            {{ step.label }}
          </v-stepper-step>
          <v-divider v-if="step.number !== steps.length" :key="step.id"></v-divider>
        </template>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
import ModelosComponent from '@/components/ModelosComponent'
import SociodemograficosComponent from '@/components/SociodemograficosComponent'
import ComportamientoComponent from '@/components/ComportamientoComponent'
import GeograficosComponent from '@/components/GeograficosComponent'
import DatosComponent from '@/components/DatosComponent'
import FormularioComponent from '@/components/FormularioComponent'
import StepperAction from '@/components/StepperAction'

export default {
  name: 'StepperComponent',

  inject: ['$isFirst'],

  components: {
    ModelosComponent,
    SociodemograficosComponent,
    ComportamientoComponent,
    GeograficosComponent,
    DatosComponent,
    FormularioComponent,
    StepperAction
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
      required: false,
      default: false
    }
  },

  methods: {
    selectStep (step) {
      if (!step.valid) return
      this.$emit('on-select-step', step)
    }
  }
}
</script>
