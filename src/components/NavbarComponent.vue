<template>
  <v-app-bar app color="#6A76AB" prominent :src="`${require('@/assets/img/pattern1.jpg')}`" shrink-on-scroll dark>
    <template v-slot:img="{ props }">
      <!-- <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img> -->
      <v-img v-bind="props" gradient="to top right, rgba(2,0,36,.7) 0%, rgba(9,9,121,1)"></v-img>
    </template>

    <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>

    <v-toolbar-title class="quicksand">
      <h1 class="text-subtitle-1 text-sm-h5 font-weight-bold">Home</h1>
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

  methods: {
    emitToggleModal () {
      this.$emit('toggle-modal')
    }
  }
}
</script>
