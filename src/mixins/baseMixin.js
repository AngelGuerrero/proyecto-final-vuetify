var $ = require('jquery')

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
    },

    renderSlider (slider) {
      // Proxy
      const that = this
      const getSliderId = data => data.input[0].id
      //
      // Start
      const onStart = data => {
        const id = getSliderId(data)
        console.log(data)
        that.mutate(that.model[id], 'vmodel', this.selectDataFromSlider(data))
      }
      //
      // onChange
      const onChange = data => {
        const id = getSliderId(data)
        that.mutate(that.model[id], 'vmodel', this.selectDataFromSlider(data))
      }
      //
      // onFinish
      const onFinish = data => {}
      //
      // onUpdate
      const onUpdate = data => {}

      //
      // Slider options and listen events.
      $(`#${slider.id}`).ionRangeSlider({
        keyboard: true,
        onStart: data => onStart(data),
        onChange: data => onChange(data),
        onFinish: data => onFinish(data),
        onUpdate: data => onUpdate(data),
        ...slider.getSliderOptions()
      })
    },

    /**
     * selectDataFromSlider
     *
     * Select and return an object
     * from slider data.
     */
    selectDataFromSlider (data) {
      console.log(data)
      return {
        from: data.from,
        to: data.to,
        min: data.min,
        max: data.max,
        //
        // if value
        from_value: data.from_value || null,
        to_value: data.to_value || null,
        //
        // if pretty
        from_pretty: data.from_pretty || null,
        to_pretty: data.to_pretty || null,
        min_pretty: data.min_pretty || null,
        max_pretty: data.max_pretty || null,
        //
        // if percent
        from_percent: data.from_percent || null,
        to_percent: data.to_percent || null
      }
    }
  }
}
