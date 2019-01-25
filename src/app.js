// import Store from 'store'
// import Header from 'views/Common/Header'
// import Months from 'views/Months/Months'
import Model from './Model'
import View from './View'
import Template from './Template'
import Controller from './Ctrl'

export default class App {
  constructor () {
    this.model = new Model()
    this.template = new Template()
    this.view = new View(this.template)
    this.controller = new Controller(this.model, this.view)
  }
}

const app = new App()

console.log(app)

// window.onload = () => {
//   app.constructor()
// }

// window.unload = () => {
//   app.destroy()
// }
