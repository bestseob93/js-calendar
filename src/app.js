import Store from 'store'
import Header from 'views/Common/Header'
import Months from 'views/Months/Months'

export default class App {
  constructor () {
    this.store = new Store('js-calendar')
  }
  render () {
    const calendar = document.getElementById('js-calendar')
    this.header = new Header(calendar)
    this.months = new Months(calendar)
    // calendar.appendChild(main)
  }
  destroy () {
    delete this.header
    delete this.months
  }
}

const app = new App()

window.onload = () => {
  app.render()
}

window.unload = () => {
  app.destroy()
}
