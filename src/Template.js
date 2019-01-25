export default class Template {
  constructor () {
    console.log('Template created')
  }

  show (mode) {
    const view = `<div>${mode}</div>`

    return view
  }
}
