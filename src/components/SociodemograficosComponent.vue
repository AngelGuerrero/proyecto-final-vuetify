<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <template #default="{ mutate, isValid }">
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
              @on-validate="mutate(model.genero, 'validation', $event)"
              @on-change="mutate(model.genero, 'vmodel', $event)"
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
              <v-expansion-panels
                focusable
                :accordion="isValid.value"
                :multiple="!isValid.value"
                v-model="edadPanels"
              >
                <!-- Option 1 -->
                <v-expansion-panel>
                  <v-expansion-panel-header class="d-flex flex-row">
                    <h4>Manual</h4>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content panel>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <p class="text-center">
                            Elije los mínimos y máximos de tu rango de edades
                          </p>
                          <input
                            :ref="model.s_edad_1.id"
                            v-model="model.s_edad_1.vmodel"
                            :name="model.s_edad_1.id"
                            :id="model.s_edad_1.id"
                          />
                        </v-col>

                        <v-col cols="12">
                          <p class="text-center">
                            ¿Necesitas un rango más?
                          </p>
                          <input
                            :ref="model.s_edad_2.id"
                            v-model="model.s_edad_2.vmodel"
                            :name="model.s_edad_2.id"
                            :id="model.s_edad_2.id"
                          />
                        </v-col>

                        <v-col cols="12">
                          <p class="text-center">¿Otro?</p>
                          <input
                            :ref="model.s_edad_3.id"
                            v-model="model.s_edad_3.vmodel"
                            :name="model.s_edad_3.id"
                            :id="model.s_edad_3.id"
                          />
                        </v-col>
                      </v-row>
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
                      @on-change="mutate(model.edad, 'vmodel', $event)"
                      @on-validate="mutate(model.edad, 'validation', $event)"
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

                    <validate-checkbox
                      custom
                      validation="one"
                      :model="model.vida"
                      @on-change="mutate(model.vida, 'vmodel', $event)"
                      @on-validate="mutate(model.vida, 'validation', $event)"
                    >
                      <template #default="{ results }">
                        <v-row>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              v-model="model.vida.items[0].checked"
                              :value="model.vida.items[0].checked"
                              :label="model.vida.items[0].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>edades entre 15 y 24 años.</p>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              v-model="model.vida.items[1].checked"
                              :value="model.vida.items[1].checked"
                              :label="model.vida.items[1].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>edades entre 25 y 39 años.</p>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              v-model="model.vida.items[2].checked"
                              :value="model.vida.items[2].checked"
                              :label="model.vida.items[2].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>edades entre 40 y 64 años.</p>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-checkbox
                              v-model="model.vida.items[3].checked"
                              :value="model.vida.items[3].checked"
                              :label="model.vida.items[3].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>65 años y más</p>
                          </v-col>
                        </v-row>
                      </template>
                    </validate-checkbox>
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

                    <validate-checkbox
                      custom
                      validation="one"
                      :model="model.generacion"
                      @on-change="mutate(model.generacion, 'vmodel', $event)"
                      @on-validate="mutate(model.generacion, 'validation', $event)"
                    >
                      <template #default="{ results }">
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-checkbox
                              v-model="model.generacion.items[0].checked"
                              :value="model.generacion.items[0].checked"
                              :label="model.generacion.items[0].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>Clientes que nacieron en 1995 hasta el dia de hoy</p>

                            <v-checkbox
                              v-model="model.generacion.items[1].checked"
                              :value="model.generacion.items[1].checked"
                              :label="model.generacion.items[1].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>Clientes que nacieron entre 1982 y 1994</p>

                            <v-checkbox
                              v-model="model.generacion.items[2].checked"
                              :value="model.generacion.items[2].checked"
                              :label="model.generacion.items[2].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>Clientes que nacieron entre 1965 y 1981</p>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-checkbox
                              v-model="model.generacion.items[3].checked"
                              :value="model.generacion.items[3].checked"
                              :label="model.generacion.items[3].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>Clientes que nacieron entre 1945 y 1964</p>

                            <v-checkbox
                              v-model="model.generacion.items[4].checked"
                              :value="model.generacion.items[4].checked"
                              :label="model.generacion.items[4].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p>Clientes que nacieron entre 1925 y 1944</p>
                          </v-col>
                        </v-row>
                      </template>
                    </validate-checkbox>
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
                @on-validate="mutate(model.escolaridad, 'validation', $event)"
                @on-change="mutate(model.escolaridad, 'vmodel', $event)"
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
                  @on-validate="mutate(model.e_civil, 'validation', $event)"
                  @on-change="mutate(model.e_civil, 'vmodel', $event)"
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
                @on-validate="mutate(model.in_hogar, 'validation', $event)"
                @on-change="mutate(model.in_hogar, 'vmodel', $event)"
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
                @on-validate="mutate(model.in_hogarTrabajan, 'validation', $event)"
                @on-change="mutate(model.in_hogarTrabajan, 'vmodel', $event)"
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
                      @on-validate="mutate(model.sal_min, 'validation', $event)"
                      @on-change="mutate(model.sal_min, 'vmodel', $event)"
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
                        <input
                          :ref="model.in_mensual"
                          v-model="model.in_mensual.vmodel"
                          :name="model.in_mensual.id"
                          :id="model.in_mensual.id"
                        />
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
                    <validate-checkbox
                      custom
                      validation="one"
                      :model="model.socioe"
                      @on-change="mutate(model.socioe, 'vmodel', $event)"
                      @on-validate="mutate(model.socioe, 'validation', $event)"
                    >
                      <template #default="{ results }">
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-model="model.socioe.items[0].checked"
                              :value="model.socioe.items[0].checked"
                              :label="model.socioe.items[0].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $94,864
                            </p>

                            <v-checkbox
                              v-model="model.socioe.items[1].checked"
                              :value="model.socioe.items[1].checked"
                              :label="model.socioe.items[1].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $39,061
                            </p>

                            <v-checkbox
                              v-model="model.socioe.items[2].checked"
                              :value="model.socioe.items[2].checked"
                              :label="model.socioe.items[2].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $22,205
                            </p>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-model="model.socioe.items[3].checked"
                              :value="model.socioe.items[3].checked"
                              :label="model.socioe.items[3].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $16,740
                            </p>

                            <v-checkbox
                              v-model="model.socioe.items[4].checked"
                              :value="model.socioe.items[4].checked"
                              :label="model.socioe.items[4].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $12,945
                            </p>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-checkbox
                              v-model="model.socioe.items[5].checked"
                              :value="model.socioe.items[5].checked"
                              :label="model.socioe.items[5].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $7,833
                            </p>

                            <v-checkbox
                              v-model="model.socioe.items[6].checked"
                              :value="model.socioe.items[6].checked"
                              :label="model.socioe.items[6].slug"
                              :error="!results.valid"
                            ></v-checkbox>
                            <p class="text-left">
                              Ingreso promedio mensual $3,712
                            </p>
                          </v-col>
                        </v-row>
                      </template>
                    </validate-checkbox>
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
import Slider from '../models/Slider'
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'
// Mixin
import baseMixin from '@/mixins/baseMixin'
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
  // Sliders edad
  s_edad_1: new Slider('s_edad_1', 'double', 0, 100, 10, 20, '', ' años'),
  s_edad_2: new Slider('s_edad_2', 'double', 0, 110, 1, 10, '', ' años'),
  s_edad_3: new Slider('s_edad_3', 'double', 0, 120, 40, 70, '', ' años'),
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
  // Etapas de vida
  vida: new Section('vida', 'Etapas de vida', [
    new Checkbox('vida', 'Adolecentes'),
    new Checkbox('vida', 'Adultos jovenes'),
    new Checkbox('vida', 'Adultos'),
    new Checkbox('vida', 'Jubilados')
  ]),
  //
  // Generación
  generacion: new Section('generacion', 'Generación', [
    new Checkbox('ancla', 'Generación Z'),
    new Checkbox('ancla', 'Millennials (Y)'),
    new Checkbox('ancla', 'Generación X'),
    new Checkbox('ancla', 'Baby Boom'),
    new Checkbox('ancla', 'Generación Silenciosa')
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
  ]),
  //
  // Ingreso promedio mensual
  in_mensual: new Slider('in_mensual', 'double', 0, 100000, 120, 5000, '$', ' pesos', 5000),
  //
  // Nivel socioeconómico
  socioe: new Section('socioe', 'Nivel socioeconómico', [
    new Checkbox('ancla', 'A/B'),
    new Checkbox('ancla', 'C+'),
    new Checkbox('ancla', 'C'),
    new Checkbox('ancla', 'C-'),
    new Checkbox('ancla', 'D+'),
    new Checkbox('ancla', 'D'),
    new Checkbox('ancla', 'E')
  ])
})

export default {
  name: 'SociodemograficosComponent',

  mixins: [baseMixin],

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
    this.updateRenderSliders()
  },

  data () {
    return {
      edadPanels: [],
      edadPanelsTotal: 4,
      salarioPanels: [],
      salarioPanelsTotal: 3,
      model: model()
    }
  },

  watch: {
    edadPanels () {
      this.updateRenderSliders()
    },

    salarioPanels () {
      this.updateRenderSliders()
    }
  },

  methods: {
    // ===========================================
    // Region: Base component methods to call
    // ===========================================
    //
    // @Override mixin function
    validateModel () {
      let retval

      // Executes an action based in the response
      this.$refs.base.validateModel(response => {
        if (!response.value) {
          this.edadPanels = this.openAllPanels(this.edadPanelsTotal)
          this.salarioPanels = this.openAllPanels(this.salarioPanelsTotal)
          setTimeout(() => this.updateRenderSliders(), 1000)
        }

        retval = response
      })

      return retval
    },

    /**
     * Must load jquery library and re-render sliders
     * when expansion panels open.
     */
    updateRenderSliders () {
      $('.js-range-slider').ionRangeSlider()
      //
      // Sliders from the model
      this.renderSlider(this.model.s_edad_1)
      this.renderSlider(this.model.s_edad_2)
      this.renderSlider(this.model.s_edad_3)
      this.renderSlider(this.model.in_mensual)
    },

    renderSlider (slider) {
      // Proxy
      const that = this
      const getSliderId = data => data.input[0].id
      //
      // Start
      const onStart = data => {
        const id = getSliderId(data)
        that.mutate(that.model[id], 'vmodel', this.selectDataFromSlider(data))
      }
      //
      // onChange
      const onChange = data => {
        const id = getSliderId(data)
        that.mutate(that.model[id], 'vmodel', this.selectDataFromSlider(data))
      }
      //
      // onFinish
      const onFinish = data => {}
      //
      // onUpdate
      const onUpdate = data => {}

      //
      // Slider options and listen events.
      $(`#${slider.id}`).ionRangeSlider({
        keyboard: true,
        onStart: data => onStart(data),
        onChange: data => onChange(data),
        onFinish: data => onFinish(data),
        onUpdate: data => onUpdate(data),
        ...slider.getSliderOptions()
      })
    },

    /**
     * selectDataFromSlider
     *
     * Select and return an object
     * from slider data.
     */
    selectDataFromSlider (data) {
      return {
        from: data.from,
        to: data.to,
        min: data.min,
        max: data.max
      }
    },

    fromTo (start, end, items) {
      const newItems = items.slice(start, end)
      return newItems
    },

    onChange (event) {
      console.log(event)
    }
  }
}
</script>
