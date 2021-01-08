<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <v-card-text>
      <v-row class="rounded">
        <v-col cols="12" md="4">
          <v-subheader class="font-weight-bold">
            Tu nombre
          </v-subheader>
        </v-col>
        <v-col cols="12" md="8">
          <validation-provider
            :rules="'required:' + model.nombre.name"
            :name="model.nombre.name"
            immediate
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-account"
              :error-messages="errors"
              v-model="model.nombre.vmodel"
              @change="mutate(model.nombre, 'validation', hasErrors(errors))"
              class="ma-0 pa-0"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-subheader class="font-weight-bold">
            Área a la que perteneces
          </v-subheader>
        </v-col>
        <v-col cols="12" md="8">
          <validation-provider
            :rules="'required:' + model.area.name"
            :name="model.area.name"
            immediate
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-badge-account-horizontal"
              :error-messages="errors"
              v-model="model.area.vmodel"
              @change="mutate(model.area, 'validation', hasErrors(errors))"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <!-- Canal de recomendación -->
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-subheader class="font-weight-bold">
            ¿En que canal enviarás el segmento o recomendación?
          </v-subheader>
        </v-col>
        <v-col cols="12" md="6">
          <validation-provider
            rules="required_radio"
            :name="model.canal.name"
            immediate
            v-slot="{ errors }"
          >
            <v-radio-group :error-messages="errors" v-model="model.canal.vmodel">
              <v-radio
                v-for="item in model.canal.items"
                :key="item.id"
                :name="model.canal.name"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </validation-provider>

          <validation-provider
            :rules="
              model.canal.vmodel === 'Otro'
                ? 'required:' + model.canal_otro.name + '|max:50'
                : ''
            "
            immediate
            :name="model.canal_otro.title"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-account-question"
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
          <v-subheader class="font-weight-bold">
            ¿Podrias compartirnos el nombre de tu campaña o proyecto?
          </v-subheader>
        </v-col>
        <v-col cols="12" md="8">
          <validation-provider
            :rules="'required:' + model.campana.name + '|max:50'"
            :name="model.campana.title"
            immediate
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-pencil"
              :error-messages="errors"
              v-model="model.campana.vmodel"
              @change="mutate(model.campana, 'validation', hasErrors(errors))"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="d-flex align-center">
          <v-subheader class="font-weight-bold">
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
              @change="
                save
                mutate(model.cam_fecha, 'validation', validateDate($event))
              "
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-subheader class="font-weight-bold">
            Correo electronico donde enviaremos tu archivo.
          </v-subheader>
        </v-col>
        <v-col cols="12" md="8">
          <validation-provider
            :rules="'required:' + model.correo.name + '|email'"
            :name="model.correo.name"
            immediate
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-email"
              autocomplete
              :error-messages="errors"
              v-model="model.correo.vmodel"
              @input="mutate(model.correo, 'validation', hasErrors(errors))"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-subheader class="font-weight-bold">
            ¿Como quieres nombrar tu archivo?
          </v-subheader>
        </v-col>
        <v-col cols="12" md="8">
          <validation-provider
            :name="model.archivo.name"
            :rules="'required:' + model.archivo.name + '|max:15'"
            immediate
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              filled
              prepend-inner-icon="mdi-file"
              :error-messages="errors"
              v-model="model.archivo.vmodel"
              @change="mutate(model.archivo, 'validation', hasErrors(errors))"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <h3 class="text-center">¡Listo!</h3>
    </v-card-text>
  </base-component>
</template>

<script>
import BaseComponent from './Helpers/BaseModelComponent'
import baseMixin from '@/mixins/baseMixin'
import moment from 'moment'
import Section from '../models/Section'
// Validation
import { ValidationProvider, extend } from 'vee-validate'
import { required, email, max } from 'vee-validate/dist/rules'

/**
 * Model
 *
 * Contains all information of controls.
 */
const model = {
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
  canal_otro: new Section('canal_otro', 'Otra opción'),

  //
  // Nombre de campaña
  campana: new Section('campana', 'Nombre de campaña'),

  //
  // Fecha de campaña
  cam_fecha: new Section('cam_fecha', 'Fecha de campaña'),

  //
  // Correo electrónico
  correo: new Section('correo', 'Correo electrónico'),

  //
  // Nombre de archivo
  archivo: new Section('archivo', 'Nombre de archivo')
}

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
    return `El campo ${model[name] !== undefined ? model[name].title : ''} es requerido.`
  }
})

extend('required_radio', {
  ...required,

  validate (value) {
    return value !== null
  },

  message: 'Debes seleccionar una opción'
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
      model,
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
      this.formatedDate = moment(val).format('DD/MM/YYYY')
    },

    'model.canal.vmodel' (val) {
      //
      // Validate canal
      const isCanalValid = val !== null
      this.model.canal.validation.valid = isCanalValid
      this.model.canal.validation.message = isCanalValid ? '' : 'Selecciona una opcion'

      //
      // Is valid if the canal vmodel is distinct to 'otro'
      const isCanalOtroActive = val.toLowerCase() === 'otro'

      //
      // Canal otro
      if (isCanalOtroActive) {
        const isCanalOtroValid = this.model.canal_otro.vmodel !== null

        this.model.canal_otro.validation.valid = isCanalOtroValid
        this.model.canal_otro.validation.message = isCanalOtroValid
          ? ''
          : 'No se ha escrito una opción'
      } else {
        this.model.canal_otro.validation.valid = true
        this.model.canal_otro.validation.message = ''
      }
    },

    'model.canal_otro.vmodel' (val) {
      //
      // Validate canal otro
      const isCanalOtroValid = val !== null
      this.model.canal_otro.validation.valid = isCanalOtroValid
      this.model.canal_otro.validation.message = isCanalOtroValid
        ? ''
        : 'No se ha escrito una opción'
    }
  },

  methods: {
    validateDate (event) {
      const expression = !!event

      return this.getResponse(expression, this.model.cam_fecha.validation.message)
    },

    /**
     * Perform validations for date here,
     * maybe you want validate the limit date.
     */
    save (date) {
      this.$refs.menu.save(date)
    },

    hasErrors (errors) {
      const expression = errors.length <= 0

      return this.getResponse(expression, errors[0])
    },

    getResponse (value, message) {
      return {
        valid: value,
        message: value ? '' : message || 'El campo es requerido.'
      }
    }
  }
}
</script>
