export default class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view

    /* header events */
    view.bindPrevBtnClick(this.showPrev.bind(this))
    view.bindNextBtnClick(this.showNext.bind(this))
    view.bindTodayBtnClick(this.showToday.bind(this))

    view.bindMonthBtnClick(this.showMonth.bind(this))
    view.bindWeekBtnClick(this.showWeek.bind(this))
    view.bindDayBtnClick(this.showDay.bind(this))

    view.bindAddTodoBtnClick(this.showAddTodo.bind(this))
    /* end header events */

    /* modal events */
    view.bindCloseModalBtnClick(this.view.closeModal.bind(this.view))
    view.bindOnSubmit(this.handleSubmit.bind(this))
    view.bindOnEditClick(this.handleEdit.bind(this))
    view.bindOnDeleteClick(this.handleDelete.bind(this))
    /* end modal events */

    this.showWeek()
  }

  // TODO: 네이밍 고민. 버튼은 월간/주간/일간 공유이므로 prev-M, prev-W, prev-D 식의 표현 필요
  showPrev () {
    this.model.get('prev', this.view.renderMonth.bind(this.view))
  }

  showNext () {
    this.model.get('next', this.view.renderMonth.bind(this.view))
  }

  showToday () {
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
    this.view.showModal()
  }

  handleSubmit (e, data) {
    e.preventDefault()
    this.model.insert(data, () => {
      this.view.closeModal()
      this.showMonth()
    })
  }

  handleEdit (e, data) {
    e.preventDefault()
    this.model.update(data, () => {
      this.view.closeModal()
      this.showMonth()
    })
  }

  handleDelete (e, id) {
    e.preventDefault()
    this.model.remove(id, () => {
      this.view.closeModal()
      this.showMonth()
    })
  }
}
