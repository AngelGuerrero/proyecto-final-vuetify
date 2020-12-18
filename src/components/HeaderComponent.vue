<template>
  <header class="mt-1 mb-3">
    <h1 class="text-center text-h5 text-md-h4">Modelos de Segmentación</h1>
    <h2 class="text-center text-h6 text-md-h5">Facultad Geografia</h2>

    <v-row justify="center" class="mt-2">
      <v-dialog v-model="dialog" max-width="690">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text dark v-bind="attrs" v-on="on">
            Da clic y lee las instrucciones
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Instrucciones</v-card-title>
          <v-card-text class="text-subtitle-1">
            <p class="mb-0">1.- Elije el tipo de Modelo que requieres para tu campaña o prueba.</p>
            <p class="mb-0">2.- Lee las descripciones de cada Modelo y selecciona el que mas se ajuste a tus necesidades.</p>
            <p class="mb-0">3.- Escoje las caracteristicas mas apropiadas.</p>
            <p class="mb-0">4.- Puedes filtrar los resultados de tu Modelo en combinación con otras categorias.</p>
            <p class="mb-0">5.- Selecciona el formato y datos de salida de tu segmento o recomendación.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-stepper v-model="currentStep" class="my-1 transparent elevation-0">
      <v-stepper-header>
        <template v-for="step in l_steps">
          <v-stepper-step
            :key="`${step.number}-step`"
            :complete="currentStep > step.number"
            :step="step.number"
            :editable="step.valid"
            @click="selectStep(step)"
          >
            {{ step.label }}
          </v-stepper-step>

          <v-divider v-if="step.number !== steps.length" :key="step.id"></v-divider>
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

  created () {
    this.l_steps = this.steps
  },

  data () {
    return {
      l_steps: null,
      dialog: false
    }
  },

  watch: {
    steps: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.l_steps = newVal
      }
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

<style lang="scss" scoped></style>
