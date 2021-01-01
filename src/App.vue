<template>
  <v-app id="vuetify-app">
    <instructions :dialog="showInstructions" @on-close="showInstructions = !showInstructions"></instructions>

    <div id="wrapper">
      <nav id="my_nav">
        <navbar-component @toggle-modal="showInstructions = !showInstructions" />
      </nav>

      <div id="content" class="grey lighten-2 mt-5">
        <v-main class="pb-5 px-4 mx-md-13">
            <survey-view></survey-view>
            <!-- <welcome-view></welcome-view> -->
        </v-main>
      </div>

      <div id="my_footer" class="grey lighten-2 d-flex justify-center align-center">
        <p> © 2020 | UAEM </p>
      </div>
    </div>

  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import NavbarComponent from '@/components/NavbarComponent'
import Instructions from '@/components/Instructions'
import SurveyView from '@/components/Views/SurveyView'
import WelcomeView from '@/components/Views/WelcomeView'

export default {
  name: 'App',

  components: {
    NavbarComponent,
    Instructions,
    SurveyView,
    WelcomeView
  },

  data () {
    return {
      showInstructions: false
    }
  }
}
</script>
