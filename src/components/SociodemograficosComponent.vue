<template>
  <div>
    <v-card-title class="justify-center">
      <h2 class="text-h6 text-md-h5">Categoría Sociodemográficos</h2>
    </v-card-title>

    <v-card-text>
      <v-container>
        <p>
          En esta categoria puedes filtrar por caracteristicas sociodemograficas
          del cliente. Ahora bien, si no lo requieres, pues dar clic en
          continuar.
        </p>
      </v-container>

      <!-- Género -->
      <v-card>
        <v-card-title primary-title class="justify-center">
          <h2>Género</h2>
        </v-card-title>
        <v-card-text>
          <v-checkbox label="Hombre"></v-checkbox>
          <v-checkbox label="Mujer"></v-checkbox>
        </v-card-text>
      </v-card>

      <!-- Edad -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title class="justify-center">
              <h2>Edad</h2>
            </v-card-title>
            <v-card-text>
              <p>
                Elije el tipo de clasificación de edad del cliente que mas se
                adecue a tus necesidades.
              </p>

              <!-- Panels -->
              <v-expansion-panels focusable multiple v-model="panels">
                <!-- Option 1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h2 class="text-h6 text-md-h5">Manual</h2>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel></v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 2 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h2 class="text-h6 text-md-h5">Rangos de edad</h2>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="text-center my-4">
                      Selecciona los rangos de tu interes
                    </p>

                    <form>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" 15 a 19 años "></v-checkbox>

                          <v-checkbox label=" 20 a 24 años "></v-checkbox>

                          <v-checkbox label=" 25 a 29 años "></v-checkbox>

                          <v-checkbox label=" 30 a 34 años "></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" 35 a 39 años "></v-checkbox>

                          <v-checkbox label=" 40 a 44 años "></v-checkbox>

                          <v-checkbox label=" 45 a 49 años "></v-checkbox>

                          <v-checkbox label=" 50 a 54 años "></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" 55 a 59 años "></v-checkbox>

                          <v-checkbox label=" 60 a 64 años "></v-checkbox>

                          <v-checkbox label=" 65 a 69 años "></v-checkbox>

                          <v-checkbox label=" 70 a 74 años "></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" 75 a 79 años "></v-checkbox>

                          <v-checkbox label=" 80 a 84 años "></v-checkbox>

                          <v-checkbox label=" 85 años o más "></v-checkbox>
                        </v-col>
                      </v-row>
                    </form>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 3 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h2 class="text-h6 text-md-h5">Etapas de vida</h2>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="text-center my-4">
                      Selecciona la etapa de vida para tu análisis
                    </p>

                    <form>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" Adolecentes "></v-checkbox>
                          <p>edades entre 15 y 24 años.</p>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" Adultos jovenes "></v-checkbox>
                          <p>edades entre 25 y 39 años.</p>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" Adultos "></v-checkbox>
                          <p>edades entre 40 y 64 años.</p>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-checkbox label=" Jubilados "></v-checkbox>
                          <p>65 años y más</p>
                        </v-col>
                      </v-row>
                    </form>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 4 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h2 class="text-h6 text-md-h5">Generación</h2>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="text-center my-4">
                      Elije la generación adecuada a tu campaña
                    </p>

                    <form>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-checkbox label="Generación Z"></v-checkbox>
                          <p>
                            Clientes que nacieron en 1995 hasta el dia de hoy
                          </p>

                          <v-checkbox label="Millennials (Y)"></v-checkbox>
                          <p>Clientes que nacieron entre 1982 y 1994</p>

                          <v-checkbox label="Generación X"></v-checkbox>
                          <p>Clientes que nacieron entre 1965 y 1981</p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-checkbox label="Baby Boom"></v-checkbox>
                          <p>Clientes que nacieron entre 1945 y 1964</p>

                          <v-checkbox
                            label="Generación Silenciosa"
                          ></v-checkbox>
                          <p>Clientes que nacieron entre 1925 y 1944</p>
                        </v-col>
                      </v-row>
                    </form>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'SociodemograficosComponent',

  data: () => ({
    panels: [0, 0, 0, 3]
  })
}
</script>

<style lang="scss" scoped></style>
