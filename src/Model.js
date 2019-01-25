import BodyContainer from './BodyContainer'

export default class Model {
  constructor () {
    this.state = new BodyContainer()

    let htmlState = this.state.getValue()
    this.observers = []

    Object.defineProperty(this, 'htmlState', {
      get: () => {
        return htmlState
      },
      set: (value) => {
        htmlState = value
        this.notifyAll()
      }
    })
  }

  registerObserver (observer) {
    this.observers.push(observer)
  }

  notifyAll () {
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }

  changeHeading (name) {
    console.log('change state: ', name)
    this.state.changeState(name)
    this.htmlState = this.state.getValue()
  }
}
