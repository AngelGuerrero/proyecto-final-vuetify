<template>
  <base-component
    ref="base"
    :propSections="sections"
    :name="stepInformation.name"
    :pageTitle="stepInformation.pageTitle"
    :pageDescription="stepInformation.pageDescription"
  >
    <template #default="{ isValid, mutateModel }">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <validation-provider rules="required" v-slot="{ validate }">
            <v-radio-group
              :error-messages="
                sections.modelos.selectedOption ? [] : sections.modelos.validation.message
              "
              v-model="sections.modelos.selectedOption"
              @change="
                sections.modelos.validation.valid =
                  sections.modelos.selectedOption !== null
              "
              row
            >
              <v-radio
                v-for="item in sections.modelos.options"
                :key="item.id"
                :name="sections.modelos.name"
                :label="`${item}`"
                :value="item"
                @change="validate"
              ></v-radio>
            </v-radio-group>
          </validation-provider>
        </v-col>
      </v-row>

      <v-expansion-panels
        v-show="sections.modelos.selectedOption === 'Segmentar Clientes'"
        focusable
        :accordion="isValid.value"
        :multiple="!isValid.value"
        v-model="panels"
      >
        <v-container>
          <h1 class="text-center text-h4 text-md-h4">
            Modelos de segmentación
          </h1>
          <p class="text-center my-3">
            Elige el modelo de segmentación de clientes que mas se ajuste a tus
            necesidades.
          </p>
        </v-container>

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
                Money (Valor de las compras totales del cliente).Este modelo califica cada
                variable del 1 al 4, donde 4 es el valor mas alto.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo RFM por Categorias mas adecuadas a tu
              campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="4">
                  <h3>Area</h3>

                  <validate-checkbox
                    :model="sections.area"
                    validation="one"
                    :successStatus="true"
                    @on-validate="mutateModel('area', 'validation', $event)"
                    @on-change="mutateModel('area', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Categorias de productos</h3>

                  <validation-provider v-slot="{ validate, valid }" rules="required">
                    <v-select
                      outlined
                      :items="sections.productos.getItems()"
                      v-model="sections.productos.vmodel"
                      :error-messages="sections.productos.getErrorMessages()"
                      @change="validate()"
                      @blur="sections.productos.setValid(valid)"
                    ></v-select>
                  </validation-provider>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Tipo de compra</h3>

                  <validate-checkbox
                    :model="sections.compra"
                    validation="one"
                    @on-validate="mutateModel('compra', 'validation', $event)"
                    @on-change="mutateModel('compra', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <h3>R=Recency</h3>
                  <p>Tiempo transcurrido desde su ultima compra</p>
                  <validate-checkbox
                    :model="sections.recency"
                    validation="one"
                    @on-validate="mutateModel('recency', 'validation', $event)"
                    @on-change="mutateModel('recency', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>F=Frecuency</h3>
                  <p>Numero de compras</p>
                  <validate-checkbox
                    :model="sections.frecuency"
                    validation="one"
                    @on-validate="mutateModel('frecuency', 'validation', $event)"
                    @on-change="mutateModel('frecuency', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>M=Money</h3>
                  <p>Valor de las compras totales del cliente</p>
                  <validate-checkbox
                    :model="sections.money"
                    validation="one"
                    @on-validate="mutateModel('money', 'validation', $event)"
                    @on-change="mutateModel('money', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Option 2 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h3>SPC "Probabilidad de compra"</h3>
              <p class="my-3">
                Este modelo clasifica a los clientes acuerdo al número de compras y tiempo
                transcurrido entre compras por medios digitales y los divide
                <br />
                por estrategia de comunicación y probabilidad de compra.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas adecuadas a
              tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <h3>Retencion del cliente</h3>
                  <validate-checkbox
                    :model="sections.reteCliente"
                    validation="one"
                    @on-validate="mutateModel('reteCliente', 'validation', $event)"
                    @on-change="mutateModel('reteCliente', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>
                <v-col cols="12" md="6">
                  <h3>Recuperacion del cliente</h3>
                  <validate-checkbox
                    :model="sections.recuCliente"
                    validation="one"
                    @on-validate="mutateModel('recuCliente', 'validation', $event)"
                    @on-change="mutateModel('recuCliente', 'vmodel', $event)"
                  ></validate-checkbox>
                </v-col>
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Option 3 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h3>Puntualidad "N"</h3>
              <p class="my-3">
                Utiliza diversas variables económicas, demográficas y de perfil digital
                que permite predecir la puntualidad de abono
                <br />
                para Clientes clasificación "N" antes de que sus meses de maduración
                permitan clasificarlos en algun tipo de puntualidad.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas adecuadas a
              tu campaña.
            </p>

            <form>
              <h3>Predicción de Puntualidad</h3>

              <validate-checkbox
                :model="sections.puntualidad"
                validation="one"
                @on-validate="mutateModel('puntualidad', 'validation', $event)"
                @on-change="mutateModel('puntualidad', 'vmodel', $event)"
                headerClasses="text-center"
                contentClasses="pa-0 ma-0 d-flex flex-column flex-md-row"
                itemsClasses="flex-grow-1"
              ></validate-checkbox>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Modelos de recomendación -->
      <v-expansion-panels
        v-show="sections.modelos.selectedOption === 'Recomendar Productos'"
        focusable
        accordion
        v-model="panels"
      >
        <v-container>
          <h1 class="text-center text-h4 text-md-h4">
            Modelos de Recomendación
          </h1>
          <p class="text-center my-3">
            Elige el modelo de recomendación de productos que mas se ajuste a tus
            necesidades.
          </p>
        </v-container>
        <!-- Option 1 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h3>Recomendar productos</h3>
              <p class="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, laboriosam!
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
    </template>
  </base-component>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import ValidateCheckbox from '../components/Helpers/ValidateCheckbox'
import BaseComponent from '../components/Helpers/BaseModelComponent'
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'

/**
 * Data
 */
//
// Sections
//
// Contains all information data that will be rendered.
//
const sections = () => ({
  //
  // Tipo de modelos
  modelos: {
    name: 'modelos',
    validation: {
      valid: false,
      message: 'Debes seleccionar un tipo de modelo'
    },
    options: ['Segmentar Clientes', 'Recomendar Productos'],
    // FIX: REGRESAR A NULL
    selectedOption: null
    // selectedOption: 'Segmentar Clientes'
  },

  //
  // Area
  area: new Section(
    'area',
    'Área',
    [new Checkbox('area', 'Muebles'), new Checkbox('area', 'Ropa')],
    // NOTA:
    // Mensaje personnalizado para este componente
    'Selecciona al menos un área'
  ),

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
  compra: new Section('compra', 'Compra', [
    new Checkbox('compra', 'Crédito'),
    new Checkbox('compra', 'Contado')
  ]),

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
})

export default {
  name: 'ModelosComponent',

  components: {
    BaseComponent,
    ValidationProvider,
    ValidateCheckbox
  },

  props: {
    stepInformation: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      panels: [],
      panelsCount: 3,

      //
      // All the sections where contains the checkboxes
      // information that will be rendered.
      sections: sections()
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
        if (!response.value) this.openAllPanels()

        retval = response
      })

      return retval
    },

    // ===========================================
    // Region: Custom actions for this component
    // ===========================================
    // Create an array the length of our panels
    // with all values as true
    openAllPanels () {
      this.panels = [...Array(this.panelsCount).keys()].map((k, i) => i)
    }
  }
}
</script>
