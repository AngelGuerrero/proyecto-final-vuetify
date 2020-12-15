import Slider from './Slider'
import moment from 'moment'

export default class SliderDate extends Slider {
  lang = moment().locale()
  year = moment().year()
  prettify = null
  //
  // If current months is true
  // then it'll show the next values
  // and the min and max will be fixed
  // by the length of the values
  currentMonths = false
  values = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  constructor (id, type = 'double', currentMonths = false, from = null, to = null, prefix = null, postfix = null) {
    super(id, type, null, null, from, to, prefix, postfix)

    //
    // You can use moment to select the initial date
    // 2019 01 01
    this.min = moment('20190101', 'YYYYMMDD')
    // Or simple use this year
    // this.min = this.dateToTS(new Date(this.year, 0, 1))
    this.max = this.dateToTS(new Date(this.year, 11, 2))
    //
    // Use the next functions to select the date
    this.from = this.dateToTS(new Date(this.year - 1, 3, 2))
    this.to = this.dateToTS(new Date(this.year, 8, 20))

    this.prettify = this.tsToDate
    this.currentMonths = currentMonths
  }

  getSliderOptions () {
    return {
      from: this.from,
      to: this.to,

      min: this.min,
      max: this.max,

      type: this.type,
      grid: true,
      values: this.currentMonths ? this.values : [],
      prettify: this.prettify
    }
  }

  dateToTS (date) {
    return date.valueOf()
  }

  tsToDate (ts) {
    var d = new Date(ts)

    return d.toLocaleDateString(this.lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
