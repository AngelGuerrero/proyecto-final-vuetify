<template>
  <v-app-bar app color="white" light>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/img/uaem.jpg"
        transition="scale-transition"
        width="40"
      />
      <v-container class="d-none d-sm-flex flex-column">
      <span>Modelos de segmentación</span>
      <span class="caption">Facultad de Geografía</span>
      </v-container>
    </div>

    <v-spacer></v-spacer>

    <v-btn href="#" text class="d-none d-sm-flex">
      <v-icon>mdi-home</v-icon>
      <span class="ml-2">Inicio</span>
    </v-btn>
    <v-btn href="#" text>
      <v-icon>mdi-information</v-icon>
      <span class="ml-2">Instrucciones</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style lang="scss" scoped></style>
