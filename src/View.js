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
    // initial
    this.$calendar.innerHTML = template.show('month')
    this.renderTodayDate()
    const month = moment().clone() // 선택된 날짜 정보를 복사한다.
    const start = moment().clone()
    start.date(1)

    this.removeTime(start.day(0)) // 이달의 첫일의 일요일 날짜의 객체를 시작일로 세팅.
    this.buildMonth(start, month) // scope와 시작일, 해당 월의 정보를 넘긴다.
  }

  renderTodayDate () {
    this.$today.innerHTML = moment().format('YYYY.MM.DD')
  }

  /**
   * 첫 달이 맨 앞이 아닌 경우 이전 달 또는 다음 달 날짜 추가해주기 위한 헬퍼 함수
   * @param {moment()} date 모멘트에서 가져온 날짜 객체
   */
  removeTime (date) {
    console.log(date)
    return date.day(0).hour(0).minute(0).second(0).millisecond(0)
  }

  buildMonth (start, month) {
    this.week = []
    const date = start.clone()
    let done = false
    let monthIndex = date.month()
    let count = 0

    while (!done) {
      this.week.push({ days: this.buildWeek(date.clone(), month) })

      date.add(1, 'w')
      done = (count++ > 2 && monthIndex) !== date.month() // 달이 넘어 가면 멈춘다.
      monthIndex = date.month()
    }

    console.log(this.week)
  }

  buildWeek (date, month) {
    var days = [] // 총 7일의 정보가 들어간다.
    for (let i = 0; i < 7; i++) {
      days.push({
        name: date.format('dd').substring(0, 2),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date
      })

      date = date.clone()
      date.add(1, 'd')
    }

    console.log(days)
    return days
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

  renderMonth () {
    this.$calendar.innerHTML = this.template.show('month')
  }

  renderWeek () {
    this.$calendar.innerHTML = this.template.show('week')
  }

  renderDay () {
    this.$calendar.innerHTML = this.template.show('day')
  }
}
