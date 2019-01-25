import moment from 'moment'
import { qs, $on } from 'helpers'

export default class View {
  constructor (template) {
    console.log('view created')
    this.template = template
    this.$calendar = qs('.calendar__body')

    this.$today = qs('.header__date-today')
    this.$monthBtn = qs('[data-mode="Month"]')
    this.$weekBtn = qs('[data-mode="Week"]')
    this.$dayBtn = qs('[data-mode="Day"]')

    this.init()
  }

  /**
   * 최초 실행 필요한 로직
   */
  init () {
    this.$calendar.innerHTML = this.template.show('month')
    this.renderTodayDate()
  }

  /**
   * 오늘 날짜 출력
   */
  renderTodayDate () {
    this.$today.innerHTML = moment().format('YYYY.MM.DD')
  }

  bindMonthBtnClick (handler) {
    $on(this.$monthBtn, 'click', handler)
  }

  bindWeekBtnClick (handler) {
    $on(this.$weekBtn, 'click', handler)
  }

  bindDayBtnClick (handler) {
    $on(this.$dayBtn, 'click', handler)
  }

  renderMonth (data) {
    this.$calendar.innerHTML = this.template.show('month', data)
  }

  renderWeek () {
    this.$calendar.innerHTML = this.template.show('week')
  }

  renderDay () {
    this.$calendar.innerHTML = this.template.show('day')
  }
}
