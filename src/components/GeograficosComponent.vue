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

        <v-card class="mb-7">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title><h4>Tipo de ciudad</h4></v-card-title>
                  <v-card-text>
                    <v-checkbox label="Zonas Metropolitanas"></v-checkbox>
                    <v-checkbox label="Conurbacion"></v-checkbox>
                    <v-checkbox label="Centros Urbanos"></v-checkbox>
                    <v-checkbox label="n/a"></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card>
                  <v-card-title><h4>Clusters de Ciudades</h4></v-card-title>
                  <v-card-text>
                    <p>
                      Se calculó 104 cluster territoriales que comparten caracteristicas fisicas,
                      demograficas, economicas, consumo y vias de comunicación similares entre espacios
                      urbanos y son nombradas a razon de la ciudad principal.
                    </p>
                    <v-select
                      label="Clústers"
                      outlined
                      :items="['opción 1', 'opción 2', 'opción 3', 'opción 4', 'opción 5']"
                    ></v-select>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="mb-7">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title><h5>Division C</h5></v-card-title>
                  <v-card-text>
                    <p>
                      Grandes extensiones territoriales en las que se divide e territorio nacional
                    </p>
                    <v-checkbox label=" División I "></v-checkbox>
                    <v-checkbox label=" División II "></v-checkbox>
                    <v-checkbox label=" División III "></v-checkbox>
                    <v-checkbox label=" División IV "></v-checkbox>
                    <v-checkbox label=" División V "></v-checkbox>
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
                    <v-checkbox label=" División I "></v-checkbox>
                    <v-checkbox label=" División II "></v-checkbox>
                    <v-checkbox label=" División III "></v-checkbox>
                    <v-checkbox label=" División IV "></v-checkbox>
                    <v-checkbox label=" División V "></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title><h5>Regiones AIM</h5></v-card-title>
                  <v-card-text>
                    <p>
                      Grandes extensiones territoriales en las que se divide e territorio nacional para
                      analisis de mercado segun la Asocion de Internet de Mexico.
                    </p>
                    <v-checkbox label="Centro Norte"></v-checkbox>
                    <v-checkbox label="Centro Sur"></v-checkbox>
                    <v-checkbox label="Este"></v-checkbox>
                    <v-checkbox label="No identificado"></v-checkbox>
                    <v-checkbox label="Noreste"></v-checkbox>
                    <v-checkbox label="Noroeste"></v-checkbox>
                    <v-checkbox label="Oeste"></v-checkbox>
                    <v-checkbox label="Sureste"></v-checkbox>
                    <v-checkbox label="Suroeste"></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

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
import BaseComponent from './Helpers/BaseModelComponent'
import baseMixin from '@/mixins/baseMixin'
import { ValidationProvider } from 'vee-validate'
import Section from '@/models/Section'

const model = () => ({
  //
  // Estados
  estado: new Section('estado', 'Estados', [
    'AGUASCALIENTES',
    'BAJA CALIFORNIA',
    'BAJA CALIFORNIA SUR',
    'CAMPECHE',
    'COAHUILA DE ZARAGOZA',
    'COLIMA',
    'CHIAPAS',
    'CHIHUAHUA',
    'CIUDAD DE MEXICO',
    'DURANGO',
    'GUANAJUATO',
    'GUERRERO',
    'HIDALG',
    'JALISCO',
    'MEXICO',
    'MICHOACAN DE OCAMPO',
    'MORELOS',
    'NAYARIT',
    'NUEVO LEON',
    'OAXACA',
    'PUEBLA',
    'QUERETARO',
    'QUINTANA ROO',
    'SAN LUIS POTOSI',
    'SINALOA',
    'SONORA',
    'TABASCO',
    'TAMAULIPAS',
    'TLAXCALA',
    'VERACRUZ DE IGNACIO DE LA LLAVE',
    'YUCATAN',
    'ZACATECAS'
  ]),
  //
  // Municipio
  municipio: new Section('municipio', 'Municipio', [
    'ACAMBAY',
    'ACOLMAN',
    'ACULCO',
    'ALMOLOYA DE ALQUISIRAS',
    'ALMOLOYA DE JUAREZ',
    'ALMOLOYA DEL RIO',
    'AMANALCO',
    'AMATEPEC',
    'AMECAMECA',
    'APAXCO',
    'ATENCO',
    'ATIZAPAN',
    'ATIZAPAN DE ZARAGOZA',
    'ATLAUTLA',
    'AXAPUSCO',
    'AYAPANGO'
  ])
})

export default {
  name: 'GeograficosComponent',

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
      model: model()
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
