export default {
  methods: {
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
    }
  }
}
