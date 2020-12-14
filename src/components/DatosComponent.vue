<template>
  <base-component
    ref="base"
    :model="model"
    :name="step.name"
    :pageTitle="step.pageTitle"
    :pageDescription="step.pageDescription"
  >
    <template #default="{ mutate }">
      <v-container>
        <h3>Datos a exportar</h3>

        <validate-checkbox
          custom
          validation="one"
          :model="model.datos"
          @on-change="mutate(model.datos, 'vmodel', $event)"
          @on-validate="mutate(model.datos, 'validation', $event)"
        >
          <template #default="{ results }">
            <v-row>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="model.datos.items[0].checked"
                  :value="model.datos.items[0].checked"
                  :label="model.datos.items[0].slug"
                  :error="!results.valid"
                ></v-checkbox>
                <v-checkbox
                  v-model="model.datos.items[1].checked"
                  :value="model.datos.items[1].checked"
                  :label="model.datos.items[1].slug"
                  :error="!results.valid"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="model.datos.items[2].checked"
                  :value="model.datos.items[2].checked"
                  :label="model.datos.items[2].slug"
                  :error="!results.valid"
                ></v-checkbox>
                <v-checkbox
                  v-model="model.datos.items[3].checked"
                  :value="model.datos.items[3].checked"
                  :label="model.datos.items[3].slug"
                  :error="!results.valid"
                ></v-checkbox>
                <v-checkbox
                  v-model="model.datos.items[4].checked"
                  :value="model.datos.items[4].checked"
                  :label="model.datos.items[4].slug"
                  :error="!results.valid"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="model.datos.items[5].checked"
                  :value="model.datos.items[5].checked"
                  :label="model.datos.items[5].slug"
                  :error="!results.valid"
                ></v-checkbox>
                <v-checkbox
                  v-model="model.datos.items[6].checked"
                  :value="model.datos.items[6].checked"
                  :label="model.datos.items[6].slug"
                  :error="!results.valid"
                ></v-checkbox>
              </v-col>
            </v-row>
          </template>
        </validate-checkbox>
      </v-container>
    </template>
  </base-component>
</template>

<script>
import Section from '../models/Section'
import Checkbox from '../models/Checkbox'
import ValidateCheckbox from './Helpers/ValidateCheckbox'
import BaseComponent from './Helpers/BaseModelComponent'
// Mixin
import baseMixin from '@/mixins/baseMixin'

//
// Data of showed sections
const model = () => ({
  datos: new Section('datos', 'Datos a exportar', [
    new Checkbox('ancla', 'id Client'),
    new Checkbox('ancla', 'Genero'),
    new Checkbox('ancla', 'Nombre propio'),
    new Checkbox('ancla', 'Apellido Paterno'),
    new Checkbox('ancla', 'Apellido Materno'),
    new Checkbox('ancla', 'Correo electronico'),
    new Checkbox('ancla', 'Telefono')
  ])
})

export default {
  name: 'DatosComponent',

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

  data () {
    return {
      model: model()
    }
  }
}
</script>
