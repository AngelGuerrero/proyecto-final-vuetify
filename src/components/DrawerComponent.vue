<template>
  <v-navigation-drawer app v-model="drawer" temporary dark :bottom="$vuetify.breakpoint.smAndDown" @input="update">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          App Survey
        </v-list-item-title>
        <v-list-item-subtitle>Modelos de segmentación</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerComponent',

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  model: {
    prop: 'value',
    event: 'update'
  },

  data () {
    return {
      drawer: this.value,
      items: [
        { title: 'Panel principal', icon: 'mdi-view-dashboard' },
        { title: 'Cuenta', icon: 'mdi-account' },
        { title: 'Información', icon: 'mdi-help-box' },
        { title: 'Cerrar sesión', icon: 'mdi-close' }
      ]
    }
  },

  watch: {
    value (newValue) {
      this.drawer = newValue
    }
  },

  methods: {
    update () {
      this.$emit('update', this.drawer)
    }
  }
}
</script>
