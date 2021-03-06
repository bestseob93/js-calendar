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

  showPrev () {
    this.model.prev(this.view.render.bind(this.view))
  }

  showNext () {
    this.model.next(this.view.render.bind(this.view))
  }

  showToday () {
    this.model.getToday(this.view.render.bind(this.view))
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
    this.model.insert(data, (type) => {
      this.view.closeModal()
      this.model.get(type, this.view.render.bind(this.view))
    })
  }

  handleEdit (e, data) {
    e.preventDefault()
    this.model.update(data, (type) => {
      this.view.closeModal()
      this.model.get(type, this.view.render.bind(this.view))
    })
  }

  handleDelete (e, id) {
    e.preventDefault()
    this.model.remove(id, (type) => {
      this.view.closeModal()
      this.model.get(type, this.view.render.bind(this.view))
    })
  }
}
