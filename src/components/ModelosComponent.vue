<template>
  <div>
    <v-container>
      <v-alert v-if="alert.show" type="error" elevation="1">
        <div class="d-flex justify-center">
          {{ isValid.message }}
        </div>
      </v-alert>
    </v-container>

    <v-card-title class="justify-center">
      <h2 class="text-h6 text-md-h5">¿Qué tipo de modelo quieres utilizar?</h2>
    </v-card-title>

    <v-card-text>
      <!-- <v-container>
        <h3>Modelos</h3>
        <pre>
          {{ $data.sections.modelos }}
        </pre>
      </v-container> -->
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <validation-provider rules="required" v-slot="{ validate }">
            <v-radio-group
              :error-messages="
                sections.modelos.selectedOption
                  ? []
                  : sections.modelos.validation.message
              "
              v-model="sections.modelos.selectedOption"
              @change="sections.modelos.validation.valid = sections.modelos.selectedOption !== null"
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

          <!-- <v-radio-group
            v-model="sections.modelos.selectedOption"
            :name="sections.modelos.name"
            :error-messages="getSelectedModelErrorMessages"
            row
          >
            <v-radio
              v-for="item in sections.modelos.options"
              :key="item.id"
              :label="`${item}`"
              :name="sections.modelos.name"
              :value="item"
              :error-messages="['error']"
            ></v-radio>
          </v-radio-group> -->
        </v-col>
      </v-row>

      <v-expansion-panels
        v-show="sections.modelos.selectedOption === 'Segmentar Clientes'"
        focusable
        accordion
        multiple
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

        <!-- <validation-observer ref="observerModelosSegmentarClientes" tag="div"> -->
        <!-- Option 1 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h3>RFM por Categorias</h3>
              <p class="my-3">
                Consiste en clasificar a los clientes mediante tres variables
                indicadoras:
              </p>
              <p class="ma-0 mb-1">
                Recency (Tiempo transcurrido desde su ultima compra)
              </p>
              <p class="ma-0 mb-1">Frecuency (Numero de compras)</p>
              <p class="ma-0 mb-1">
                Money (Valor de las compras totales del cliente).Este modelo
                califica cada variable del 1 al 4, donde 4 es el valor mas alto.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo RFM por Categorias mas adecuadas a
              tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="4">
                  <!-- <ValidationProvider
                    rules="required"
                    ref="area"
                    v-slot="{ errors }"
                  >
                    <v-checkbox
                      slot-scope="{ errors, valid }"
                      v-model="payload.checkbox"
                      :error-messages="errors"
                      :success="valid"
                      value="0"
                      label="Ropa"
                      type="checkbox"
                      required
                    ></v-checkbox>
                  </ValidationProvider> -->

                  <h3>Area</h3>

                  <validate-checkbox
                    :items="sections.area.options"
                    :name="sections.area.name"
                    :title="sections.area.title"
                    validation="one"
                    @on-validate="sections.area.validation = $event"
                    @on-change="sections.area.selectedOption = $event"
                  ></validate-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Categorias de productos</h3>

                  <validation-provider
                    v-slot="{ validate, valid }"
                    rules="required"
                  >
                    <v-select
                      outlined
                      :items="sections.productos.options"
                      v-model="sections.productos.selectedOption"
                      :error-messages="
                        valid ? [] : [sections.productos.validation.message]
                      "
                      @change="validate()"
                      @blur="sections.productos.validation.valid = valid"
                    ></v-select>
                  </validation-provider>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>Tipo de compra</h3>

                  <v-checkbox label="Crédito" type="checkbox"></v-checkbox>
                  <v-checkbox label="Contado" type="checkbox"></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <h3>R=Recency</h3>

                  <p>Tiempo transcurrido desde su ultima compra</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>F=Frecuency</h3>
                  <p>Numero de compras</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <h3>M=Money</h3>
                  <p>Valor de las compras totales del cliente</p>

                  <v-checkbox label="4" type="checkbox"></v-checkbox>
                  <v-checkbox label="3" type="checkbox"></v-checkbox>
                  <v-checkbox label="2" type="checkbox"></v-checkbox>
                  <v-checkbox label="1" type="checkbox"></v-checkbox>
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
                Este modelo clasifica a los clientes acuerdo al número de
                compras y tiempo transcurrido entre compras por medios digitales
                y los divide
                <br />
                por estrategia de comunicación y probabilidad de compra.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas
              adecuadas a tu campaña.
            </p>

            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <h3>Retencion del cliente</h3>
                  <v-checkbox label="Alta probabilidad de compra"></v-checkbox>
                  <v-checkbox label="Baja probabilidad de compra"></v-checkbox>
                </v-col>
                <v-col cols="12" md="6">
                  <h3>Recuperacion del cliente</h3>
                  <v-checkbox label="Alta probabilidad de compra"></v-checkbox>
                  <v-checkbox label="Baja probabilidad de compra"></v-checkbox>
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
                Utiliza diversas variables económicas, demográficas y de perfil
                digital que permite predecir la puntualidad de abono
                <br />
                para Clientes clasificación "N" antes de que sus meses de
                maduración permitan clasificarlos en algun tipo de puntualidad.
              </p>
            </v-container>
          </v-expansion-panel-header>

          <v-expansion-panel-content panel>
            <p class="text-center my-4">
              Elije las variables del modelo SPC "Probabilidad de compra" mas
              adecuadas a tu campaña.
            </p>

            <form>
              <h3>Predicción de Puntualidad</h3>

              <v-container class="d-flex flex-column flex-md-row">
                <v-checkbox class="flex-grow-1" label="Cliente A"></v-checkbox>
                <v-checkbox class="flex-grow-1" label="Cliente B"></v-checkbox>
                <v-checkbox class="flex-grow-1" label="Cliente C"></v-checkbox>
                <v-checkbox class="flex-grow-1" label="Cliente D"></v-checkbox>
                <v-checkbox class="flex-grow-1" label="Cliente Z"></v-checkbox>
              </v-container>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- </validation-observer> -->
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
            Elige el modelo de recomendación de productos que mas se ajuste a
            tus necesidades.
          </p>
        </v-container>
        <!-- Option 1 -->
        <v-expansion-panel>
          <v-expansion-panel-header class="d-flex flex-row">
            <v-container>
              <h3>Recomendar productos</h3>
              <p class="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                laboriosam!
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
    </v-card-text>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import ValidateCheckbox from '../components/Helpers/ValidateCheckbox'

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
    type: 'radio',
    name: 'modelos',
    validation: {
      valid: false,
      message: 'Debes seleccionar un tipo de modelo'
    },
    options: ['Segmentar Clientes', 'Recomendar Productos'],
    selectedOption: null
  },

  //
  // Area Checkboxes
  area: {
    type: 'checkbox',
    name: 'area',
    title: 'Área',
    validation: {
      valid: false,
      message: ''
    },
    options: [
      { group: 'area', slug: 'Muebles', checked: false },
      { group: 'area', slug: 'Ropa', checked: false }
    ],
    selectedOption: null
  },

  productos: {
    type: 'select',
    name: 'productos',
    title: 'Productos',
    validation: {
      valid: false,
      message: 'Se debe de seleccionar un producto'
    },
    options: [
      'Zapato infantil',
      'Zapato dama',
      'Zapato caballero',
      'Transporte y movilidad'
    ],
    selectedOption: null
  }

  //
  // Area compra
  // compra: {
  //   type: 'checkbox',
  //   name: 'compra',
  //   validation: {
  //   valid: false,
  //     message: ''
  //   }
  // }
})

export default {
  name: 'ModelosComponent',

  components: {
    // ValidationObserver,
    ValidationProvider,
    ValidateCheckbox
  },

  props: {
    //
    // Name of the component is required
    // for debug purposes.
    name: {
      type: String,
      required: true
    },

    //
    // Title of the component.
    // Is the name that will see the user.
    title: {
      type: String,
      required: true
    }
  },

  mounted () {
    // FIX: REMOVE NEXT LINE
    this.collectSelectedData()
  },

  data () {
    return {
      //
      // Variables for change props
      alert: {
        show: false,
        message: null
      },
      // ===========================

      panels: [0],

      //
      // All the sections where contains the checkboxes
      // information that will be rendered.
      sections: sections()
    }
  },

  watch: {
    // 'sections.modelos.selectedOption' (newValue) {
    //   this.sections.modelos.validation.valid = newValue !== null
    // }
  },

  computed: {
    //
    // Return error messages if there is not a selected model
    getSelectedModelErrorMessages () {
      let retval = []

      retval = this.sections.modelos.validation.valid
        ? []
        : [this.sections.modelos.validation.message]

      return retval
    },

    isModelValid () {
      return this.isValid.valid
    },

    //
    // isValid
    //
    // Computed property for let it know to parent
    // if the component is valid or not
    isValid () {
      let retval = { value: true, message: '', data: this.sections }

      console.log('')
      console.log('=== Validando secciones del modelo ===')

      for (const [key, value] of Object.entries(this.sections)) {
        console.log('key :>> ', key)
        console.log('value.validation.valid :>> ', value.validation.valid)

        if (!value.validation.valid) {
          retval = {
            value: false,
            message: `Debes completar todos los campos de '${this.title}'`,
            data: null
          }
          break
        }
      }

      console.log('=== Fin de las validaciones ===')
      console.log('')

      this.setMessage(!retval.value, retval.message)

      return retval
    }
  },

  methods: {
    //
    // Return selected data if there is no errors
    validateModel () {
      console.log(`Validating model '${this.title}'`)
      return this.isValid
    },

    collectSelectedData () {
      console.log('')
      console.log('===== Select data for return ===== ')

      const retval = Object.entries(this.sections).map(item => {
        return {
          [item[0]]: {
            selectedOption: this.sections[item[0]].selectedOption
          }
        }
      })

      console.log('===== End Select data for return ===== ')
      console.log('')

      // console.log(retval)

      return retval
    },

    setMessage (show, message) {
      this.alert.show = show
      this.alert.message = show ? message : ''
    }
  }
}
</script>
