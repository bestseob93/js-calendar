export default class Controller {
  constructor (model, view) {
    console.log('ctrl created')
    this.model = model
    this.view = view

    view.bindMonthBtnClick(this.showMonth.bind(this))
    view.bindWeekBtnClick(this.showWeek.bind(this))
    view.bindDayBtnClick(this.showDay.bind(this))
  }

  routeChange (locationHash) {
    const route = locationHash.split('/')[1]
    const page = route || ''

    console.log(page)
  }

  showMonth () {
    console.log('clicked')
    this.model.get('month', this.view.renderMonth.bind(this.view))
  }

  showWeek () {
    console.log('clicked2')
    this.view.renderWeek()
  }

  showDay () {
    console.log('clicked3')
    this.view.renderDay()
  }
}
