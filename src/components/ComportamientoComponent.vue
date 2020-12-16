<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <template>
      <v-card-text>
        <v-card :class="getMobileClasses">
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
                      Elije los minimos y maximos de años de antiguedad del cliente
                    </p>

                    <input
                      :ref="model.antiguedad"
                      v-model="model.antiguedad.vmodel"
                      :name="model.antiguedad.id"
                      :id="model.antiguedad.id"
                    />
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Última actividad del cliente -->
              <v-col cols="12" sm="12" lg="6" :class="getMobileClasses">
                <v-card :class="!mobile && 'px-8'">
                  <v-card-title class="justify-center">
                    <h5 class="text-center">Ultima actividad</h5>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-center">
                      Elije los minimos y maximos en meses de la ultima actividad de cliente
                    </p>

                    <input
                      :ref="model.ultima_actividad"
                      v-model="model.ultima_actividad.vmodel"
                      :name="model.ultima_actividad.id"
                      :id="model.ultima_actividad.id"
                      type="text"
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
                      @on-change="
                        model.actividad_r.vmodel = model.actividad_r.items.getRangeOfDatedPretty()
                      "
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
                            <v-btn
                              color="default"
                              class="my-3"
                              @click="model.actividad_r.items.vmodel = []"
                              small
                            >
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
              <v-col cols="12" sm="6" md="4" :class="getMobileClasses">
                <v-card>
                  <v-card-title class="justify-center">
                    <h5>Fecha de última actividad de M</h5>
                  </v-card-title>
                  <v-card-text>
                    <validate-calendar
                      :model="model.actividad_m.items.vmodel"
                      rules="required|range"
                      :field="model.actividad_m.title"
                      @on-change="
                        model.actividad_m.vmodel = model.actividad_m.items.getRangeOfDatedPretty()
                      "
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
                          :class="mobile && 'elevation-1'"
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
                            <v-btn
                              color="default"
                              class="my-3"
                              @click="model.actividad_m.items.vmodel = []"
                              small
                            >
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
              <v-col cols="12" sm="6" md="4" :class="getMobileClasses">
                <v-card>
                  <v-card-title class="justify-center">
                    <h5>Fecha de última actividad de T</h5>
                  </v-card-title>
                  <v-card-text>
                    <validate-calendar
                      :model="model.actividad_t.items.vmodel"
                      rules="required|range"
                      :field="model.actividad_t.title"
                      @on-change="
                        model.actividad_t.vmodel = model.actividad_t.items.getRangeOfDatedPretty()
                      "
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
                          :class="mobile && 'elevation-1'"
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
                            <v-btn
                              color="default"
                              class="my-3"
                              @click="model.actividad_t.items.vmodel = []"
                              small
                            >
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

            <v-card :class="getMobileClasses">
              <v-card-title class="justify-center">
                <h4 class="text-center">C y A del cliente</h4>
              </v-card-title>

              <v-card-text :class="getMobileClasses">
                <p class="text-center">
                  En esta sección podras seleccionar algunas de las carateristicas del C y a del
                  cliente
                </p>

                <v-row>
                  <!-- Importe abonado -->
                  <v-col cols="12" md="6" :class="getMobileClasses">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5 class="text-center">Importe Abonado</h5>
                      </v-card-title>
                      <v-card-text>
                        <p class="text-center">
                          Elije los minimos y maximos de la linea de credito otorgada al cliente
                        </p>

                        <input
                          :ref="model.importe_abonado"
                          v-model="model.importe_abonado.vmodel"
                          :name="model.importe_abonado.id"
                          :id="model.importe_abonado.id"
                        />
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Canal de abono -->
                  <v-col cols="12" md="6" :class="getMobileClasses">
                    <v-card>
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
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5 class="text-center">Línea de C</h5>
                      </v-card-title>
                      <v-card-text>
                        <input
                          :ref="model.linea_c"
                          v-model="model.linea_c.vmodel"
                          :name="model.linea_c.id"
                          :id="model.linea_c.id"
                        />
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Fecha de último movimiento de A -->
                  <v-col cols="12" md="6" :class="getMobileClasses">
                    <v-card>
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
                          @on-change="
                            model.movimiento_a.vmodel = model.movimiento_a.items.getRangeOfDatedPretty()
                          "
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
                              :class="mobile && 'elevation-1'"
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
                                <v-btn
                                  color="default"
                                  class="my-3"
                                  @click="model.movimiento_a.items.vmodel = []"
                                  small
                                >
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
        </v-card>
      </v-card-text>
    </template>
  </base-component>
</template>

<script>
import baseMixin from '@/mixins/baseMixin'
import BaseComponent from './Helpers/BaseModelComponent'
import ValidateCalendar from './Helpers/ValidateCalendar'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
//
// Models
import Slider from '../models/Slider'
import Section from '@/models/Section'
import Checkbox from '@/models/Checkbox'
import Calendar from '../models/Calendar'
import SliderDate from '../models/SliderDate'
//
// External
var $ = require('jquery')

const model = () => ({
  //
  // Puntualidad
  // Prefix: com
  // There is another section with the same name
  com_puntualidad: new Section('com_puntualidad', 'Puntualidad', [
    new Checkbox('com_puntualidad', 'Cliente A'),
    new Checkbox('com_puntualidad', 'Cliente B'),
    new Checkbox('com_puntualidad', 'Cliente C'),
    new Checkbox('com_puntualidad', 'Cliente D'),
    new Checkbox('com_puntualidad', 'Cliente Nuevo'),
    new Checkbox('com_puntualidad', 'Cliente Moroso'),
    new Checkbox('com_puntualidad', 'Sin Dato/No incluir')
  ]),

  //
  // Tipo cliente
  tipo_cliente: new Section('tipo_cliente', 'Tipo cliente', [
    new Checkbox('tipo_cliente', 'Contado'),
    new Checkbox('tipo_cliente', 'Credito Titular'),
    new Checkbox('tipo_cliente', 'Credito Adicional'),
    new Checkbox('tipo_cliente', 'Credito Especial'),
    new Checkbox('tipo_cliente', 'Empleado Titular'),
    new Checkbox('tipo_cliente', 'Cliente Moroso'),
    new Checkbox('tipo_cliente', 'Sin Dato/No incluir')
  ]),

  //
  // FIX: cambiar a un radio button
  // ¿Es cliente?
  es_cliente: new Section('es_cliente', '¿Es cliente?', [
    new Checkbox('es_cliente', 'Sí'),
    new Checkbox('es_cliente', 'No')
  ]),

  //
  // Antiguedad
  antiguedad: new Slider('antiguedad', 'double', 0, 100, 10, 20, '', ' años'),

  //
  // Última actividad
  ultima_actividad: new SliderDate('ultima_actividad'),

  //
  // Fecha de última actividad de R
  actividad_r: new Section(
    'actividad_r',
    'Fecha de última actividad de R',
    new Calendar('actividad_r', [])
  ),

  //
  // Fecha de última actividad de M
  actividad_m: new Section(
    'actividad_m',
    'Fecha de última actividad de M',
    new Calendar('actividad_m', [])
  ),

  //
  // Fecha de última actividad de T
  actividad_t: new Section(
    'actividad_t',
    'Fecha de última actividad de T',
    new Calendar('actividad_t', [])
  ),

  //
  // Importe abonado
  importe_abonado: new Slider('importe_abonado', 'double', 0, 10000, 500, 2000, '$', '', 500),

  //
  // Canal de abono
  abono: new Section('abono', 'Canal de abono', [
    new Checkbox('abono', ' C '),
    new Checkbox('abono', 'A C'),
    new Checkbox('abono', 'W'),
    new Checkbox('abono', 'Sin identifica')
  ]),

  //
  // Línea C
  linea_c: new Slider('linea_c', 'double', 0, 10000, 100, 2000, '$'),

  //
  // Fecha del último movimiento de A
  movimiento_a: new Section(
    'movimiento_a',
    'Fecha del último movimiento de A',
    new Calendar('movimiento_a', [])
  )
})

export default {
  name: 'ComportamientoComponent',

  mixins: [baseMixin],

  components: {
    BaseComponent,
    ValidateCalendar,
    // ValidationProvider,
    ValidateCheckbox
  },

  props: {
    step: {
      type: Object,
      required: true
    }
  },

  created () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  mounted () {
    this.updateRenderSliders()
  },

  data () {
    return {
      locale: 'es-MX',
      mobile: false,
      model: model()
    }
  },

  computed: {
    getMobileClasses () {
      const retval = this.mobile ? 'pa-0 elevation-0 py-3' : 'my-2'
      return retval
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
    },

    onResize () {
      this.mobile = window.innerWidth <= 768
    },

    getCalendarSize () {
      const size = this.mobile ? 180 : null
      return size
    }
  }
}
</script>

<style lang="scss" scoped></style>
