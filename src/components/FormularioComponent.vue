<template>
  <div>
    <v-card-title class="justify-center">
      <h1 class="text-center text-h4 text-md-h4">Formulario</h1>
    </v-card-title>

    <v-card-text>
      <v-container>
        <p class="text-center">Tu archivo esta listo</p>
        <p class="text-center">
          Pero antes, apoyanos completando la siguiente información.
        </p>
      </v-container>

      <v-card>
        <v-card-text>
          <form>
            <v-row>
              <v-col cols="12" md="4"
                ><v-subheader>Tu nombre</v-subheader></v-col
              >
              <v-col cols="12" md="8"
                ><v-text-field label=""></v-text-field
              ></v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>Área a la que perteneces</v-subheader>
              </v-col>
              <v-col cols="12" md="8"><v-text-field></v-text-field></v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" class="d-flex align-center">
                <v-subheader>
                  ¿En que canal enviaras el segmento o recomendación?
                </v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-radio-group v-model="selectedOption">
                  <v-radio
                    v-for="n in radioOptions"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>

                <v-text-field label="¿Cuál?"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>
                  ¿Podrias compartirnos el nombre de tu campaña o proyecto?
                </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-subheader
                  >¿Cual es la fecha de inicio de tu campaña o
                  proyecto?</v-subheader
                >
              </v-col>
              <v-col cols="12" md="8">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de inicio"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader
                  >Correo electronico donde enviaremos tu archivo.</v-subheader
                >
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>¿Como quieres nombrar tu archivo?</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field></v-text-field>
              </v-col>
            </v-row>

            <h3 class="text-center">¡Listo!</h3>
          </form>
        </v-card-text>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'FormularioComponent',

  data: () => ({
    selectedOption: null,
    radioOptions: ['Email', 'SMS', 'Paid Medi', 'Venta por Telefono', 'Otro'],
    date: null,
    menu: false
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>

<style lang="scss" scoped></style>
