import moment from 'moment'
import { qs, $on, $delegate } from 'helpers'

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

    /* modal */
    this.$modalContainer = qs('.modal__container')
    this.$modal = qs('.modal')
    this.$closeBtn = qs('.modal .close')
    console.log(this.$closeBtn)

    this.$title = qs('input[name="title"]')
    this.$startDate = qs('input[name="startDate"]')
    this.$endDate = qs('input[name="endDate"]')
    this.$memo = qs('textarea[name="memo"]')

    this.$submit = qs('.submit__btn')

    /* observer */
    $delegate(this.$calendar, '.calendar__event', 'click', ({ target }) => {
      console.log(target)
      this.editTodo(target)
    })
    this.init()
  }

  editTodo (target) {
    const data = JSON.parse($event.dataset.event)
    this.showModal()
    this.$title.value = data.title
    this.$startDate.value = data.startDate
    this.$endDate.value = data.endDate
    this.$memo.value = data.memo
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

  bindCloseModalBtnClick (handler) {
    $on(this.$closeBtn, 'click', handler)
  }

  bindTitleChange (handler) {
    $on(this.$title, 'change', handler)
  }

  bindStartDateChange (handler) {
    $on(this.$startDate, 'change', handler)
  }

  bindEndDateChange (handler) {
    $on(this.$endDate, 'change', handler)
  }

  bindMemoChange (handler) {
    $on(this.$memo, 'change', handler)
  }

  bindOnSubmit (handler) {
    $on(this.$submit, 'click', handler)
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

  showModal () {
    this.$modalContainer.style.display = 'block'
    this.$modal.classList.add('opend')
  }

  closeModal () {
    this.$modalContainer.style.display = 'none'
    this.$modal.classList.remove('opend')
  }
}
