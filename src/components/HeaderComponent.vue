<template>
  <header class="mt-1 mb-3">
    <!-- <h1 class="text-center text-h5 text-md-h4">Modelos de Segmentación</h1> -->
    <!-- <h2 class="text-center text-h6 text-md-h5">Facultad Geografia</h2> -->

    <v-stepper v-model="currentStep" class="my-8" dark>
      <v-stepper-header>
        <template v-for="step in steps">
          <v-stepper-step
            :key="`${step.number}-step`"
            :complete="currentStep > step.number"
            :step="step.number"
            @click="test"
          >
            {{ step.title }}
          </v-stepper-step>

          <v-divider
            v-if="step.number !== steps.length"
            :key="step.id"
          ></v-divider>
        </template>
      </v-stepper-header>
    </v-stepper>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',

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
    test () {
      console.log('test')
    }
  }
}
</script>

<style lang="scss" scoped></style>
