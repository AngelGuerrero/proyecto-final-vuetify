export default class Checkbox {
  group = null
  slug = null
  value = null
  checked = false

  constructor (group, slug, value, status) {
    this.group = group
    this.slug = slug

    this.value = value || slug
    this.checked = status || false
  }
}
