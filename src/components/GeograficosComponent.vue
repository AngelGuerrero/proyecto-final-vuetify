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
        <v-row>
          <!-- Estados -->
          <v-col cols="12" md="6">
            <validation-provider v-slot="{ validate, valid }" rules="required">
              <v-select
                :items="model.estado.getItems()"
                v-model="model.estado.vmodel"
                outlined
                :label="model.estado.title"
                :error-messages="model.estado.getErrorMessages()"
                @change="validate()"
                @blur="model.estado.setValid(valid)"
              ></v-select>
            </validation-provider>
          </v-col>
          <!-- Municipios -->
          <v-col cols="12" md="6">
            <validation-provider v-slot="{ validate, valid }" rules="required">
              <v-select
                :items="model.municipio.getItems()"
                v-model="model.municipio.vmodel"
                outlined
                :label="model.municipio.title"
                :error-messages="model.municipio.getErrorMessages()"
                @change="validate()"
                @blur="model.municipio.setValid(valid)"
              ></v-select>
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title><h4>Tipo de ciudad</h4></v-card-title>
              <v-card-text>
                <validate-checkbox
                  :model="model.ciudad"
                  validation="one"
                  @on-change="mutate(model.ciudad, 'vmodel', $event)"
                  @on-validate="mutate(model.ciudad, 'validation', $event)"
                ></validate-checkbox>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- Clústers de ciudades -->
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title><h4>Clusters de Ciudades</h4></v-card-title>
              <v-card-text>
                <p>
                  Se calculó 104 cluster territoriales que comparten caracteristicas fisicas, demograficas, economicas,
                  consumo y vias de comunicación similares entre espacios urbanos y son nombradas a razon de la ciudad
                  principal.
                </p>
                <validation-provider v-slot="{ validate, valid }" rules="required">
                  <v-select
                    :items="model.cluster.getItems()"
                    v-model="model.cluster.vmodel"
                    outlined
                    :label="model.cluster.title"
                    :error-messages="model.cluster.getErrorMessages()"
                    @change="validate()"
                    @blur="model.cluster.setValid(valid)"
                  ></v-select>
                </validation-provider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <!-- División C -->
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title><h5>Division C</h5></v-card-title>
              <v-card-text>
                <p>
                  Grandes extensiones territoriales en las que se divide e territorio nacional
                </p>
                <validate-checkbox
                  :model="model.div_c"
                  validation="one"
                  @on-change="mutate(model.div_c, 'vmodel', $event)"
                  @on-validate="mutate(model.div_c, 'validation', $event)"
                ></validate-checkbox>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title><h5>Regiones Nielsen / AMVO</h5></v-card-title>
              <v-card-text>
                <p>
                  Grandes extensiones territoriales en las que se divide e territorio nacional
                </p>
                <validate-checkbox
                  :model="model.nielsen"
                  validation="one"
                  @on-change="mutate(model.nielsen, 'vmodel', $event)"
                  @on-validate="mutate(model.nielsen, 'validation', $event)"
                ></validate-checkbox>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title><h5>Regiones AIM</h5></v-card-title>
              <v-card-text>
                <p>
                  Grandes extensiones territoriales en las que se divide e territorio nacional para análisis de mercado
                  según la Asociación de Internet de México.
                </p>
                <validate-checkbox
                  :model="model.aim"
                  validation="one"
                  @on-change="mutate(model.aim, 'vmodel', $event)"
                  @on-validate="mutate(model.aim, 'validation', $event)"
                ></validate-checkbox>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!--Google map-->
        <v-card class="elevation-0">
          <v-responsive :aspect-ratio="16 / 9">
            <v-card-text class="myIframe">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5287197.88756685!2d-101.89025342665099!3d23.78338017554413!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1603843493857!5m2!1ses!2smx"
                allowfullscreen
              ></iframe>
            </v-card-text>
          </v-responsive>
        </v-card>
        <!--Google Maps-->
      </v-card-text>
    </template>
  </base-component>
</template>

<script>
import baseMixin from '@/mixins/baseMixin'
import { GEOGRAFICOS as model } from '@/api/data'
import { ValidationProvider } from 'vee-validate'
import ValidateCheckbox from './Helpers/ValidateCheckbox'

export default {
  name: 'GeograficosComponent',

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
      model
    }
  }
}
</script>

<style scoped>
.myIframe {
  position: relative;
  padding-bottom: 65.25%;
  padding-top: 30px;
  height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.myIframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
