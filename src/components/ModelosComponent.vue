<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
    v-slot="{ isValid }"
  >
    <v-row>
      <v-container cols="12" class="d-flex justify-center">
        <validation-provider rules="required" v-slot="{ validate }">
          <v-radio-group
            v-model="model.modelos.vmodel"
            :error-messages="model.modelos.getErrorMessages()"
            @change="
              model.modelos.setValid(model.modelos.vmodel !== null)
              toggleChildsValid(model.modelos.getItems(), model.modelos.vmodel)
            "
            row
          >
            <v-radio
              v-for="item in model.modelos.getItems()"
              :key="item.id"
              :name="model.modelos.name"
              :label="item.title"
              :value="item.name"
              @change="validate"
            ></v-radio>
          </v-radio-group>
        </validation-provider>
      </v-container>
    </v-row>

    <!-- Segmentar Clientes -->
    <v-expansion-panels
      v-show="model.modelos.vmodel === 'segmentar'"
      focusable
      :accordion="isValid.value"
      :multiple="!isValid.value"
      v-model="panels"
    >
      <!-- Option 1 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="d-flex flex-row">
          <v-container>
            <h3>RFM por Categorias</h3>
            <p class="my-3">
              Consiste en clasificar a los clientes mediante tres variables indicadoras:
            </p>
            <p class="ma-0 mb-1">
              Recency (Tiempo transcurrido desde su ultima compra)
            </p>
            <p class="ma-0 mb-1">Frecuency (Numero de compras)</p>
            <p class="ma-0 mb-1">
              Money (Valor de las compras totales del cliente).Este modelo califica cada variable del 1 al 4, donde 4 es
              el valor mas alto.
            </p>
          </v-container>
        </v-expansion-panel-header>

        <v-expansion-panel-content panel>
          <p class="text-center my-4">
            Elije las variables del modelo RFM por Categorias mas adecuadas a tu campaña.
          </p>

          <v-row>
            <v-col cols="12" md="4">
              <h3>Area</h3>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].area"
                validation="none"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].area, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].area, $event.valid)"
              ></validate-checkbox>
            </v-col>

            <v-col cols="12" md="4">
              <h3>Categorias de productos</h3>

              <validation-provider v-slot="{ validate, valid }" rules="required">
                <v-select
                  outlined
                  :items="model.segmentar.getItems()[0].productos.getItems()"
                  v-model="model.segmentar.getItems()[0].productos.vmodel"
                  :error-messages="model.segmentar.getItems()[0].productos.getErrorMessages()"
                  @change="validate()"
                  @blur="model.segmentar.getItems()[0].productos.setValid(valid)"
                ></v-select>
              </validation-provider>
            </v-col>

            <v-col cols="12" md="4">
              <h3>Tipo de compra</h3>

              <validate-checkbox
                :model="model.segmentar.getItems()[0].compra"
                validation="none"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].compra, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].compra, $event.valid)"
              ></validate-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <h3>R=Recency</h3>
              <p>Tiempo transcurrido desde su ultima compra</p>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].recency"
                validation="one"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].recency, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].recency, $event.valid)"
              ></validate-checkbox>
            </v-col>

            <v-col cols="12" md="4">
              <h3>F=Frecuency</h3>
              <p>Numero de compras</p>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].frecuency"
                validation="one"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].frecuency, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].frecuency, $event.valid)"
              ></validate-checkbox>
            </v-col>

            <v-col cols="12" md="4">
              <h3>M=Money</h3>
              <p>Valor de las compras totales del cliente</p>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].money"
                validation="one"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].money, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].money, $event.valid)"
              ></validate-checkbox>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Option 2 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="d-flex flex-row">
          <v-container>
            <h3>SPC "Probabilidad de compra"</h3>
            <p class="my-3">
              Este modelo clasifica a los clientes acuerdo al número de compras y tiempo transcurrido entre compras por
              medios digitales y los divide
              <br />
              por estrategia de comunicación y probabilidad de compra.
            </p>
          </v-container>
        </v-expansion-panel-header>

        <v-expansion-panel-content panel>
          <p class="text-center my-4">
            Elije las variables del modelo SPC "Probabilidad de compra" mas adecuadas a tu campaña.
          </p>

          <v-row>
            <v-col cols="12" md="6">
              <h3>Retencion del cliente</h3>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].reteCliente"
                validation="one"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].reteCliente, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].reteCliente, $event.valid)"
              ></validate-checkbox>
            </v-col>
            <v-col cols="12" md="6">
              <h3>Recuperacion del cliente</h3>
              <validate-checkbox
                :model="model.segmentar.getItems()[0].recuCliente"
                validation="one"
                @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].recuCliente, $event)"
                @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].recuCliente, $event.valid)"
              ></validate-checkbox>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Option 3 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="d-flex flex-row">
          <v-container>
            <h3>Puntualidad "N"</h3>
            <p class="my-3">
              Utiliza diversas variables económicas, demográficas y de perfil digital que permite predecir la
              puntualidad de abono
              <br />
              para Clientes clasificación "N" antes de que sus meses de maduración permitan clasificarlos en algun tipo
              de puntualidad.
            </p>
          </v-container>
        </v-expansion-panel-header>

        <v-expansion-panel-content panel>
          <p class="text-center my-4">
            Elije las variables del modelo SPC "Probabilidad de compra" mas adecuadas a tu campaña.
          </p>

          <h3>Predicción de Puntualidad</h3>

          <validate-checkbox
            :model="model.segmentar.getItems()[0].puntualidad"
            validation="one"
            @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].puntualidad, $event)"
            @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].puntualidad, $event.valid)"
            headerClasses="text-center"
            contentClasses="pa-0 ma-0 d-flex flex-column flex-md-row"
            itemsClasses="flex-grow-1"
          ></validate-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Modelos de recomendación -->
    <v-expansion-panels v-show="model.modelos.vmodel === 'recomendar'" focusable accordion v-model="panels">
      <v-container>
        <h1 class="text-center text-h4 text-md-h4">
          Modelos de Recomendación
        </h1>
        <p class="text-center my-3">
          Elige el modelo de recomendación de productos que mas se ajuste a tus necesidades.
        </p>
      </v-container>
      <!-- Option 1 -->
      <v-expansion-panel>
        <v-expansion-panel-header class="d-flex flex-row">
          <v-container>
            <h3>Recomendar productos</h3>
            <p class="my-3">
              Esta sección estará validada pero como no hay de momento controles que se validen, no avanzará a la siguiente sección.

              Se podría generar un control en esta vista o hacer que la sección por defecto esté validada, eso desde el modelo de datos de nombre "recomendado".
            </p>
          </v-container>
        </v-expansion-panel-header>

        <v-expansion-panel-content panel>
          <v-row>
            <v-col><h3>Ejemplo</h3></v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </base-component>
</template>

<script>
//
// Base
import BaseComponent from '../components/Helpers/BaseModelComponent'
import baseMixin from '@/mixins/baseMixin'
// Validation
import { ValidationProvider } from 'vee-validate'
import ValidateCheckbox from '../components/Helpers/ValidateCheckbox'
// Models
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'

/**
 * Model
 *
 * Contains all information of controls.
 */
const model = () => ({
  //
  // Tipo de modelos
  modelos: new Section('modelos', 'Modelos de segmentación', [
    { name: 'segmentar', title: 'Segmentar Clientes' },
    { name: 'recomendar', title: 'Recomendar Productos' }
  ]),

  //
  // Segmentar clientes
  segmentar: new Section(
    'segmentar',
    'Segmentar Clientes',
    [
      {
        //
        // Area
        area: new Section('area', 'Área', [new Checkbox('area', 'Muebles'), new Checkbox('area', 'Ropa')]),

        //
        // Productos
        productos: new Section('productos', 'Productos', [
          'Zapato infantil',
          'Zapato dama',
          'Zapato caballero',
          'Transporte y movilidad'
        ]),

        //
        // Compra
        compra: new Section('compra', 'Compra', [new Checkbox('compra', 'Crédito'), new Checkbox('compra', 'Contado')]),

        //
        // Recency
        recency: new Section('recency', 'Recency', [
          new Checkbox('recency', '4'),
          new Checkbox('recency', '3'),
          new Checkbox('recency', '2'),
          new Checkbox('recency', '1')
        ]),

        //
        // Frecuency
        frecuency: new Section('frecuency', 'Frecuency', [
          new Checkbox('frecuency', '4'),
          new Checkbox('frecuency', '3'),
          new Checkbox('frecuency', '2'),
          new Checkbox('frecuency', '1')
        ]),

        //
        // Money
        money: new Section('money', 'Money', [
          new Checkbox('money', '4'),
          new Checkbox('money', '3'),
          new Checkbox('money', '2'),
          new Checkbox('money', '1')
        ]),

        //
        // Retención del cliente
        reteCliente: new Section('reteCliente', 'Retención del cliente', [
          new Checkbox('reteCliente', 'Alta probabilidad de compra'),
          new Checkbox('reteCliente', 'Baja probabilidad de compra')
        ]),

        //
        // Recuperación del cliente
        recuCliente: new Section('recuCliente', 'Recuperación del cliente', [
          new Checkbox('recuCliente', 'Alta probabilidad de compra'),
          new Checkbox('recuCliente', 'Baja probabilidad de compra')
        ]),

        //
        // Puntualidad
        puntualidad: new Section('puntualidad', 'Puntualidad', [
          new Checkbox('puntualidad', 'Cliente A'),
          new Checkbox('puntualidad', 'Cliente B'),
          new Checkbox('puntualidad', 'Cliente C'),
          new Checkbox('puntualidad', 'Cliente D'),
          new Checkbox('puntualidad', 'Cliente Z')
        ])
      }
    ],
    null,
    null,
    false,
    true
  ),

  //
  // Recomendar productos
  recomendar: new Section('recomendar', 'Recomendar Productos', [], null, null, false, true)
})

export default {
  name: 'ModelosComponent',

  mixins: [baseMixin],

  components: {
    BaseComponent,
    ValidateCheckbox,
    ValidationProvider
  },

  props: {
    step: {
      type: Object,
      required: true
    }
  },

  created () {
    this.model = model()
  },

  data () {
    return {
      //
      // All the model where contains the checkboxes
      // information that will be rendered.
      model: null,

      panels: [0],
      panelsCount: 3
    }
  },

  watch: {
    model: {
      deep: true,
      handler (newVal) {
        if (!newVal.modelos) return

        const selected = newVal.modelos.vmodel

        if (!selected) return

        const valid = this.model[selected].validation.valid

        if (valid) return

        this.model[selected].setValid(this.validateModel().value)
      }
    }
  },

  methods: {
    /**
     * validateModel
     *
     * @override Function from base mixin, overrides
     * its functionality to perform custom actions
     * in this component, based on response.
     */
    validateModel () {
      if (!this.model.modelos.vmodel) return { value: false, message: 'No se ha seleccionado ninguna opción' }

      const selected = this.model.modelos.vmodel

      return this.$_validateModelPriv(this.model[selected].getItems()[0])
    },

    toggleChildsValid (items, selected) {
      const validItems = items.filter(item => item.name !== selected)
      const invalidItem = items.find(item => item.name === selected)

      //
      // Set valid items
      validItems.forEach(el => {
        this.model[el.name].setValid(true)
      })

      //
      // Set invalid item
      this.model[invalidItem.name].setValid(false)
    },

    $_validateModelPriv (items) {
      if (!items) return { value: false, message: 'No hay items qué validar para este componente.' }

      let retval = { value: true, message: '' }

      const localItems = items

      console.group(`=== 🐕‍🦺 Inner section '${this.model.modelos.vmodel}' 🐱‍👤 ===`)
      for (const [key, value] of Object.entries(localItems)) {
        console.log(key, ' | valid :>> ', value.validation.valid)
        console.groupEnd()

        if (!value.validation.valid) {
          retval = {
            value: false,
            message: `Debes completar todos los campos de '${this.model[this.model.modelos.vmodel].getTitle()}'`
          }
          break
        }
      }
      //
      // Only log purposes
      if (retval.value) console.log('🎉🎉🎉 Inner valid! 🎉🎉🎉')

      return retval
    }
  }
}
</script>
