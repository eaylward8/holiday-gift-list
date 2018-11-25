import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "container" ]

  async displayGifts(event) {
    const url = event.detail
    const response = await fetch(url)
    const html = await response.text()
    this.containerTarget.innerHTML = html
  }
}
