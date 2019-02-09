import moment from 'moment'
import {
  compareToSort,
  generateRandomColor,
  getMsFromDate,
  getYYYYMMDD,
  gethhdd,
  getDayName,
  MS_OF_DAY
} from 'helpers'

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

    this.datas = []
    this.store.findAll((items) => {
      this.datas = items
    })

    this.type = 'month'
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
        days: this.buildWeekForMonth(date.clone(), month),
        hasEventsInWeek: this.datas.filter(data => {
          const newDate = date.clone()
          const startOfWeek = getMsFromDate(newDate.startOf('week').format('YYYY-MM-DD'))
          const endOfWeek = getMsFromDate(newDate.endOf('week').format('YYYY-MM-DD'))
          const startDate = getMsFromDate(getYYYYMMDD(data.startDate))
          const endDate = getMsFromDate(getYYYYMMDD(data.endDate))
          const SEVEN = MS_OF_DAY * 7
          if (startDate > endOfWeek) {
            return false
          }

          if (endDate < startOfWeek) {
            return false
          }

          if (startOfWeek <= startDate && endOfWeek >= startDate) {
            return true
          }

          if (endDate - startOfWeek > SEVEN) {
            return true
          }

          if (endDate - startOfWeek < SEVEN && endDate - startOfWeek >= 0) {
            return true
          }
        }).sort(compareToSort)
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
    for (let i = 0; i < 7; i += 1) {
      days.push({
        name: getDayName(date.format('dd')),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        startEvents: this.datas.filter(data => {
          return getYYYYMMDD(data.startDate) === date.format('YYYY-MM-DD')
        }),
        endEvents: this.datas.filter(data => {
          return getYYYYMMDD(data.endDate) === date.format('YYYY-MM-DD')
        }),
        hasEvents: this.datas.filter(data => {
          // 현재의 yyyymmss 의 밀리세컨즈가 일정 시작의 yyyymmss 밀리세컨즈와 일정 끝의 yyyymmss 밀리세컨즈의 사이에 있으면 해당 데이터 리턴
          const startDate = getYYYYMMDD(data.startDate)
          const endDate = getYYYYMMDD(data.endDate)
          const momentToMs = getMsFromDate(date.format('YYYY-MM-DD'))
          const isStart = momentToMs >= getMsFromDate(startDate)
          const isEnd = momentToMs <= getMsFromDate(endDate)

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

  /**
   * 타입 주간일 때 필요한 주를 그린다
   * @param {moment()} start 날짜 객체
   * @param {moment()} month 월
   */
  buildWeekForWeek (start, month) {
    this.days = []

    const date = start.clone()

    for (let i = 0; i < 7; i += 1) {
      this.days.push({
        number: date.date(),
        isToday: date.isSame(new Date(), 'day'),
        hours: this.buildHoursForWeek(date.clone()),
        hasEventsInWeek: this.datas.filter(data => {
          const startDate = getYYYYMMDD(data.startDate)
          const endDate = getYYYYMMDD(data.endDate)
          const momentToMs = getMsFromDate(date.format('YYYY-MM-DD'))
          const isStart = momentToMs >= getMsFromDate(startDate)
          const isEnd = momentToMs <= getMsFromDate(endDate)

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
  }

  /**
   * 타입 주간일 때의 시간 출력과 타입 일간일 때의 시간 출력을 위한 함수
   * @param {moment()} date 날짜 객체
   */
  buildHoursForWeek (date) {
    const hours = []
    const hasTodo = this.datas.filter(data => {
      return getYYYYMMDD(data.startDate) === date.format('YYYY-MM-DD') && getYYYYMMDD(data.endDate) === date.format('YYYY-MM-DD')
    })

    for (let i = 0; i < 24; i++) {
      hours.push({
        number: i,
        events: hasTodo.filter(data => {
          const startHour = parseInt(gethhdd(data.startDate).split(':')[0], 10)
          const endHour = parseInt(gethhdd(data.endDate).split(':')[0], 10)

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

  /**
   * 일간/주간/월간 타입 설정
   * @param {string} type day, week, month
   */
  setType (type) {
    this.type = type
  }

  /**
   * 스토어에 데이터 저장
   * @param {object} data { id: number, title: string, startDate: date, endDate: date, memo: string, bgColor?: string }
   * @param {Function} callback 콜백 함수
   */
  insert (data, callback) {
    data.bgColor = generateRandomColor()
    const startDateToMs = getMsFromDate(getYYYYMMDD(data.startDate))
    const endDateToMs = getMsFromDate(getYYYYMMDD(data.endDate))

    if (data.title === '' || typeof data.title !== 'string') {
      window.alert('일정의 제목을 입력해주세요')
    } else if (endDateToMs < startDateToMs) {
      window.alert('시작일시는 종료일시보다 이전이어야 합니다')
    } else {
      data.period = endDateToMs - startDateToMs
      this.store.insert(data, () => {
        callback(this.type)
      })
    }
  }

  /**
   * 스토어에서 데이터 업데이트
   * @param {object} data { id: number, title: string, startDate: date, endDate: date, memo: string, bgColor?: string }
   * @param {Function} callback 콜백 함수
   */
  update (data, callback) {
    this.store.update(data, () => {
      callback(this.type)
    })
  }

  /**
   * 스토어에서 데이터 삭제
   * @param {number} id data id
   * @param {Function} callback 콜백 함수
   */
  remove (id, callback) {
    this.store.remove({ id }, () => {
      callback(this.type)
    })
  }

  /**
   * 오늘 달력으로 가는 함수
   * @param {Function} callback 콜백함수
   */
  getToday (callback) {
    this.get(this.type, callback)
  }

  /**
   * 조건에 따른 데이터 불러오기
   * @param {string} name name = type
   * @param {Function} callback 콜백 함수
   */
  get (name, callback) {
    this.start = moment().clone() // prev, next 에 사용하기 위함
    this.month = moment().clone()
    this.store.findAll((items) => {
      this.datas = items
    })

    if (name === 'month') {
      this.start.date(1)
      this.removeTime(this.start.day(0))
      this.buildMonthForMonth(this.start, this.month)

      callback(name, this.week)
    }

    if (name === 'week') {
      this.start.startOf('week')
      this.removeTime(this.start.day(0))
      this.buildWeekForWeek(this.start, this.month)

      callback(name, this.days)
    }

    if (name === 'day') {
      this.todayDate = moment().clone()
      const hours = this.buildHoursForWeek(this.todayDate)

      const hour = {
        today: this.todayDate,
        hours
      }

      callback(name, hour)
    }
  }

  /**
   * 이전 달력 상태 불러오기
   * @param {Function} callback 콜백 함수
   */
  prev (callback) {
    if (this.type === 'month') {
      const prev = this.month.clone()
      this.removeTime(prev.month(prev.month() - 1).date(1))
      this.month.month(this.month.month() - 1)
      this.buildMonthForMonth(prev, this.month)

      callback(this.type, this.week)
    } else if (this.type === 'week') {
      const prev = this.month.week(this.month.week() - 1)
      this.removeTime(prev.date(this.month.date()))
      this.buildWeekForWeek(prev, this.month)

      callback(this.type, this.days)
    } else if (this.type === 'day') {
      const prev = this.todayDate.day(this.todayDate.day() - 1)
      const hours = this.buildHoursForWeek(prev)

      const hour = {
        today: prev,
        hours
      }

      callback(this.type, hour)
    }
  }

  /**
   * 다음 달력 상태 불러오기
   * @param {Function} callback 콜백 함수
   */
  next (callback) {
    if (this.type === 'month') {
      const next = this.month.clone()
      this.removeTime(next.month(next.month() + 1).date(1))
      this.month.month(this.month.month() + 1)
      this.buildMonthForMonth(next, this.month)

      callback(this.type, this.week)
    } else if (this.type === 'week') {
      const next = this.month.week(this.month.week() + 1)
      this.removeTime(next.date(this.month.date()))
      this.buildWeekForWeek(next, this.month)

      callback(this.type, this.days)
    } else if (this.type === 'day') {
      const next = this.todayDate.day(this.todayDate.day() + 1)
      const hours = this.buildHoursForWeek(next)

      const hour = {
        today: next,
        hours
      }

      callback(this.type, hour)
    }
  }
}
