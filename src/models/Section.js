export default class Section {
  name = null
  title = null
  validation = {}
  items = []
  //
  // Bind with vue controls
  vmodel = null

  constructor (name, title, items, validationMessage, vmodel = null) {
    this.name = name
    this.title = title

    this.validation = {
      valid: false,
      message: validationMessage || `Selecciona una opción de '${this.title}'`
    }
    this.items = items
    this.vmodel = vmodel
  }

  static getNewInstance (obj) {
    return new Section(obj.name, obj.title, obj.items, obj.validationMessage)
  }

  getName () { return this.name }

  getTitle () { return this.title }

  getItems () { return this.items }

  getValidationMessage () { return this.validation.message }

  getErrorMessages () {
    return this.isValid() ? [] : this.getValidationMessage()
  }

  setValid (value) {
    this.validation.valid = value
  }

  isValid () {
    return this.validation.valid
  }

  getSelected () {
    return this.vmodel
  }

  setVmodel (vmodel) {
    this.vmodel = vmodel
  }
}
