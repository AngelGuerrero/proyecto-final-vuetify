<template>
  <v-row justify="center" class="mt-2">
    <v-dialog v-model="dialog" max-width="690" persistent>
      <v-card>
        <v-card-title class="headline">Instrucciones</v-card-title>
        <v-card-text class="text-subtitle-1">
          <p class="mb-0">1.- Elije el tipo de Modelo que requieres para tu campaña o prueba.</p>
          <p class="mb-0">
            2.- Lee las descripciones de cada Modelo y selecciona el que más se ajuste a tus necesidades.
          </p>
          <p class="mb-0">3.- Escoje las características más apropiadas.</p>
          <p class="mb-0">4.- Puedes filtrar los resultados de tu Modelo en combinación con otras categorías.</p>
          <p class="mb-0">5.- Selecciona el formato y datos de salida de tu segmento o recomendación.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onClose">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Instructions',

  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  methods: {
    onClose () {
      this.$emit('on-close')
    }
  }
}
</script>
