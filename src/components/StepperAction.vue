<template>
  <v-card-actions class="mb-4">
    <!-- Prev step -->
    <v-btn v-if="!isFirst" @click="prevStep" color="black" dark>
      Anterior
    </v-btn>

    <!-- Next step -->
    <v-btn v-if="!isLast" @click="nextStep" color="indigo" dark class="ml-auto">
      Siguiente
    </v-btn>

    <!-- Download information -->
    <v-btn v-if="isLast" @click="onDownload" color="success" class="ml-auto">
      Descargay y enviar
    </v-btn>
  </v-card-actions>
</template>

<script>
import { EventBus } from '@/EventBus.js'

export default {
  name: 'StepperAction',

  inject: ['$isFirst', '$isLast'],

  computed: {
    isFirst () {
      return this.$isFirst()
    },

    isLast () {
      return this.$isLast()
    }
  },

  methods: {
    prevStep () {
      EventBus.$emit('on-prev-step')
    },

    nextStep () {
      EventBus.$emit('on-next-step')
    },

    onDownload () {
      EventBus.$emit('on-download')
    }
  }
}
</script>
