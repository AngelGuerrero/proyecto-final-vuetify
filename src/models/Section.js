export default class Section {
  /**
   * name
   *
   * Name of the section, control or
   * component, this acts as an id.
   */
  name = null

  /**
   * title
   *
   * Title or message that will be displayed
   * when validation fails or in label control.
   */
  title = null

  /**
   * validation
   *
   * This object contains:
   * -  valid: Validation status.
   * -  message: Message that will be displayed when error occurs.
   */
  validation = () => ({
    valid: false,
    message: null
  })

  /**
   * items
   *
   * Items are as itself says, items beyond to this section,
   * childs of this section.
   *
   * This variable 'items' sometimes needs change its data type
   * sometimes string, sometimes array, but the variable name
   * will be the same.
   */
  items = []

  /**
   * vmodel
   *
   * This variable is very important.
   *
   * In this variable the selected data of the control childs
   * will be saved here, and is important because at the end of
   * the program all the data will be retrieved from this variable.
   */
  vmodel = null

  /**
   * constructor
   *
   * This constructor receives the next parameters.
   * Required:
   *  - name
   *  - title
   *
   * @param {String} name It is the name of this section.
   * @param {String} title Information will be displayed.
   * @param {Array|String} items Child elements of this section.
   * @param {String} message Error message that will be displayed when error occurs.
   * @param {*} vmodel Initialize vmodel with type or value.
   * @param {Boolean} valid Initialize validation value of this section.
   */
  constructor (
    name = '',
    title = '',
    items = null,
    message = null,
    vmodel = null,
    valid = false
  ) {
    this.name = name

    this.title = title

    this.items = items

    this.vmodel = vmodel

    if (message !== null) {
      this.validation = { valid: valid || false, message }
      return
    }

    if (Array.isArray(this.items)) {
      this.validation = {
        valid,
        message: `Selecciona una opción de '${this.title}'`
      }
      return
    }

    if (this.items === null || this.items === '') {
      this.validation = { valid, message: `El campo '${this.title}' es requerido.` }
    }
  }

  // =========================================================================
  // Computed
  // =========================================================================
  isValid () {
    return this.validation.valid
  }

  // =========================================================================
  // Get
  // =========================================================================
  getName () {
    return this.name
  }

  getTitle () {
    return this.title
  }

  getItems () {
    return this.items
  }

  getValidation () {
    return {
      validation: this.validation()
    }
  }

  getErrorMessages () {
    return this.isValid() ? [] : this.getValidationMessage()
  }

  getValidationMessage () {
    const { message } = this.validation
    return message
  }

  getVmode () {
    return this.vmodel
  }

  // =========================================================================
  // Set
  // =========================================================================
  setValid (value) {
    this.validation.valid = value
  }

  setVmodel (value) {
    this.vmodel = value
  }
}
