export default class Slider {
  //
  // Bind to vue
  id = null
  name = null
  vmodel = null
  validation = {}

  min = 0
  max = 100

  from = 0
  to = 100

  grid = true
  type = 'double'
  prefix = null
  postfix = null
  step = null

  constructor (id, type, min, max, from, to, prefix = null, postfix = null, step = null) {
    this.id = id
    this.name = id
    this.type = type
    this.min = min
    this.max = max
    this.from = from
    this.to = to

    //
    // Optional values
    this.prefix = prefix
    this.postfix = postfix
    this.step = step

    //
    // Without validation
    this.validation = {
      valid: true,
      message: 'Sin validación'
    }
  }

  getSliderOptions () {
    return {
      min: this.min,
      max: this.max,
      from: this.from,
      to: this.to,
      type: this.type,
      grid: this.grid,
      prefix: this.prefix,
      postfix: this.postfix,
      step: this.step
    }
  }

  setVmodel (data) {
    this.vmodel = data
  }
}
