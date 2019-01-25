import BodyState from './BodyState'

export default class BodyContainer {
  constructor () {
    this.state = new BodyState(this)
  }

  changeState (name) {
    this.state.next(name)
  }

  getValue () {
    return this.state.value
  }
}
