import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "container", "header" ]

  get niceParam() {
    return this.data.get('niceParam')
  }

  set niceParam(param) {
    this.data.set('niceParam', param)
  }

  handleNavSwitch(event) {
    const url = event.detail
    this.niceParam = url.match(/nice=([0,1])/)[1]
    this.render(url)
  }

  async sort(event) {
    let url = event.currentTarget.dataset.url
    const order = this.nextOrder(event.currentTarget)
    // debugger
    if (order === 'none') {
      url = `${url.split('sort')[0]}nice=${this.niceParam}` // remove sort param
    } else {
      url = `${url}&order=${order}&nice=${this.niceParam}`
    }
    this.render(url)
  }

  nextOrder(target) {
    const currentOrder = target.getAttribute('aria-sort')
    if (currentOrder === 'none') { this.updateSorting(target, 'ascending'); return 'asc' }
    if (currentOrder === 'ascending') { this.updateSorting(target, 'descending'); return 'desc' }
    if (currentOrder === 'descending') { this.updateSorting(target, 'none'); return 'none' }
  }

  updateSorting(target, order) {
    target.setAttribute('aria-sort', order)
    let otherHeaders = this.headerTargets.filter(header => header !== target)
    otherHeaders.forEach(header => header.setAttribute('aria-sort', 'none'))
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
