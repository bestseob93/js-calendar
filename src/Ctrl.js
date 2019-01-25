export default class Controller {
  constructor (model) {
    this.model = model

    // this.handleEvent = this.handleEvent.bind(this)
    // this.getModelHeading = this.getModelHeading.bind(this)
    // this.clickHandler = this.clickHandler.bind(this)
  }

  handleEvent (e) {
    const self = this
    e.stopPropagation()

    switch (e.type) {
      case 'click':
        self.clickHandler(e.target)
        break
      default:
        console.log(e.target)
    }
  }

  getHtmlState () {
    return this.model.htmlState
  }

  clickHandler (target) {
    console.log(target.dataset.mode)
    this.model.changeHeading(target.dataset.mode)
    this.model.notifyAll()
  }
}
