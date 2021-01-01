<template>
  <v-app-bar
    :src="`${require('@/assets/img/pattern1.jpg')}`"
    color="indigo darken-4"
    app
    prominent
    shrink-on-scroll
    dark
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(2,0,36,.9) 0%, rgba(9,9,121,.9)"></v-img>
      <!-- <v-img v-bind="props" gradient="to top right, rgba(26, 34, 126, .9) 0%, rgba(9,9,121,.9)"></v-img> -->
    </template>

    <v-app-bar-nav-icon class="white--text" @click="emitToggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="quicksand">
      <h1 class="text-subtitle-1 text-sm-h5 font-weight-bold">{{ title }}</h1>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent',

  props: {
    title: {
      type: String,
      default: '¡Bienvenido!'
    }
  },

  methods: {
    emitToggleModal () {
      this.$emit('toggle-modal')
    },

    emitToggleDrawer () {
      this.$emit('on-toggle-drawer')
    }
  }
}
</script>
