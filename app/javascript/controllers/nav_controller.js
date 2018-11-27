import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'link' ]

  get links() {
    return this.linkTargets
  }

  get activeLink() {
    return this.linkTargets.find(link => link.classList.contains('active'))
  }

  toggleActive(event) {
    event.preventDefault()
    if (event.target === this.activeLink) return

    this.links.forEach((link) => link.classList.toggle('active', link === event.target))
    this.emitNavSwitchEvent(event.target.href)
  }

  emitNavSwitchEvent(url) {
    document.dispatchEvent(new CustomEvent('navSwitch', { detail: url }))
  }
}
