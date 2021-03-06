/* eslint no-unused-vars: 0 */
import Store from './store'
import Model from './Model'
import View from './View'
import Template from './Template'
import Controller from './Controller'

import 'styles/main.scss'

const store = new Store('js-calendar')
const model = new Model(store)
const template = new Template()
const view = new View(template)
const controller = new Controller(model, view)
