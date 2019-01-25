export default class View {
  constructor (controller) {
    this.controller = controller
    this.calendar = document.getElementById('js-calendar')
    this.calendar.innerHTML = controller.getHtmlState()

    this.monthBtn = document.querySelector('.header__tab-months')
    this.weekBtn = document.querySelector('.header__tab-weeks')
    this.dayBtn = document.querySelector('.header__tab-days')

    this.monthBtn.addEventListener('click', controller)
    this.weekBtn.addEventListener('click', controller)
    this.dayBtn.addEventListener('click', controller)

    this.update = (data) => {
      console.log(data)
      this.calendar.innerHTML = data.htmlState
    }

    this.controller.model.registerObserver(this)
  }
}
