import moment from 'moment'

export default class Model {
  constructor () {
    moment.locale('kr', {
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
      weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
    })
    this.month = moment().clone() // 선택된 날짜 정보를 복사한다.
    this.start = moment().clone()
  }

  /**
   * 이달의 첫일의 일요일 날짜의 객체를 시작일로 세팅
   * @param {moment()} date 모멘트에서 가져온 날짜 객체
   * @example 2019년 1월 1일은 화요일부터 이므로 일요일에 해당하는 날짜는 2018년 12월 30일이다.
   */
  removeTime (date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0)
  }

  /**
   * 월을 그린다.
   * @param {moment()} start 시작일
   * @param {moment()} month 월
   */
  buildMonth (start, month) {
    this.week = []
    const date = start.clone()
    let count = 0
    let isNextMonth = false

    while (!isNextMonth) {
      this.week.push({ days: this.buildWeek(date.clone(), month) })
      date.add(1, 'w')
      isNextMonth = count++ === 5 // 6줄로 렌더링
    }
  }

  /**
   * 주를 그린다.
   * @param {moment()} date 날짜 객체
   * @param {moment()} month 월
   */
  buildWeek (date, month) {
    const days = [] // 총 7일의 정보가 들어간다.
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

    return days
  }

  get (name, callback) {
    if (name === 'month') {
      this.start.date(1)
      this.removeTime(this.start.day(0))
      this.buildMonth(this.start, this.month)

      callback(this.week)
    } else if (name === 'prev') {
      const prev = this.month.clone()
      this.removeTime(prev.month(prev.month() - 1).date(1))
      this.month.month(this.month.month() - 1)
      this.buildMonth(prev, this.month)

      callback(this.week)
    } else if (name === 'next') {
      const next = this.month.clone()
      this.removeTime(next.month(next.month() + 1).date(1))
      this.month.month(this.month.month() + 1)
      this.buildMonth(next, this.month)

      callback(this.week)
    }
  }
}
