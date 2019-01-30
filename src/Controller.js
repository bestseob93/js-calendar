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

    /* modal events */
    view.bindCloseModalBtnClick(this.view.closeModal.bind(this.view))
    view.bindOnSubmit(this.handleSubmit.bind(this))
    view.bindOnEditClick(this.handleEdit.bind(this))
    view.bindOnDeleteClick(this.handleDelete.bind(this))

    this.showMonth()
  }

  // TODO: 네이밍 고민. 버튼은 월간/주간/일간 공유이므로 prev-M, prev-W, prev-D 식의 표현 필요
  showPrev () {
    this.model.prev(this.view.render.bind(this.view))
  }

  showNext () {
    this.model.next(this.view.render.bind(this.view))
  }

  showToday () {
    this.model.get('today', this.view.render.bind(this.view))
  }

  showMonth () {
    this.model.setType('month')
    this.model.get('month', this.view.render.bind(this.view))
  }

  showWeek () {
    this.model.setType('week')
    this.model.get('week', this.view.render.bind(this.view))
  }

  showDay () {
    this.model.setType('day')
    this.model.get('day', this.view.render.bind(this.view))
  }

  showAddTodo () {
    this.view.openModal('add')
  }

  handleSubmit (e, data) {
    e.preventDefault()
    this.model.insert(data, () => {
      this.view.closeModal()
      console.log('aa')
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
