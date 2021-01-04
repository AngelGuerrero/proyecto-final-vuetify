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

    <!-- Show notification -->
    <v-snackbar
      v-model="notification.show"
      :timeout="notification.timeout"
      top
      right
      :color="notification.error ? 'error' : 'success'"
      elevation="24"
      class="white--text"
    >
      <h3>{{ notification.message }}</h3>
    </v-snackbar>
  </v-app>
</template>

<script>
import DrawerComponent from '@/components/DrawerComponent'
import NavbarComponent from '@/components/NavbarComponent'
import { EventBus } from '@/EventBus.js'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    DrawerComponent
  },

  created () {
    EventBus.$on('on-set-notification', (data) => {
      this.setNotification(data)
    })
  },

  data () {
    return {
      drawer: false,

      notification: {
        show: true,
        timeout: 7000,
        error: false,
        message: ''
      }
    }
  },

  methods: {
    setNotification (message, error = false) {
      this.notification.show = true
      this.notification.error = error || false
      this.notification.message = message
    }
  }
}
</script>
