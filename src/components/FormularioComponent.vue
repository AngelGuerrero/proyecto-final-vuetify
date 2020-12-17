<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <v-card-text>
      <v-card>
        <v-card-text>
          <form>
            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>Tu nombre</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <validation-provider
                  :name="model.nombre.name"
                  :rules="'required:' + model.nombre.name"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="model.nombre.vmodel"
                    @change="setValidation(model.nombre, errors.length)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>Área a la que perteneces</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <validation-provider
                  :name="model.area.name"
                  :rules="'required:' + model.area.name"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="model.area.vmodel"
                    @change="setValidation(model.area, errors.length)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <!-- Canal de recomendación -->
            <v-row>
              <v-col cols="12" md="6" class="d-flex align-center">
                <v-subheader>
                  ¿En que canal enviarás el segmento o recomendación?
                </v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <validation-provider rules="required" v-slot="{ validate }">
                  <v-radio-group
                    :error-messages="model.canal.vmodel ? [] : model.canal.validation.message"
                    v-model="model.canal.vmodel"
                    @change="model.canal.validation.valid = model.canal.vmodel !== null"
                  >
                    <v-radio
                      v-for="item in model.canal.items"
                      :key="item.id"
                      :name="model.canal.name"
                      :label="item"
                      :value="item"
                      @change="
                        validate
                        model.canal_otro.validation.valid = true
                      "
                    ></v-radio>
                  </v-radio-group>
                </validation-provider>

                <validation-provider
                  :name="model.canal_otro.title"
                  :rules="
                    model.canal.vmodel === 'Otro'
                      ? 'required:' + model.canal_otro.name + '|max:50'
                      : ''
                  "
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :disabled="model.canal.vmodel !== 'Otro'"
                    v-model="model.canal_otro.vmodel"
                    :error-messages="errors"
                    label="¿Cuál?"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>
                  ¿Podrias compartirnos el nombre de tu campaña o proyecto?
                </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <validation-provider
                  :name="model.campana.title"
                  :rules="'required:' + model.campana.name + '|max:50'"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="model.campana.vmodel"
                    @change="setValidation(model.campana, errors.length)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-subheader>
                  ¿Cual es la fecha de inicio de tu campaña o proyecto?
                </v-subheader>
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
                  <!-- Activator -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formatedDate"
                      :label="model.cam_fecha.title"
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="model.cam_fecha.validation.message"
                      prepend-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>
                  <!-- Default slot -->
                  <v-date-picker
                    ref="picker"
                    v-model="model.cam_fecha.vmodel"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>
                  Correo electronico donde enviaremos tu archivo.
                </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <validation-provider
                  :name="model.correo.name"
                  :rules="'required:' + model.correo.name + '|email'"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="model.correo.vmodel"
                    @change="setValidation(model.correo, errors.length)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-subheader>¿Como quieres nombrar tu archivo?</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <validation-provider
                  :name="model.archivo.name"
                  :rules="'required:' + model.archivo.name + '|max:15'"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="model.archivo.vmodel"
                    @change="setValidation(model.archivo, errors.length)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <h3 class="text-center">¡Listo!</h3>
          </form>
        </v-card-text>
      </v-card>
    </v-card-text>
  </base-component>
</template>

<script>
import BaseComponent from './Helpers/BaseModelComponent'
import baseMixin from '@/mixins/baseMixin'
import moment from 'moment'
import Section from '../models/Section'
//
// Validation
import { ValidationProvider, extend } from 'vee-validate'
import { required, email, max } from 'vee-validate/dist/rules'

/**
 * Model
 *
 * Contains all information of controls.
 */
const model = () => ({
  //
  // Nombre
  nombre: new Section('nombre', 'Nombre'),

  //
  // Área a la que perteneces
  area: new Section('area', 'Área a la que perteneces'),

  //
  // Canal de recomendación
  canal: new Section('canal', 'Canal de recomendación', [
    'Email',
    'SMS',
    'Paid Medi',
    'Venta por Telefono',
    'Otro'
  ]),

  //
  // Extension option for 'Canal de recomendación'
  canal_otro: new Section('canal_otro', 'Otra opción', null),

  //
  // Nombre de campaña
  campana: new Section('campana', 'Nombre de campaña'),

  //
  // Fecha de campaña
  cam_fecha: new Section(
    'cam_fecha',
    'Fecha de campaña',
    null,
    'La fecha de campaña es requerida.'
  ),

  //
  // Correo electrónico
  correo: new Section('correo', 'Correo electrónico'),

  //
  // Nombre de archivo
  archivo: new Section('archivo', 'Nombre de archivo')
})

/**
 * Extend 'required' validation
 */
extend('required', {
  ...required,

  validate (value, { name }) {
    return value !== null && value.length > 0
  },

  /**
   * Custom message bring it from validation model.
   *
   * In this way, you can change the validation message
   * for each one or single one control.
   */
  message: name => {
    return `El campo ${model()[name] !== undefined ? model()[name].title : ''} es requerido.`
  }
})

/**
 * Extend 'email' validation
 */
extend('email', {
  ...email,
  message: 'El correo electrónico no es válido.'
})

/**
 * Extend 'max' length validation
 */
extend('max', {
  ...max,

  params: ['length'],

  validate (value, { length }) {
    return value.length < length
  },

  message: 'El campo {_field_} no debe superar los {length} carácteres.'
})

export default {
  name: 'FormularioComponent',

  mixins: [baseMixin],

  components: {
    BaseComponent,
    ValidationProvider
  },

  props: {
    step: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      model: model(),
      date: null,
      formatedDate: null,
      menu: false
    }
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },

    'model.cam_fecha.vmodel' (val) {
      console.log(val)
      this.formatedDate = moment(val).format('DD/MM/YYYY')
    }
  },

  methods: {
    /**
     * Perform validations for date here,
     * maybe you want validate the limit date.
     */
    save (date) {
      this.$refs.menu.save(date)
      this.setValidation(this.model.cam_fecha, 0)
    },

    setValidation (model, value) {
      if (value === 0) {
        this.model[model.name].validation.valid = true
        this.model[model.name].validation.message = ''
      }
    }
  }
}
</script>
