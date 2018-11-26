import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "container", "header" ]

  initialize() {
    this.render(this.buildUrl())
  }

  get basePath() {
    return this.data.get('base-path')
  }

  get nice() {
    return this.data.get('nice')
  }

  set nice(value) {
    this.data.set('nice', value)
  }

  get sortBy() {
    return this.data.get('sort-by')
  }

  set sortBy(value) {
    return this.data.set('sort-by', value)
  }

  get order() {
    return this.data.get('order')
  }

  set order(value) {
    return this.data.set('order', value)
  }

  handleNavSwitch(event) {
    const url = event.detail
    this.nice = url.match(/nice=([0,1])/)[1] // value will be "0" or "1"
    this.render(this.buildUrl())
  }

  async sort(event) {
    const header = event.currentTarget
    this.sortBy = header.dataset.sortBy
    this.order = this.nextOrder(header)
    this.render(this.buildUrl())
  }

  nextOrder(header) {
    const currentOrder = header.getAttribute('aria-sort')
    if (currentOrder === 'none') { this.updateSorting(header, 'ascending'); return 'asc' }
    if (currentOrder === 'ascending') { this.updateSorting(header, 'descending'); return 'desc' }
    if (currentOrder === 'descending') { this.updateSorting(header, 'none'); return '' }
  }

  updateSorting(target, order) {
    target.setAttribute('aria-sort', order)
    let otherHeaders = this.headerTargets.filter(header => header !== target)
    otherHeaders.forEach(header => header.setAttribute('aria-sort', 'none'))
  }

  buildUrl() {
    if (!this.order) return `${this.basePath}?nice=${this.nice}`
    return `${this.basePath}?nice=${this.nice}&sort=${this.sortBy}&order=${this.order}`
  }

  async render(url) {
    const html = await this.fetchData(url)
    this.containerTarget.innerHTML = html
  }

  async fetchData(url) {
    const response = await fetch(url)
    return await response.text()
  }
}
