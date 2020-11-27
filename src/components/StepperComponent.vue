<template>
  <v-card class="pa-0 transparent elevation-0">
    <v-card-text>
      <v-stepper v-model="currentStep" class="elevation-0">
        <v-stepper-items>
          <v-stepper-content
            v-for="step in steps"
            :key="`${step.number}-content`"
            :step="step.number"
          >
            <v-card>
              <component :is="currentStep.component"></component>

              <v-card-title class="justify-center">
                <h3>¿Qué tipo de modelo quieres utilizar?</h3>
              </v-card-title>

              <v-card-text>
                <v-expansion-panels focusable>
                  <v-expansion-panel v-for="(item, i) in steps" :key="i">
                    <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>

              <v-card-actions d-flex class="px-3">
                <v-btn text color="secondary" @click="emitPrevStep">Anterior</v-btn>
                <v-btn text color="primary" @click="emitNextStep" class="ml-auto">Siguiente</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StepperComponent',

  props: {
    steps: {
      type: Array,
      required: true
    },

    currentStep: {
      type: Number,
      required: true
    }
  },

  methods: {
    emitPrevStep () {
      this.$emit('onPrevStep')
    },

    emitNextStep () {
      this.$emit('onNextStep')
    }
  }
}
</script>
