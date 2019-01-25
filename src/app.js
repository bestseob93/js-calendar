// import Store from 'store'
// import Header from 'views/Common/Header'
// import Months from 'views/Months/Months'
import Model from './Model'
import View from './View'
import Controller from './Ctrl'

export default class App {
  constructor () {
    // this.store = new Store('js-calendar')
    // this.state = {
    //   test: 'hi'
    // }
    this.model = new Model()
    this.controller = new Controller(this.model)
    this.view = new View(this.controller)
  }

  // render () {
  //   const calendar = document.getElementById('js-calendar')
  //   this.header = new Header(calendar, this.state)
  //   this.months = new Months(calendar, this.state)
  //   // calendar.appendChild(main)
  // }

  // destroy () {
  //   delete this.header
  //   delete this.months
  // }
}

// const app = new App()

// window.onload = () => {
//   app.constructor()
// }

// window.unload = () => {
//   app.destroy()
// }
