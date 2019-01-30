import moment from 'moment'
import { compareToSort, generateRandomColor } from 'helpers'

export default class Calendar {
  constructor (store) {
    this.store = store
    moment.locale('kr', {
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
      weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
    })

    this.month = moment().clone() // 선택된 날짜 정보를 복사한다.
    this.datas = []
    this.store.findAll((items) => {
      this.datas = items
    })
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
   * 월간을 위한 월을 그린다.
   * @param {moment()} start 시작일
   * @param {moment()} month 월
   */
  buildMonthForMonth (start, month) {
    this.week = []
    const date = start.clone()
    let count = 0
    let isNextMonth = false

    while (!isNextMonth) {
      this.week.push({
        days: this.buildWeekForMonth(date.clone(), month)
      })
      date.add(1, 'w')
      isNextMonth = count++ === 5 // 6줄로 렌더링
    }
  }

  /**
   * 월간을 위한 주를 그린다.
   * @param {moment()} date 날짜 객체
   * @param {moment()} month 월
   */
  buildWeekForMonth (date, month) {
    const days = [] // 총 7일의 정보가 들어간다.
    for (let i = 0; i < 7; i++) {
      days.push({
        name: date.format('dd').substring(0, 2),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        startEvents: this.datas.filter(data => {
          return data.startDate.split('T')[0] === date.format('YYYY-MM-DD')
        }),
        endEvents: this.datas.filter(data => {
          return data.endDate.split('T')[0] === date.format('YYYY-MM-DD')
        }),
        hasEvents: this.datas.filter(data => {
          // 현재의 yyyymmss 의 밀리세컨즈가 일정 시작의 yyyymmss 밀리세컨즈와 일정 끝의 yyyymmss 밀리세컨즈의 사이에 있으면 해당 데이터 리턴
          const startDate = data.startDate.split('T')[0]
          const endDate = data.endDate.split('T')[0]
          const momentToMs = new Date(date.format('YYYY-MM-DD')).getTime()
          const isStart = momentToMs >= new Date(startDate).getTime()
          const isEnd = momentToMs <= new Date(endDate).getTime()

          if (isStart && isEnd) {
            return true
          }
        }).sort(compareToSort),
        date: date
      })

      date = date.clone()
      date.add(1, 'd')
    }

    return days
  }

  buildWeekForWeek (start, month) {
    this.days = []

    const date = start.clone()

    for (let i = 0; i < 7; i++) {
      this.days.push({
        number: date.date(),
        isToday: date.isSame(new Date(), 'day'),
        hours: this.buildHoursForWeek(date.clone(), month),
        hasEventsInWeek: this.datas.filter(data => {
          const startDate = data.startDate.split('T')[0]
          const endDate = data.endDate.split('T')[0]
          const momentToMs = new Date(date.format('YYYY-MM-DD')).getTime()
          const isStart = momentToMs >= new Date(startDate).getTime()
          const isEnd = momentToMs <= new Date(endDate).getTime()

          if (startDate === endDate) {
            return false
          }
          if (isStart && isEnd) {
            return true
          }
        }).sort(compareToSort),
        date: date.clone()
      })
      date.add(1, 'd')
    }
    console.log(this.days)
  }

  buildHoursForWeek (date, month) {
    //
    const hours = []
    const hasTodo = this.datas.filter(data => {
      return data.startDate.split('T')[0] === date.format('YYYY-MM-DD') && data.endDate.split('T')[0] === date.format('YYYY-MM-DD')
    })

    console.log(hasTodo)

    const range = []
    hasTodo.filter(data => {
      const startHour = parseInt(data.startDate.split('T')[1].split(':')[0], 10)
      const endHour = parseInt(data.endDate.split('T')[1].split(':')[0], 10)

      range.push(endHour - startHour)
    })

    console.log(range)

    for (let i = 0; i < 24; i++) {
      hours.push({
        number: i,
        events: hasTodo.filter(data => {
          const startHour = parseInt(data.startDate.split('T')[1].split(':')[0], 10)
          const endHour = parseInt(data.endDate.split('T')[1].split(':')[0], 10)

          const isStart = i >= startHour
          const isEnd = i < endHour

          if (isStart && isEnd) {
            return true
          }
        })
      })
    }

    return hours
  }

  insert (data, callback) {
    data.bgColor = generateRandomColor()
    const startDateToMs = new Date(data.startDate.split('T')[0]).getTime()
    const endDateToMs = new Date(data.endDate.split('T')[0]).getTime()

    if (data.title === '' || typeof data.title !== 'string') {
      window.alert('일정의 제목을 입력해주세요')
    } else if (endDateToMs < startDateToMs) {
      window.alert('시작일시는 종료일시보다 이전이어야 합니다')
    } else {
      data.period = endDateToMs - startDateToMs
      this.store.insert(data, callback)
    }
  }

  update (data, callback) {
    this.store.update(data, callback)
  }

  remove (id, callback) {
    this.store.remove({ id }, callback)
  }

  get (name, callback) {
    this.start = moment().clone()
    this.store.findAll((items) => {
      this.datas = items
    })
    console.log(name)
    if (name === 'month') {
      this.start.date(1)
      this.removeTime(this.start.day(0))
      this.buildMonthForMonth(this.start, this.month)

      callback(this.week)
    } else if (name === 'prev') {
      const prev = this.month.clone()
      this.removeTime(prev.month(prev.month() - 1).date(1))
      this.month.month(this.month.month() - 1)
      this.buildMonthForMonth(prev, this.month)

      callback(this.week)
    } else if (name === 'next') {
      const next = this.month.clone()
      this.removeTime(next.month(next.month() + 1).date(1))
      this.month.month(this.month.month() + 1)
      this.buildMonthForMonth(next, this.month)

      callback(this.week)
    }

    if (name === 'week') {
      this.start.startOf('week')
      this.removeTime(this.start.day(0))
      this.buildWeekForWeek(this.start, this.month)

      callback(this.days)
    }

    if (name === 'day') {
      const today = moment().clone()
      const hours = this.buildHoursForWeek(today, this.month)

      const hour = {
        today,
        hours
      }

      callback(hour)
    }
  }
}
