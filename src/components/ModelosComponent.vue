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
      <v-container cols="12" class="justify-center d-flex">
        <validation-provider rules="required" v-slot="{ validate }">
          <v-radio-group
            v-model="model.modelos.vmodel"
            :error-messages="model.modelos.getErrorMessages()"
            @change="
              model.modelos.setValid(model.modelos.vmodel !== null)
              toggleChildsValid(model.modelos.getItems(), model.modelos.vmodel)
            "
            :row="$vuetify.breakpoint.width > 680"
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

    <!-- SEGMENTAR CLIENTES -->
    <v-expansion-panels v-show="model.modelos.vmodel === 'segmentar'" v-model="panels" :multiple="!isValid.value">
      <!-- RFM POR cATEGORÍAS -->
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12" md="4" class="justify-center pr-4 md-justify-end d-flex align-center">
              <h3 class="mb-5 mb-md-0">RFM por Categorías</h3>
            </v-col>
            <v-col cols="12" md="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">
                  <p class="my-4 text-center ma-0">
                    Elije las variables del modelo RFM más adecuadas a tu campaña.
                  </p>
                </span>
                <v-row v-else no-gutters style="width: 100%">
                  <v-col class="px-3 text-justify">
                    <ul>
                      <li class="pb-2">Consiste en clasificar a los clientes mediante tres variables indicadoras:</li>
                      <li class="pb-2">
                        Recency (Tiempo transcurrido desde su última compra)
                      </li>
                      <li class="pb-2">Frecuency (Numero de compras)</li>
                      <li class="pb-2">
                        Money (Valor de las compras totales del cliente).Este modelo califica cada variable del 1 al 4,
                        donde 4 es el valor más alto.
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content panel>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <h4>Area</h4>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].area"
                  validation="none"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].area, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].area, $event.valid)"
                ></validate-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <h4>Categorías de productos</h4>
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
                <h4>Tipo de compra</h4>
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
                <h4>R=Recency</h4>
                <p>Tiempo transcurrido desde su última compra</p>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].recency"
                  validation="one"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].recency, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].recency, $event.valid)"
                ></validate-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <h4>F=Frecuency</h4>
                <p>Numero de compras</p>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].frecuency"
                  validation="one"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].frecuency, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].frecuency, $event.valid)"
                ></validate-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <h4>M=Money</h4>
                <p>Valor de las compras totales del cliente</p>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].money"
                  validation="one"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].money, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].money, $event.valid)"
                ></validate-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- END OF RFM POR CATEGORÍAS -->

      <!-- SCP PROBABILIDAD DE COMPRA -->
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12" md="4" class="justify-center pr-4 md-justify-end d-flex align-center">
              <h3 class="mb-5 mb-md-0">SCP Probabilidad de compra</h3>
            </v-col>
            <v-col cols="12" md="8" class="text-justify text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">
                  <p class="my-4 text-center ma-0">
                    Elije las variables del modelo SPC "Probabilidad de compra" más adecuadas a tu campaña.
                  </p>
                </span>
                <v-row v-else no-gutters style="width: 100%">
                  <v-col class="px-4">
                    <p class="ma-0">
                      Este modelo clasifica a los clientes acuerdo al número de compras y tiempo transcurrido entre
                      compras por medios digitales y los divide por estrategia de comunicación y probabilidad de compra.
                    </p>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content panel>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <h4>Retencion del cliente</h4>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].reteCliente"
                  validation="one"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].reteCliente, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].reteCliente, $event.valid)"
                ></validate-checkbox>
              </v-col>
              <v-col cols="12" md="6">
                <h4>Recuperacion del cliente</h4>
                <validate-checkbox
                  :model="model.segmentar.getItems()[0].recuCliente"
                  validation="one"
                  @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].recuCliente, $event)"
                  @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].recuCliente, $event.valid)"
                ></validate-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- END OF SCP PROBABILIDAD DE COMPRA -->

      <!-- PUNTUALIDAD N -->
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12" md="4" class="justify-center pr-4 md-justify-end d-flex align-center">
              <h3 class="mb-5 mb-md-0">Puntualidad "N"</h3>
            </v-col>
            <v-col cols="12" md="8" class="text-justify text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">
                  <p class="text-center ma-0">Predicción de Puntualidad</p>
                </span>
                <v-row v-else no-gutters style="width: 100%">
                  <v-col class="px-4">
                    <p class="ma-0">
                      Utiliza diversas variables económicas, demográficas y de perfil digital que permite predecir la
                      puntualidad de abono, para clientes clasificación "N", antes de que sus meses de maduración
                      permitan clasificarlos en algún tipo de puntualidad.
                    </p>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content panel>
          <validate-checkbox
            :model="model.segmentar.getItems()[0].puntualidad"
            validation="none"
            @on-change="model.segmentar.setChildVmodel(model.segmentar.getItems()[0].puntualidad, $event)"
            @on-validate="model.segmentar.setChildValid(model.segmentar.getItems()[0].puntualidad, $event.valid)"
            headerClasses="text-center"
            contentClasses="pa-0 ma-0 d-flex flex-column flex-md-row"
            itemsClasses="flex-grow-1"
          ></validate-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- END OF PUNTUALIDAD N -->
    </v-expansion-panels>
    <!-- END OF SEGMENTAR CLIENTES -->

    <!-- MODELOS DE RECOMENDACIÓN -->
    <v-expansion-panels v-show="model.modelos.vmodel === 'recomendar'" focusable accordion v-model="panels">
      <v-container>
        <h1 class="text-center text-h4 text-md-h4">
          Modelos de Recomendación
        </h1>
        <p class="my-3 text-center">
          Elige el modelo de recomendación de productos que más se ajuste a tus necesidades.
        </p>
      </v-container>
      <v-expansion-panel>
        <v-expansion-panel-header class="flex-row d-flex">
          <v-container>
            <h3>Recomendar productos</h3>
            <p class="my-3">
              Esta sección estará validada pero como no hay de momento controles que se validen, no avanzará a la
              siguiente sección. Se podría generar un control en esta vista o hacer que la sección por defecto esté
              validada, eso desde el modelo de datos de nombre "recomendado".
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
    <!-- END OF MODELOS DE RECOMENDACIÓN -->
  </base-component>
</template>

<script>
import baseMixin from '@/mixins/baseMixin'
import { MODELOS as model } from '@/api/data'
import { ValidationProvider } from 'vee-validate'
import ValidateCheckbox from '../components/Helpers/ValidateCheckbox'

export default {
  name: 'ModelosComponent',

  mixins: [baseMixin],

  components: {
    ValidateCheckbox,
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
      //
      // All the model where contains the checkboxes
      // information that will be rendered.
      model,
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

      const items = this.model[selected].getItems()[0]

      if (!items) return { value: false, message: 'No hay items que validar' }

      const getval = this.$refs.base.validateItems(items)

      if (!getval.value) {
        this.panels = this.openAllPanels(this.panelsCount)
      }

      return getval
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
    }
  }
}
</script>
