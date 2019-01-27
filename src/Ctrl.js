import moment from 'moment'

export default class Controller {
  constructor (model, view) {
    console.log('ctrl created')
    this.model = model
    this.view = view

    view.bindPrevBtnClick(this.showPrev.bind(this))
    view.bindNextBtnClick(this.showNext.bind(this))
    view.bindTodayBtnClick(this.showToday.bind(this))

    view.bindMonthBtnClick(this.showMonth.bind(this))
    view.bindWeekBtnClick(this.showWeek.bind(this))
    view.bindDayBtnClick(this.showDay.bind(this))

    view.bindAddTodoBtnClick(this.showAddTodo.bind(this))

    view.bindStartDateChange(this.handleStartDateChange.bind(this))

    this.showMonth()
  }

  routeChange (locationHash) {
    const route = locationHash.split('/')[1]
    const page = route || ''

    console.log(page)
  }

  // TODO: 네이밍 고민. 버튼은 월간/주간/일간 공유이므로 prev-M, prev-W, prev-D 식의 표현 필요
  showPrev () {
    this.model.get('prev', this.view.renderMonth.bind(this.view))
  }

  showNext () {
    this.model.get('next', this.view.renderMonth.bind(this.view))
  }

  showToday () {
    console.log('show Today')
    this.model.get('today', this.view.renderMonth.bind(this.view))
  }

  showMonth () {
    this.model.get('month', this.view.renderMonth.bind(this.view))
  }

  showWeek () {
    this.view.renderWeek()
  }

  showDay () {
    this.view.renderDay()
  }

  showAddTodo () {
    console.log('addtodo clicked')
    this.view.renderAddTodo().bind(this.view)
  }

  handleStartDateChange (e) {
    const value = e.target.value
    const yyyymmdd = value.split('T')[0]
    const result = new Date(yyyymmdd).getTime() // datetimelocal 값 milliseconds로 변환 (end시간과 비교 하기 위함)

    console.log(result)
    const momentValue = moment()
    console.log(momentValue.valueOf())
    console.log(new Date(momentValue.format('YYYY-MM-DD')).getTime())
  }
}
