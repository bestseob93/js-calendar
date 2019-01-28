import moment from 'moment'
import { qs, $on, $delegate } from 'helpers'

export default class View {
  constructor (template) {
    console.log('view created')

    this.inputDatas = {
      id: 0,
      title: '',
      bgColor: '',
      startDate: '',
      endDate: '',
      period: 0,
      memo: ''
    }

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
    this.$modalHeader = qs('.modal .modal__header h3')
    this.$closeBtn = qs('.modal .close')
    console.log(this.$closeBtn)

    this.$title = qs('input[name="title"]')
    this.$startDate = qs('input[name="startDate"]')
    this.$endDate = qs('input[name="endDate"]')
    this.$memo = qs('textarea[name="memo"]')

    this.$submit = qs('.submit__btn')
    this.$editBtn = qs('.edit__btn')
    this.$deleteBtn = qs('.delete__btn')

    /* observer */
    $delegate(this.$calendar, '.calendar__event', 'click', ({ target }) => {
      console.log(target)
      this.editTodo(target)
    })

    /* input change */
    $on(this.$title, 'change', this.handleChange.bind(this))
    $on(this.$startDate, 'change', this.handleChange.bind(this))
    $on(this.$endDate, 'change', this.handleChange.bind(this))
    $on(this.$memo, 'change', this.handleChange.bind(this))

    this.init()
  }

  editTodo (target) {
    const data = JSON.parse(target.dataset.event)
    this.inputDatas = data
    this.showModal()
    this.setModalToEditMode()
    this.$title.value = data.title
    this.$startDate.value = data.startDate
    this.$endDate.value = data.endDate
    this.$memo.value = data.memo
  }

  setModalToEditMode () {
    this.$modalHeader.innerHTML = '일정'
    this.$submit.style.display = 'none'
    this.$deleteBtn.style.display = 'block'
    this.$editBtn.style.display = 'block'
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

  clearInputs () {
    this.$title.value = ''
    this.$startDate.value = ''
    this.$endDate.value = ''
    this.$memo.value = ''
  }

  handleChange (e) {
    this.inputDatas = {
      ...this.inputDatas,
      [e.target.name]: e.target.value.trim()
    }
  }

  bindOnSubmit (handler) {
    $on(this.$submit, 'click', (e) => {
      const datas = { ...this.inputDatas }
      handler(e, datas)
    })
  }

  bindOnEditClick (handler) {
    $on(this.$editBtn, 'click', (e) => {
      const datas = { ...this.inputDatas }

      handler(e, datas)
    })
  }

  bindOnDeleteClick (handler) {
    $on(this.$deleteBtn, 'click', (e) => {
      const datas = { ...this.inputDatas }
      handler(e, datas.id)
    })
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
    this.$modalHeader.innerHTML = '일정 추가'
    this.$modalContainer.style.display = 'block'
    this.$submit.style.display = 'block'
    this.$deleteBtn.style.display = 'none'
    this.$editBtn.style.display = 'none'
    this.$modal.classList.add('opend')
  }

  closeModal () {
    this.$modalContainer.style.display = 'none'
    this.$modal.classList.remove('opend')
    this.clearInputs()
  }
}
