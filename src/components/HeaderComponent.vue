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
          <v-card-text>
            <h2>
              1.- Elije el tipo de Modelo que requieres para tu campaña o
              prueba.
              <br />
              <pre></pre>
              2.- Lee las descripciones de cada Modelo y selecciona el que mas
              se ajuste a tus necesidades.
              <br />
              <pre></pre>
              3.- Escoje las caracteristicas mas apropiadas.
              <br />
              <pre></pre>
              4.- Puedes filtrar los resultados de tu Modelo en combinación con
              otras categorias.
              <br />
              <pre></pre>
              5.- Selecciona el formato y datos de salida de tu segmento o
              recomendación.
            </h2>
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

    <v-stepper v-model="currentStep" class="my-8" dark>
      <v-stepper-header>
        <template v-for="step in steps">
          <v-stepper-step
            :key="`${step.number}-step`"
            :complete="currentStep > step.number"
            :step="step.number"
            @click="selectStep(step)"
            editable
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

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    selectStep (step) {
      this.$emit('onSelectStep', step)
    }
  }
}
</script>

<style lang="scss" scoped></style>
