<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <v-card-text :class="getMobileClasses">
      <v-row>
        <!-- Puntualidad -->
        <v-col cols="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Puntualidad</h5>
            </v-card-title>
            <v-card-text>
              <validate-checkbox
                :model="model.com_puntualidad"
                validation="one"
                @on-change="mutate(model.com_puntualidad, 'vmodel', $event)"
                @on-validate="mutate(model.com_puntualidad, 'validation', $event)"
              ></validate-checkbox>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Tipo de cliente -->
        <v-col cols="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Tipo de cliente</h5>
            </v-card-title>
            <v-card-text>
              <validate-checkbox
                :model="model.tipo_cliente"
                validation="one"
                @on-change="mutate(model.tipo_cliente, 'vmodel', $event)"
                @on-validate="mutate(model.tipo_cliente, 'validation', $event)"
              ></validate-checkbox>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- ¿Es cliente? -->
        <v-col cols="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>¿Es cliente?</h5>
            </v-card-title>
            <v-card-text>
              <validate-checkbox
                :model="model.es_cliente"
                validation="one"
                @on-change="mutate(model.es_cliente, 'vmodel', $event)"
                @on-validate="mutate(model.es_cliente, 'validation', $event)"
              ></validate-checkbox>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!--
              Sliders
            -->
      <v-row>
        <!-- Antiguedad del cliente -->
        <v-col cols="12" sm="12" lg="6" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Antiguedad del cliente</h5>
            </v-card-title>
            <v-card-text>
              <p class="text-center">
                Elije los mínimos y máximos de años de antiguedad del cliente
              </p>

              <input
                :ref="model.antiguedad"
                v-model="model.antiguedad.vmodel"
                :name="model.antiguedad.id"
                :class="model.antiguedad.id"
              />
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Última actividad del cliente -->
        <v-col cols="12" sm="12" lg="6" :class="getMobileClasses">
          <!-- <v-card :class="!mobile && 'px-8'"> -->
          <v-card class="px-8">
            <v-card-title class="justify-center">
              <h5 class="text-center">Última actividad</h5>
            </v-card-title>
            <v-card-text>
              <p class="text-center">
                Elije los mínimos y máximos en meses de la última actividad de cliente
              </p>

              <input
                :ref="model.ultima_actividad"
                v-model="model.ultima_actividad.vmodel"
                :name="model.ultima_actividad.id"
                type="text"
                :class="model.ultima_actividad.id"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Fecha de última actividad de R -->
        <v-col cols="12" sm="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Fecha de última actividad de R</h5>
            </v-card-title>
            <v-card-text>
              <validate-calendar
                :model="model.actividad_r.items.vmodel"
                rules="required|range"
                :field="model.actividad_r.title"
                @on-change="model.actividad_r.vmodel = model.actividad_r.items.getRangeOfDatedPretty()"
                @on-validate="model.actividad_r.validation = $event"
                v-slot="{ results }"
              >
                <v-container>
                  <p v-show="!results.valid" class="error--text">
                    {{ results.message }}
                  </p>
                  <v-date-picker
                    v-model="model.actividad_r.items.vmodel"
                    range
                    :locale="locale"
                    full-width
                    :color="results.valid ? 'blue' : 'error'"
                    elevation="15"
                  ></v-date-picker>
                  <v-container v-show="results.valid">
                    <p class="d-flex flex-column">
                      <strong>
                        Inicio:
                        {{ model.actividad_r.items.getRangeOfDatedPretty()[0] }}
                      </strong>
                      <strong>
                        Fin:
                        {{ model.actividad_r.items.getRangeOfDatedPretty()[1] }}
                      </strong>
                      <v-btn color="blue darken-3" dark class="my-3" @click="model.actividad_r.items.vmodel = []">
                        Limpiar
                      </v-btn>
                    </p>
                  </v-container>
                </v-container>
              </validate-calendar>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Fecha de última actividad de M -->
        <v-col cols="12" sm="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Fecha de última actividad de M</h5>
            </v-card-title>
            <v-card-text>
              <validate-calendar
                :model="model.actividad_m.items.vmodel"
                rules="required|range"
                :field="model.actividad_m.title"
                @on-change="model.actividad_m.vmodel = model.actividad_m.items.getRangeOfDatedPretty()"
                @on-validate="model.actividad_m.validation = $event"
                v-slot="{ results }"
              >
                <v-container>
                  <p v-show="!results.valid" class="error--text">
                    {{ results.message }}
                  </p>
                  <v-date-picker
                    v-model="model.actividad_m.items.vmodel"
                    range
                    :locale="locale"
                    full-width
                    :color="results.valid ? 'blue' : 'error'"
                    elevation="15"
                  ></v-date-picker>
                  <v-container v-show="results.valid">
                    <p class="d-flex flex-column">
                      <strong>
                        Inicio:
                        {{ model.actividad_m.items.getRangeOfDatedPretty()[0] }}
                      </strong>
                      <strong>
                        Fin:
                        {{ model.actividad_m.items.getRangeOfDatedPretty()[1] }}
                      </strong>
                      <v-btn color="blue darken-3" class="my-3" dark @click="model.actividad_m.items.vmodel = []">
                        Limpiar
                      </v-btn>
                    </p>
                  </v-container>
                </v-container>
              </validate-calendar>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Fecha de última actividad de T -->
        <v-col cols="12" sm="12" md="4" :class="getMobileClasses">
          <v-card>
            <v-card-title class="justify-center">
              <h5>Fecha de última actividad de T</h5>
            </v-card-title>
            <v-card-text>
              <validate-calendar
                :model="model.actividad_t.items.vmodel"
                rules="required|range"
                :field="model.actividad_t.title"
                @on-change="model.actividad_t.vmodel = model.actividad_t.items.getRangeOfDatedPretty()"
                @on-validate="model.actividad_t.validation = $event"
                v-slot="{ results }"
              >
                <v-container>
                  <p v-show="!results.valid" class="error--text">
                    {{ results.message }}
                  </p>
                  <v-date-picker
                    v-model="model.actividad_t.items.vmodel"
                    range
                    :locale="locale"
                    full-width
                    :color="results.valid ? 'blue' : 'error'"
                    elevation="15"
                  ></v-date-picker>
                  <v-container v-show="results.valid">
                    <p class="d-flex flex-column">
                      <strong>
                        Inicio:
                        {{ model.actividad_t.items.getRangeOfDatedPretty()[0] }}
                      </strong>
                      <strong>
                        Fin:
                        {{ model.actividad_t.items.getRangeOfDatedPretty()[1] }}
                      </strong>
                      <v-btn color="blue darken-3" class="my-3" dark @click="model.actividad_t.items.vmodel = []">
                        Limpiar
                      </v-btn>
                    </p>
                  </v-container>
                </v-container>
              </validate-calendar>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card>
        <v-card-title class="justify-center">
          <h4 class="text-center">C y A del cliente</h4>
        </v-card-title>

        <v-card-text :class="getMobileClasses">
          <p class="text-center">
            En esta sección podrás seleccionar algunas de las caraterísticas del C y del cliente
          </p>

          <v-row>
            <!-- Importe abonado -->
            <v-col cols="12" md="6" :class="getMobileClasses">
              <v-card :class="getMobileClasses">
                <v-card-title class="justify-center">
                  <h5 class="text-center">Importe Abonado</h5>
                </v-card-title>
                <v-card-text>
                  <p class="text-center">
                    Elije los mínimos y máximos de la línea de crédito otorgada al cliente
                  </p>

                  <input
                    :ref="model.importe_abonado"
                    v-model="model.importe_abonado.vmodel"
                    :name="model.importe_abonado.id"
                    :class="model.importe_abonado.id"
                  />
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Canal de abono -->
            <v-col cols="12" md="6" :class="getMobileClasses">
              <v-card :class="getMobileClasses">
                <v-card-title class="justify-center">
                  <h5 class="text-center">Canal de Abono</h5>
                </v-card-title>
                <v-card-text>
                  <validate-checkbox
                    :model="model.abono"
                    validation="one"
                    @on-change="mutate(model.abono, 'vmodel', $event)"
                    @on-validate="mutate(model.abono, 'validation', $event)"
                  ></validate-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <!-- Línea de C -->
            <v-col cols="12" md="6" :class="getMobileClasses">
              <v-card :class="getMobileClasses">
                <v-card-title class="justify-center">
                  <h5 class="text-center">Línea de C</h5>
                </v-card-title>
                <v-card-text>
                  <input
                    :ref="model.linea_c"
                    v-model="model.linea_c.vmodel"
                    :name="model.linea_c.id"
                    :class="model.linea_c.id"
                  />
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Fecha de último movimiento de A -->
            <v-col cols="12" md="6" :class="getMobileClasses">
              <v-card :class="getMobileClasses">
                <v-card-title class="justify-center">
                  <h5 class="text-center">
                    Fecha del último movimiento de A
                  </h5>
                </v-card-title>
                <v-card-text>
                  <validate-calendar
                    :model="model.movimiento_a.items.vmodel"
                    rules="required|range"
                    :field="model.movimiento_a.title"
                    @on-change="model.movimiento_a.vmodel = model.movimiento_a.items.getRangeOfDatedPretty()"
                    @on-validate="model.movimiento_a.validation = $event"
                    v-slot="{ results }"
                  >
                    <v-container>
                      <p v-show="!results.valid" class="error--text">
                        {{ results.message }}
                      </p>
                      <v-date-picker
                        v-model="model.movimiento_a.items.vmodel"
                        range
                        :locale="locale"
                        full-width
                        :color="results.valid ? 'blue' : 'error'"
                        elevation="15"
                      ></v-date-picker>
                      <v-container v-show="results.valid">
                        <p class="d-flex flex-column">
                          <strong>
                            Inicio:
                            {{ model.movimiento_a.items.getRangeOfDatedPretty()[0] }}
                          </strong>
                          <strong>
                            Fin:
                            {{ model.movimiento_a.items.getRangeOfDatedPretty()[1] }}
                          </strong>
                          <v-btn color="blue darken-3" dark class="my-3" @click="model.movimiento_a.items.vmodel = []">
                            Limpiar
                          </v-btn>
                        </p>
                      </v-container>
                    </v-container>
                  </validate-calendar>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </base-component>
</template>

<script>
import baseMixin from '@/mixins/baseMixin'
import ValidateCalendar from './Helpers/ValidateCalendar'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
//
// Model
import { COMPORTAMIENTO as model } from '@/api/data'

// External
var $ = require('jquery')

export default {
  name: 'ComportamientoComponent',

  mixins: [baseMixin],

  components: {
    ValidateCalendar,
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
      locale: 'es-MX',
      mobile: true,
      model
    }
  },

  computed: {
    getMobileClasses () {
      return this.$vuetify.breakpoint.width <= 768 ? 'elevation-0 py-3' : 'my-2'
    }
  },

  methods: {
    /**
     * Must load jquery library and re-render sliders
     * when expansion panels open.
     */
    updateRenderSliders () {
      $('.js-range-slider').ionRangeSlider()
      //
      // Sliders from the model
      this.renderSlider(this.model.antiguedad)
      this.renderSlider(this.model.ultima_actividad)
      this.renderSlider(this.model.importe_abonado)
      this.renderSlider(this.model.linea_c)
    }
  }
}
</script>
