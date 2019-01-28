export default class Controller {
  constructor (model, view) {
    console.log('ctrl created')
    this.model = model
    this.view = view

    this.inputDatas = {
      title: '',
      startDate: '',
      endDate: '',
      memo: ''
    }

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
    view.bindTitleChange(this.handleTitleChange.bind(this))
    view.bindStartDateChange(this.handleStartDateChange.bind(this))
    view.bindEndDateChange(this.handleEndDateChange.bind(this))
    view.bindMemoChange(this.handleMemoChange.bind(this))
    view.bindOnSubmit(this.handleSubmit.bind(this))
    /* end modal events */

    this.showMonth()
  }

  setInputDatas (key, value) {
    this.inputDatas = {
      ...this.inputDatas,
      [key]: value
    }
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
    this.view.showModal()
  }

  handleTitleChange (e) {
    this.setInputDatas('title', e.target.value)
  }

  handleStartDateChange (e) {
    this.setInputDatas('startDate', e.target.value)
  }

  handleEndDateChange (e) {
    this.setInputDatas('endDate', e.target.value)
  }

  handleMemoChange (e) {
    this.setInputDatas('memo', e.target.value)
  }

  handleSubmit (e) {
    e.preventDefault()

    const formData = {
      ...this.inputDatas,
      bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` // 백그라운드에 사용할 랜덤 컬러
    }

    const startDateToMs = new Date(formData.startDate.split('T')[0]).getTime()
    const endDateToMs = new Date(formData.endDate.split('T')[0]).getTime()

    if (formData.title === '' || typeof formData.title !== 'string') {
      window.alert('일정의 제목을 입력해주세요')
    }

    if (endDateToMs <= startDateToMs) {
      window.alert('시작일시는 종료일시보다 이전이어야 합니다')
    }

    this.model.insert(formData, () => {
      this.view.closeModal()
      this.showMonth()
    })
    // const yyyymmdd = value.split('T')[0]
    // const result = new Date(yyyymmdd).getTime() // datetimelocal 값 milliseconds로 변환 (end시간과 비교 하기 위함)
  }
}
