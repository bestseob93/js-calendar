import moment from 'moment'
import { qs, $on } from 'helpers'

export default class View {
  constructor (template) {
    console.log('view created')
    this.template = template
    this.$calendar = qs('.calendar__body')

    /* header left */
    this.$today = qs('.header__date-today')
    this.$prevBtn = qs('.nav__button--prev')
    this.$nextBtn = qs('.nav__button--next')
    this.$todayBtn = qs('.nav__button--today')

    /* header center(tabs) */
    this.$monthBtn = qs('[data-mode="Month"]')
    this.$weekBtn = qs('[data-mode="Week"]')
    this.$dayBtn = qs('[data-mode="Day"]')

    this.$addTodo = qs('.header__todo-button--add')

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

  bindPrevBtnClick (handler) {
    $on(this.$prevBtn, 'click', handler)
  }

  bindNextBtnClick (handler) {
    $on(this.$nextBtn, 'click', handler)
  }

  bindTodayBtnClick (handler) {
    $on(this.$todayBtn, 'click', handler)
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

  bindAddTodoBtnClick (handler) {
    $on(this.$addTodo, 'click', handler)
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

  renderAddTodo () {
    const modal = document.createElement('div')
    modal.classList.add('modal__container')

    document.body.prepend(modal)
  }
}
