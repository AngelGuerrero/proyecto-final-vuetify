export default {
  methods: {
    mutate (model, property, data) {
      this.model[model.name][property] = data
    },

    validateModel () {
      console.group("🚧 Method called from 'base mixin' 🚧")
      let retval

      //
      // Executes an action based in the response
      this.$refs.base.validateModel(response => {
        retval = response
      })

      console.groupEnd()

      return retval
    },

    openAllPanels (totalPanels) {
      console.log('opening panels')
      const panels = [...Array(totalPanels).keys()].map((k, i) => i)
      return panels
    }
  }
}
