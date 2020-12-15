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
  // prefix = null
  // step = null

  constructor (id, type, min, max, from, to) {
    console.log('Creating new slider')

    this.id = id
    this.name = id
    this.type = type
    this.min = min
    this.max = max
    this.from = from
    this.to = to

    //
    // Without validation
    this.validation = {
      valid: true,
      message: 'Sin validación'
    }
  }

  getData () {
    return {
      min: this.min,
      max: this.max,
      from: this.from,
      to: this.to,

      type: this.type,
      grid: this.grid
    }
  }

  setVmodel (data) {
    this.vmodel = data
  }
}
