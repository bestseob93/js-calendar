export default class Controller {
  constructor (model, view) {
    console.log('ctrl created')
    this.model = model
    this.view = view
  }

  routeChange (locationHash) {
    const route = locationHash.split('/')[1]
    const page = route || ''
    this.updateFilterStage(page)
  }
}
