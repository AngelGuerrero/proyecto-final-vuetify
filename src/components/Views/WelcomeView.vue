<template>
  <v-container class="white rounded elevation-3 pb-5">
    <v-responsive min-height="60vh">
      <v-carousel cycle hide-delimiter-background hide-delimiters :show-arrows="false" height="100%" light>
        <v-carousel-item v-for="slide in sliders" :key="slide.id">
          <v-row class="fill-height pa-5">
            <v-col cols="12" align="center" justify="center">
              <img
                class="myimage"
                :src="`${require('@/assets/img/illustration-' + slide.image + '.svg')}`"
                :alt="'Ilustración ' + slide.image"
              />
            </v-col>

            <v-col cols="12" align="center" justify="center">
              <h1 class="text-center text-h5 text-sm-display-6">{{ slide.title }}</h1>
              <p class="text-center">{{ slide.text }}</p>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-responsive>

    <v-row>
      <v-col align="center"><v-btn color="primary" rounded>Comenzar</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomeView',

  data () {
    return {
      sliders: [
        {
          title: 'Información actualizada',
          text: 'Nuestro equipo trabaja para mejorar constantemente la aplicación.',
          image: '1'
        },
        {
          title: 'Obtén estadísticas',
          text: 'Mira las estadísticas de los datos que se han ingresado al momento.',
          image: '2'
        },
        {
          title: 'Realiza tu encuesta desde cualquier lugar',
          text: 'Gracias a nuestra interfaz, puedes ingresar y obtener los datos desde cualquier dispositivo.',
          image: '5'
        },
        {
          title: 'Organiza tu información personal',
          text: 'Ingresa a tu perfil y mira los datos que has ingresado y actualizalos al momento.',
          image: '4'
        }
      ]
    }
  }
}
</script>

<style scoped>
.myimage {
  max-width: 500px;
  width: 100%;
}
</style>
