<template>
  <div>
    <v-card-title class="justify-center">
      <h1 class="text-center text-h4 text-md-h4">Datos</h1>
    </v-card-title>

    <v-card-text>
      <v-container>
        <p class="text-center">
          ¡Ya casí terminas! <br />
          Aquí deberas elegir la información del cliente que te es util para tu
          campaña o proyecto. El formato del archivo que se exportará es en .csv
        </p>
      </v-container>

      <v-container>
        <h3>Datos a exportar</h3>
        <form action="">
          <v-row>
            <v-col cols="12" md="4">
              <v-checkbox label=" id Client "></v-checkbox>
              <v-checkbox label=" Genero "></v-checkbox>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox label=" Nombre propio "></v-checkbox>
              <v-checkbox label=" Apellido Paterno "></v-checkbox>
              <v-checkbox label=" Apellido Materno "></v-checkbox>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox label=" Correo electronico "></v-checkbox>
              <v-checkbox label=" Telefono "></v-checkbox>
            </v-col>
          </v-row>
        </form>
      </v-container>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'Datos'
}
</script>

<style lang="scss" scoped></style>
