/* eslint no-unused-vars: 0 */
import Model from './Model'
import View from './View'
import Template from './Template'
import Controller from './Ctrl'

import './calendar.css'

const model = new Model()
const template = new Template()
const view = new View(template)
const controller = new Controller(model, view)
