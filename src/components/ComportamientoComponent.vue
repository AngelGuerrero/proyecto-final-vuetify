<template>
  <base-component
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <template>
      <v-card-title class="justify-center">
        <h1 class="text-center subtitle-2 text-md-h4">
          Categoria Comportamiento del cliente
        </h1>
      </v-card-title>

      <v-card-text>
        <section>
          <article>
            <h3 class="text-center text-xl sm:text-2xl">
              Categoria Comportamiento del cliente
            </h3>

            <p class="text-center">
              En Comportamiento del cliente puedes filtrar las caracteristacas del comportamiento de compra
              del cliente. Ahora bien, si no lo requieres, pues dar clic en continuar.
            </p>

            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-card>
                      <v-card-title>
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

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-card-title>
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

                  <v-col cols="12" md="4">
                    <v-card>
                      <v-card-title>
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

                <v-row>
                  <!-- Antiguedad del cliente -->
                  <v-col cols="12" md="6">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5 class="text-center">Antiguedad del cliente</h5>
                      </v-card-title>
                      <v-card-text>
                        <p class="text-center">
                          Elije los minimos y maximos de años de antiguedad del cliente
                        </p>

                        <v-row>
                          <v-col cols="12">
                            <input
                              :ref="model.antiguedad"
                              v-model="model.antiguedad.vmodel"
                              :name="model.antiguedad.id"
                              :id="model.antiguedad.id"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Última actividad del cliente -->
                  <v-col cols="12" md="6">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5 class="text-center">Ultima actividad</h5>
                      </v-card-title>
                      <v-card-text>
                        <p class="text-center">
                          Elije los minimos y maximos en meses de la ultima actividad de cliente
                        </p>

                        <v-row>
                          <v-col cols="12">
                            <input
                              :ref="model.ultima_actividad"
                              v-model="model.ultima_actividad.vmodel"
                              :name="model.ultima_actividad.id"
                              :id="model.ultima_actividad.id"
                              type="text"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5>Fecha de ultima actividad e R</h5>
                      </v-card-title>
                      <v-card-text>
                        <v-row justify="center">
                          <v-date-picker
                            v-model="fechaUltimaActividadR"
                            range
                            :width="getCalendarSize"
                          ></v-date-picker>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="4">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5>Fecha de ultima actividad e M</h5>
                      </v-card-title>
                      <v-card-text>
                        <v-row justify="center">
                          <v-date-picker
                            v-model="fechUltimaActividadM"
                            :width="getCalendarSize"
                            range
                          ></v-date-picker>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="12" md="4" lg="4">
                    <v-card>
                      <v-card-title class="justify-center">
                        <h5>Fecha de ultima actividad e T</h5>
                      </v-card-title>
                      <v-card-text>
                        <v-row justify="center">
                          <v-date-picker v-model="fechaUltimaActividadT" :width="getCalendarSize" range />
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <div>
                  <v-card>
                    <v-card-title class="justify-center">
                      <h4 class="text-center">C y A del cliente</h4>
                    </v-card-title>

                    <v-card-text>
                      <p class="text-center">
                        En esta sección podras seleccionar algunas de las carateristicas del C y a del cliente
                      </p>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-card>
                            <v-card-title class="justify-center">
                              <h5 class="text-center">Importe Abonado</h5>
                            </v-card-title>
                            <v-card-text>
                              <p class="text-center">
                                Elije los minimos y maximos de la linea de credito otorgada al cliente
                              </p>

                              <v-row>
                                <v-col cols="12">
                                  <input
                                    :ref="model.importe_abonado"
                                    v-model="model.importe_abonado.vmodel"
                                    :name="model.importe_abonado.id"
                                    :id="model.importe_abonado.id"
                                  />
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-card>
                            <v-card-title class="justify-center">
                              <h5 class="text-center">Canal de Abono</h5>
                            </v-card-title>
                            <v-card-text>
                              <v-checkbox label=" C "></v-checkbox>
                              <v-checkbox label="A C"></v-checkbox>
                              <v-checkbox label="W"></v-checkbox>
                              <v-checkbox label="Sin identifica"></v-checkbox>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-card>
                            <v-card-title class="justify-center">
                              <h5 class="text-center">Linea de C</h5>
                            </v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <input
                                    :ref="model.linea_c"
                                    v-model="model.linea_c.vmodel"
                                    :name="model.linea_c.id"
                                    :id="model.linea_c.id"
                                  />
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-card>
                            <v-card-title class="justify-center">
                              <h5 class="mb-3 text-center">
                                Fecha del ultimo movimiento de A
                              </h5>
                            </v-card-title>
                            <v-card-text>
                              <v-row class="justify-center">
                                <v-date-picker
                                  v-model="fechaUltimoMovimientoA"
                                  range
                                  :width="getCalendarSize"
                                ></v-date-picker>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
              </v-card-text>
            </v-card>
          </article>
        </section>
      </v-card-text>
    </template>
  </base-component>
</template>

<script>
/* eslint-disable no-unused-vars */
import BaseComponent from './Helpers/BaseModelComponent'
import baseMixin from '@/mixins/baseMixin'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
// Models
import Section from '@/models/Section'
import Checkbox from '@/models/Checkbox'
import Slider from '../models/Slider'
import SliderDate from '../models/SliderDate'
var $ = require('jquery')

const model = () => ({
  //
  // Puntualidad
  // Prefix: com
  // Hay otro dato con el mismo nombre
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
  // Importe abonado
  importe_abonado: new Slider('importe_abonado', 'double', 0, 10000, 500, 2000, '$', '', 500),

  //
  // Canal de abono
  ancla: new Section('ancla', 'Canal de abono', [

  ]),

  //
  // Línea C
  linea_c: new Slider('linea_c', 'double', 0, 10000, 100, 2000, '$')
})

export default {
  name: 'ComportamientoComponent',

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

  created () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  mounted () {
    this.updateRenderSliders()
    //
    // Para hacer un slider para un componente
    // simplemente agregando la clase
    //
    // $('.js-range-slider').ionRangeSlider()

    //
    // Rangos de la sección del comportamiento del cliente
    //
    const rangeAntiguedadCliente = {
      grid: true,
      from: 3,
      values: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
    $('#rangeAntiguedadCliente').ionRangeSlider(rangeAntiguedadCliente)

    const rangeClienteUltimaActividad = {
      grid: true,
      from: 3,
      values: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
    $('#rangeClienteUltimaActividad').ionRangeSlider(rangeClienteUltimaActividad)

    const rangeImporteAbonado = {
      type: 'double',
      grid: true,
      min: 0,
      max: 100,
      from: 20,
      to: 45,
      prefix: '$'
    }
    $('#rangeImporteAbonado').ionRangeSlider(rangeImporteAbonado)
    $('#rangeLineaDeC').ionRangeSlider(rangeImporteAbonado)
  },

  data () {
    return {
      fechaUltimaActividadR: [],
      fechUltimaActividadM: [],
      fechaUltimaActividadT: [],
      fechaUltimoMovimientoA: [],
      mobile: false,
      model: model()
    }
  },

  computed: {
    getCalendarSize () {
      const size = this.mobile ? 180 : window.outerWidth >= 1440 ? '100%' : 240
      return size
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
      this.mobile = window.outerWidth <= 320
    }
  }
}
</script>

<style lang="scss" scoped></style>
