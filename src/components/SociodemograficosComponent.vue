<template>
  <base-component
    ref="base"
    :propmodel="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <template #default="{ mutate }">
      <!-- Género -->
      <v-card class="elevation-0 ma-0 pa-0">
        <v-card-title primary-title class="justify-center">
          <h3>Género</h3>
        </v-card-title>
        <v-card-text>
          <div class="elevation-3 pa-3 rounded">
            <validate-checkbox
              :model="model.genero"
              validation="one"
              @on-validate="mutate('genero', 'validation', $event)"
              @on-change="mutate('genero', 'vmodel', $event)"
            ></validate-checkbox>
          </div>
        </v-card-text>
      </v-card>

      <!-- Edad -->
      <v-row>
        <v-col>
          <v-card class="elevation-0">
            <v-card-title primary-title class="justify-center">
              <h3>Edad</h3>
            </v-card-title>
            <v-card-text>
              <p>
                Elije el tipo de clasificación de edad del cliente que mas se adecue a tus necesidades.
              </p>

              <!-- Panels -->
              <v-expansion-panels focusable multiple v-model="edadPanels">
                <!-- Option 1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h4>Manual</h4>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <v-container>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12">
                            <p class="text-center">
                              Elije los minimos y maximos de tu rango de edades
                            </p>
                            <div class="form-group row">
                              <div class="col-12">
                                <input type="text" name="rangeEdad_1" id="rangeEdad_1" />
                              </div>
                            </div>

                            <p class="text-center">
                              ¿Necesitas un rango más?
                            </p>
                            <div class="form-group row">
                              <div class="col-12">
                                <input type="text" name="rangeEdad_2" id="rangeEdad_2" />
                              </div>
                            </div>

                            <p class="text-center">¿Otro?</p>
                            <div class="form-group row">
                              <div class="col-12">
                                <input type="text" name="rangeEdad_3" id="rangeEdad_3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 2 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h4>Rangos de edad</h4>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="text-center my-4">
                      Selecciona los rangos de tu interes
                    </p>

                    <validate-checkbox
                      custom
                      validation="one"
                      :model="model.edad"
                      @on-change="mutate(model.edad.name, 'vmodel', $event)"
                      @on-validate="mutate(model.edad.name, 'validation', $event)"
                    >
                      <template #default="{ results }">
                        <v-row>
                          <v-col cols="12" sm="6" md="3">
                            <v-checkbox
                              v-for="(item, index) in fromTo(0, 4, model.edad.getItems())"
                              :key="index"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>

                          <v-col cols="12" sm="6" md="3">
                            <v-checkbox
                              v-for="(item, index) in fromTo(4, 8, model.edad.getItems())"
                              :key="index"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-checkbox
                              v-for="(item, index) in fromTo(8, 12, model.edad.getItems())"
                              :key="index"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-checkbox
                              v-for="(item, index) in fromTo(12, 16, model.edad.getItems())"
                              :key="index"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </template>
                    </validate-checkbox>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 3 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h4>Etapas de vida</h4>
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
                    <h4>Generación</h4>
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

                          <v-checkbox label="Generación Silenciosa"></v-checkbox>
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

      <!-- Sin clasificación -->
      <v-container fluid>
        <v-row>
          <!-- Nivel de escolaridad -->
          <v-col cols="12" md="6">
            <div class="elevation-3 pa-3 rounded">
              <h4>Nivel de escolaridad</h4>
              <validate-checkbox
                :model="model.escolaridad"
                validation="one"
                @on-validate="mutate(model.escolaridad.name, 'validation', $event)"
                @on-change="mutate(model.escolaridad.name, 'vmodel', $event)"
              ></validate-checkbox>
            </div>
          </v-col>

          <!-- Estado civil -->
          <v-col cols="12" md="6">
            <div class="elevation-3 pa-3 rounded">
              <h4>Estado Civil</h4>
              <div class="card-text">
                <validate-checkbox
                  :model="model.e_civil"
                  validation="one"
                  @on-validate="mutate(model.e_civil.name, 'validation', $event)"
                  @on-change="mutate(model.e_civil.name, 'vmodel', $event)"
                ></validate-checkbox>
              </div>
            </div>
          </v-col>
        </v-row>

        <!---->
        <v-row>
          <!-- Integrantes del hogar -->
          <v-col cols="12" md="6">
            <div class="elevation-3 pa-3 rounded">
              <h4>Integrantes del hogar</h4>
              <validate-checkbox
                :model="model.in_hogar"
                validation="one"
                @on-validate="mutate(model.in_hogar.name, 'validation', $event)"
                @on-change="mutate(model.in_hogar.name, 'vmodel', $event)"
              ></validate-checkbox>
            </div>
          </v-col>
          <!-- Integrantes del hogar que trabajan -->
          <v-col cols="12" md="6">
            <div class="elevation-3 pa-3 rounded">
              <h4>Integrantes del hogar que trabajan</h4>
              <validate-checkbox
                :model="model.in_hogarTrabajan"
                validation="one"
                @on-validate="mutate(model.in_hogarTrabajan.name, 'validation', $event)"
                @on-change="mutate(model.in_hogarTrabajan.name, 'vmodel', $event)"
              ></validate-checkbox>
            </div>
          </v-col>
        </v-row>
        <!---->
      </v-container>

      <!-- Salario -->
      <v-row>
        <v-col>
          <v-card class="elevation-0">
            <v-card-title primary-title class="justify-center">
              <h3>Salario</h3>
            </v-card-title>
            <v-card-text class="text-center">
              <p>
                Elije el ingreso del cliente que mejor considere.
              </p>

              <!-- Panels -->
              <v-expansion-panels focusable multiple v-model="salarioPanels">
                <!-- Option 1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <v-container>
                      <h3>Salarios minimos</h3>
                      <p class="my-3">
                        Salario mínimo general vigente a partir del 1° de enero de 2020 corresponde a $123.22
                        pesos
                      </p>
                    </v-container>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <validate-checkbox
                      custom
                      validation="one"
                      :model="model.sal_min"
                      @on-validate="mutate('sal_min', 'validation', $event)"
                      @on-change="mutate('sal_min', 'vmodel', $event)"
                    >
                      <template #default="{ results }">
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-for="item in fromTo(0, 3, model.sal_min.getItems())"
                              :key="item.id"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-for="item in fromTo(3, 5, model.sal_min.getItems())"
                              :key="item.id"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-for="item in fromTo(5, 7, model.sal_min.getItems())"
                              :key="item.id"
                              v-model="item.checked"
                              :value="item.checked"
                              :label="item.value"
                              :error="!results.valid"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </template>
                    </validate-checkbox>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 2 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <v-container>
                      <h3>Ingreso promedio mensual</h3>
                      <p class="my-3">
                        Elije los minimos y maximos del ingreso promedio mensual
                      </p>
                    </v-container>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="my-3">Salario promedio mensual</p>

                    <v-row>
                      <v-col cols="12">
                        <input type="text" id="rangeSalarioPromedioMensual" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- Option 3 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <v-container>
                      <h3>Nivel socioeconómico</h3>
                      <p class="my-3">
                        Selecciona el Nivel Socieconomico de tu interes. *Datos calculados al 2020
                      </p>
                    </v-container>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <p class="my-3">
                      Selecciona los rangos de nivel socioeconómico de tu interes
                    </p>

                    <form>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-checkbox label="A/B"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $94,864
                          </p>

                          <v-checkbox label="C+"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $39,061
                          </p>

                          <v-checkbox label="C"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $22,205
                          </p>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-checkbox label="C-"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $16,740
                          </p>

                          <v-checkbox label="D+"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $12,945
                          </p>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-checkbox label="D"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $7,833
                          </p>

                          <v-checkbox label="E"></v-checkbox>
                          <p class="text-left">
                            Ingreso promedio mensual $3,712
                          </p>
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
    </template>
  </base-component>
</template>

<script>
import BaseComponent from './Helpers/BaseModelComponent'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'
var $ = require('jquery')

//
// Data
//
const model = () => ({
  //
  // Género
  genero: new Section('genero', 'Género', [
    new Checkbox('genero', 'Hombre'),
    new Checkbox('genero', 'Mujer')
  ]),
  //
  // Rangos de edad
  edad: new Section('edad', 'Rangos de edad', [
    new Checkbox('edad', ' 15 a 19 años '),
    new Checkbox('edad', ' 20 a 24 años '),
    new Checkbox('edad', ' 25 a 29 años '),
    new Checkbox('edad', ' 30 a 34 años '),
    new Checkbox('edad', ' 35 a 39 años '),
    new Checkbox('edad', ' 40 a 44 años '),
    new Checkbox('edad', ' 45 a 49 años '),
    new Checkbox('edad', ' 50 a 54 años '),
    new Checkbox('edad', ' 55 a 59 años '),
    new Checkbox('edad', ' 60 a 64 años '),
    new Checkbox('edad', ' 65 a 69 años '),
    new Checkbox('edad', ' 70 a 74 años '),
    new Checkbox('edad', ' 75 a 79 años '),
    new Checkbox('edad', ' 80 a 84 años '),
    new Checkbox('edad', ' 85 años o más ')
  ]),
  //
  // Nivel escolaridad
  escolaridad: new Section('escolaridad', 'Nivel de escolaridad', [
    new Checkbox('escolaridad', 'Sin estudios'),
    new Checkbox('escolaridad', 'Primaria'),
    new Checkbox('escolaridad', 'Secundaria'),
    new Checkbox('escolaridad', 'Carrera Técnica'),
    new Checkbox('escolaridad', 'Preparatoria'),
    new Checkbox('escolaridad', 'Profesional'),
    new Checkbox('escolaridad', 'No identificado')
  ]),
  //
  // Estado civil
  e_civil: new Section('e_civil', 'Estado civil', [
    new Checkbox('e_civil', 'Casado'),
    new Checkbox('e_civil', 'Soltero'),
    new Checkbox('e_civil', 'Union Libre'),
    new Checkbox('e_civil', 'Divorciado'),
    new Checkbox('e_civil', 'Viudo'),
    new Checkbox('e_civil', 'Profesional'),
    new Checkbox('e_civil', 'Sin Identifica')
  ]),
  //
  // Integrantes del hogar
  in_hogar: new Section('in_hogar', 'Ingregrantes del hogar', [
    new Checkbox('in_hogar', '1 persona'),
    new Checkbox('in_hogar', '2 personas'),
    new Checkbox('in_hogar', '3 personas'),
    new Checkbox('in_hogar', '4 personas'),
    new Checkbox('in_hogar', '5 personas'),
    new Checkbox('in_hogar', '6 o más personas'),
    new Checkbox('in_hogar', 'Sin dato')
  ]),
  //
  // Integrantes del hogar que trabajan
  in_hogarTrabajan: new Section('in_hogarTrabajan', 'Integrantes del hogar que trabajan', [
    new Checkbox('in_hogarTrabajan', '1 persona'),
    new Checkbox('in_hogarTrabajan', '2 personas'),
    new Checkbox('in_hogarTrabajan', '3 personas'),
    new Checkbox('in_hogarTrabajan', '4 personas'),
    new Checkbox('in_hogarTrabajan', '5 o más personas'),
    new Checkbox('in_hogarTrabajan', 'Sin dato')
  ]),
  //
  // Salarios mínimos
  sal_min: new Section('sal_min', 'Salarios mínimos', [
    new Checkbox('sal_min', 'Menor o igual a 1 SM'),
    new Checkbox('sal_min', 'Hasta 2 SM'),
    new Checkbox('sal_min', 'Hasta 3 SM'),
    new Checkbox('sal_min', 'Hasta 4 SM'),
    new Checkbox('sal_min', 'De 5 a 10 SM'),
    new Checkbox('sal_min', 'De 11 a 25 SM'),
    new Checkbox('sal_min', 'Mayor a 25 SM')
  ])
})

export default {
  name: 'SociodemograficosComponent',

  components: {
    BaseComponent,
    ValidateCheckbox
  },

  props: {
    step: {
      type: Object,
      required: true
    }
  },

  mounted () {
    // this.fromTo(4, 8, this.model.edad.items)
  },

  data () {
    return {
      edadPanels: [1, 2, 3, 4],
      salarioPanels: [0],

      model: model()
    }
  },

  watch: {
    edadPanels () {
      this.update()
    },

    salarioPanels () {
      this.update()
    }
  },

  methods: {
    // ===========================================
    // Region: Base component methods to call
    // ===========================================
    //
    // Return selected data if there is no errors
    validateModel () {
      let retval

      //
      // Executes an action based in the response
      this.$refs.base.validateModel(response => {
        // if (!response.value) this.openAllPanels()

        retval = response
      })

      return retval
    },

    update () {
      //
      // Para hacer un slider para un componente
      // simplemente agregando la clase
      //
      $('.js-range-slider').ionRangeSlider()

      //
      // Rangos de la sección de: Manual -> edad
      //
      const ManualEdades = [
        { type: 'double', grid: true, min: 0, max: 100, from: 30, to: 75 },
        { type: 'double', grid: true, min: 0, max: 100, from: 25, to: 55 },
        { type: 'double', grid: true, min: 0, max: 100, from: 20, to: 45 }
      ]

      $('#rangeEdad_1').ionRangeSlider(ManualEdades[0])
      $('#rangeEdad_2').ionRangeSlider(ManualEdades[1])
      $('#rangeEdad_3').ionRangeSlider(ManualEdades[2])

      const rangeSalarioPromedioMensual = {
        type: 'double',
        grid: true,
        min: 0,
        max: 100000,
        from: 15000,
        to: 20000,
        prefix: '$',
        step: 5000
      }
      $('#rangeSalarioPromedioMensual').ionRangeSlider(rangeSalarioPromedioMensual)
    },

    fromTo (start, end, items) {
      const newItems = items.slice(start, end)
      return newItems
    }
  }
}
</script>
