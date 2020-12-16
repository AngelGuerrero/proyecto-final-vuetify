import moment from 'moment'

export default class Calendar {
  name = null
  id = null
  value = null
  from = null
  to = null
  currentDate = moment().format()
  vmodel = null

  //
  // Static
  locale = 'es-MX'

  constructor (name, type = '', from = null, to = null, current = moment().format('DD MM YYYY')) {
    this.name = name
    this.from = from || moment().format()
    this.to = to || moment().format()
    this.currentDate = current || moment().format()

    this.vmodel = type
  }

  static getLocale () {
    return this.locale
  }

  getRangeOfDates () {
    return [this.from, this.to]
  }

  getRangeOfDatedPretty (pFormat = null) {
    this.from = this.vmodel[0]
    this.to = this.vmodel[1]

    const format = pFormat || 'DD/MM/YYYY'
    return [moment(this.from).format(format), moment(this.to).format(format)]
  }
}
