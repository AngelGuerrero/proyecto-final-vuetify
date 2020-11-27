<template>
  <div>
    <v-card-title class="justify-center">
      <h2 class="text-h6 text-md-h5">¿Qué tipo de modelo quieres utilizar?</h2>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-radio-group v-model="selectedOption">
          <v-radio
            v-for="n in opciones"
            :key="n"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
      </v-container>

      <v-expansion-panels
        v-show="selectedOption === 'Segmentar Clientes'"
        focusable
        multiple
        v-model="panels"
      >
        <h1 class="text-center text-h4 text-md-h4">Modelos de segmentación</h1>
        <p class="my-3">
          Elige el modelo de segmentación de clientes que mas se ajuste a tus
          necesidades.
        </p>
        <!-- Option 1 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h2 class="text-h6 text-md-h5 mb-3">RFM por Categorias</h2>
              <p>
                Consiste en clasificar a los clientes mediante tres variables
                indicadoras:
              </p>
              <p class="ma-0 mb-1">
                Recency (Tiempo transcurrido desde su ultima compra)
              </p>
              <p class="ma-0 mb-1">Frecuency (Numero de compras)</p>
              <p class="ma-0 mb-1">
                Money (Valor de las compras totales del cliente).Este modelo
                califica cada variable del 1 al 4, donde 4 es el valor mas alto.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo RFM por Categorias mas adecuadas a
              tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="4">
                  <h3>Area</h3>

                  <v-checkbox label="Muebles" type="checkbox"></v-checkbox>
                  <v-checkbox label="Ropa" type="checkbox"></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Categorias de productos</h3>

                  <select id="inputState" class="form-control">
                    <option>Zapato infantil</option>
                    <option>Zapato dama</option>
                    <option>Zapato caballero</option>
                    <option>Transporte y movilidad</option>
                  </select>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Tipo de compra</h3>

                  <v-checkbox label="Crédito" type="checkbox"></v-checkbox>
                  <v-checkbox label="Contado" type="checkbox"></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <h3>R=Recency</h3>

                  <p>Tiempo transcurrido desde su ultima compra</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>F=Frecuency</h3>
                  <p>Numero de compras</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>M=Money</h3>
                  <p>Valor de las compras totales del cliente</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
                </v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Option 2 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h2 class="text-h6 text-md-h5 mb-3">
                SPC "Probabilidad de compra"
              </h2>
              <p>
                Este modelo clasifica a los clientes acuerdo al número de
                compras y tiempo transcurrido entre compras por medios digitales
                y los divide<br />
                por estrategia de comunicación y probabilidad de compra.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas
              adecuadas a tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <h3>Retencion del cliente</h3>
                  <v-checkbox label="Alta probabilidad de compra"></v-checkbox>
                  <v-checkbox label="Baja probabilidad de compra"></v-checkbox>
                </v-col>
                <v-col cols="12" md="6">
                  <h3>Recuperacion del cliente</h3>
                  <v-checkbox label="Alta probabilidad de compra"></v-checkbox>
                  <v-checkbox label="Baja probabilidad de compra"></v-checkbox>
                </v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Option 3 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h2 class="text-h6 text-md-h5 mb-3">Puntualidad "N"</h2>
              <p>
                Utiliza diversas variables económicas, demográficas y de perfil
                digital que permite predecir la puntualidad de abono<br />
                para Clientes clasificación "N" antes de que sus meses de
                maduración permitan clasificarlos en algun tipo de puntualidad.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas
              adecuadas a tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <h3>Predicción de Puntualidad</h3>

                  <v-checkbox label="Cliente A"></v-checkbox>
                  <v-checkbox label="Cliente B"></v-checkbox>
                  <v-checkbox label="Cliente C"></v-checkbox>
                  <v-checkbox label="Cliente D"></v-checkbox>
                  <v-checkbox label="Cliente Z"></v-checkbox>
                </v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Modelos de recomendación -->
      <v-expansion-panels
        v-show="selectedOption === 'Recomendar Productos'"
        focusable
        multiple
        v-model="panels"
      >
        <h1 class="text-center text-h4 text-md-h4">Modelos de Recomendación</h1>
        <p class="my-3">
          Elige el modelo de recomendación de productos que mas se ajuste a tus
          necesidades.
        </p>
        <!-- Option 1 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h2 class="text-h6 text-md-h5 mb-3">Recomendar productos</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                laboriosam!
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <form action="">
              <v-row>
                <v-col><h3>Ejemplo</h3></v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'ModelosComponent',

  data: () => ({
    panels: [0, 0, 0],

    selectedOption: null,

    opciones: ['Segmentar Clientes', 'Recomendar Productos']
  })
}
</script>

<style lang="scss" scoped></style>
