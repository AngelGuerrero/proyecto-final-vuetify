<template>
  <v-app id="app">
    <navbar-component @on-toggle-drawer="drawer = !drawer"></navbar-component>
    <drawer-component v-model="drawer"></drawer-component>

    <v-main class="blue-grey lighten-4 pb-4">
      <router-view />
    </v-main>

    <v-footer class="blue-grey lighten-4 d-flex justify-center text--secondary">
      <p class="font-weight-bold">© 2020 | UAEM</p>
    </v-footer>
  </v-app>
</template>

<script>
import DrawerComponent from '@/components/DrawerComponent'
import NavbarComponent from '@/components/NavbarComponent'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    DrawerComponent
  },

  data () {
    return {
      drawer: false
    }
  }
}
</script>
