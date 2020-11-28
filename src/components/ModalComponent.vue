<template>
  <div>
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
            1.- Elije el tipo de Modelo que requieres para tu campaña o prueba.
            <br />
            <pre></pre>
            2.- Lee las descripciones de cada Modelo y selecciona el que mas se
            ajuste a tus necesidades.
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
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',

  props: {
    show: {
      type: Boolean,
      default: false,
      required: false
    },
  },
}
</script>

<style lang="scss" scoped></style>
