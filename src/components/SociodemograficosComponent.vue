<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
    v-slot="{ mutate, isValid }"
  >
    <!-- Género -->
    <v-card class="elevation-0 ma-0 pa-0">
      <v-card-title primary-title class="justify-center">
        <h3>Género</h3>
      </v-card-title>
      <v-card-text>
        <div class="elevation-3 pa-3 rounded">
          <validate-checkbox
            :model="model.genero"
            validation="all"
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
            <v-expansion-panels focusable :accordion="isValid.value" :multiple="!isValid.value" v-model="edadPanels">
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
                    validation="none"
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
                    validation="none"
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
                    validation="none"
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
              validation="none"
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
                validation="none"
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
              validation="none"
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
              validation="none"
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
                      Salario mínimo general vigente a partir del 1° de enero de 2020 corresponde a $123.22 pesos
                    </p>
                  </v-container>
                </v-expansion-panel-header>

                <v-expansion-panel-content panel>
                  <validate-checkbox
                    custom
                    validation="none"
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
                        :class="model.in_mensual.id"
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
                    validation="none"
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
  </base-component>
</template>

<script>
import { SOCIODEMOGRAFICOS as model } from '@/api/data'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
// Mixin
import baseMixin from '@/mixins/baseMixin'
var $ = require('jquery')

export default {
  name: 'SociodemograficosComponent',

  mixins: [baseMixin],

  components: {
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
      model
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

    fromTo (start, end, items) {
      const newItems = items.slice(start, end)
      return newItems
    }
  }
}
</script>
