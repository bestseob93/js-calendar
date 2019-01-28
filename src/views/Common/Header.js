export default class Header {
  constructor (parentElement, state) {
    this.state = state
    const header = document.createElement('div')
    header.classList.add('calendar__header')
    header.innerHTML = `
      <div class="nav header__nav">
        <div class="header__date-today">2019-01-24</div>
        <button class="nav__button--prev"><span><</span></button>
        <button class="nav__button--next"><span>></span></button>
        <button class="nav__button--today"><span>오늘</span></button>
      </div>
      <div class="tab header__tab">
        <button class="header__tab-days">일간</button>
        <button class="header__tab-weeks">주간</button>
        <button class="header__tab-months">월간</button>
      </div>
      <button class="header__todo-button--add">일정 추가</button>`

    parentElement.appendChild(header)

    const s = document.querySelector('.nav__button--prev')
    s.addEventListener('click', (e) => {
      this.state.test = 'bye'
    })
  }

  handleEvent (e) {
    const self = this
    e.stopPropagation()

    switch (e.type) {
      case 'click':
        self.clickHandler(e.target)
        break
      default:
        console.log(e.target)
    }
  }

  clickHandler (target) {
    this.model.heading = 'World'
    target.innerHTML = this.getModelHeading()
  }
}
