/* eslint no-unused-vars: 0 */
import Store from './store'
import Model from './models/Calendar'
import View from './views/Month/Month'
import Template from './Template'
import Controller from './Ctrl'

import './calendar.css'

const store = new Store('js-calendar')
const model = new Model(store)
const template = new Template()
const view = new View(template)
const controller = new Controller(model, view)
