import {
  getMsFromDate,
  getYYYYMMDD,
  gethhdd,
  getDayName,
  MS_OF_DAY
} from 'helpers'

export default class Template {
  constructor () {
    console.log('Template created')
  }

  /**
   * 데이터에 따른 html 출력
   * @param {string} mode 월간/주간/일간
   * @param {array} data 월의 배열
   */
  show (mode, data) {
    if (!data) {
      return
    }

    let view = ''
    if (data && mode === 'month') {
      view += `<table class="month-type">
      <thead class="table__head">
        <tr>
          <th class="days__header">일</th>
          <th class="days__header">월</th>
          <th class="days__header">화</th>
          <th class="days__header">수</th>
          <th class="days__header">목</th>
          <th class="days__header">금</th>
          <th class="days__header">토</th>
        </tr>
      </thead>
      <tbody class="table__body">`
      const weeks = [ ...data ]
      for (let i = 0; i < weeks.length; i += 1) {
        const days = data[i].days
        const weekHtml = ['', '', '', '', '', '', ''] // 7개 html 스트링 (이벤트 div)
        view += '<tr>'

        let remain = 0
        let remainEvent
        let renderCounts = [0, 0, 0, 0, 0, 0, 0]
        for (let n = 0; n < 3; n += 1) {
          for (let k = 0; k < days.length; k += 1) {
            const isSunday = days[k].name === '일'
            const dateForCompare = days[k].date.format('YYYY-MM-DD')

            if (remain === 0) {
              const startData = days[k].hasEvents.filter((data) => {
                if (isSunday) { return true }
                const isStartDay = getYYYYMMDD(data.startDate) === dateForCompare
                return isStartDay
              })[renderCounts[k]]

              if (startData) {
                const startYYYMMDD = getYYYYMMDD(startData.startDate)
                const endYYYYMMDD = getYYYYMMDD(startData.endDate)
                const startDate = getMsFromDate(startYYYMMDD)
                const endDate = getMsFromDate(endYYYYMMDD)
                const compareDate = getMsFromDate(dateForCompare)

                if (startDate !== compareDate) {
                  remain = ((endDate - compareDate) / (MS_OF_DAY)) + 1
                } else {
                  remain = (startData.period / (MS_OF_DAY)) + 1
                }
                remainEvent = startData
                renderCounts[k] += 1
              }
            }

            if (remain > 0) {
              if (remainEvent) {
                const eventStyle = `background-color:${remainEvent.bgColor};top:${(n + 1) * 28}px;`
                const isStartDay = getYYYYMMDD(remainEvent.startDate) === dateForCompare
                const isEndDay = getYYYYMMDD(remainEvent.endDate) === dateForCompare

                weekHtml[k] += `<div
                  class="calendar__event ${isStartDay ? 'calendar__event--start' : ''} ${isEndDay ? 'calendar__event--end' : ''}"
                  data-event=${JSON.stringify(remainEvent)}
                  style="${eventStyle}">
                    <span class="event__title">${isStartDay ? remainEvent.title : ' '}</span>
                </div>`.trim()
              }
              remain -= 1
            }
          }
          remain = 0
        }

        for (let j = 0; j < days.length; j += 1) {
          const id = days[j].date.format('YYYY-MM-DD')
          const isSunday = (days[j].name === '일')
          const isSaturday = (days[j].name === '토')
          const day = days[j].number
          const isToday = days[j].isToday

          const isCurrentMonth = days[j].isCurrentMonth
          const events = days[j].hasEvents || []
          const eventsLength = events.length

          const renderMore = (eventsLength > 3) ? `<span class="more right" data-events=${JSON.stringify(events)}>+${eventsLength - 3} more</span>` : ''
          if (isToday) {
            view += `
              <td
                class="common__td current-month today${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}"
                data-dateId=${id}>
                  <div>${day}${renderMore}</div>
                ${weekHtml[j]}
              </td>`
          } else if (isCurrentMonth) {
            view += `
              <td
                class="common__td current-month${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}"
                data-dateId=${id}>
                  <div>${day}${renderMore}</div>
                ${weekHtml[j]}
              </td>`
          } else {
            view += `
              <td
                class="common__td"
                data-dateId=${id}>
                  <div>${day}${renderMore}</div>
                ${weekHtml[j]}
              </td>`
          }
        }
      }

      view += '</tr>'
      view += '</tbody></table>'
    } else if (data && mode === 'week') {
      const weekHtml = ['', '', '', '', '', '', '']
      let remain = 0
      let remainEvent
      let renderCounts = [0, 0, 0, 0, 0, 0, 0]
      const days = [ ...data ]
      for (let n = 0; n < 3; n += 1) {
        for (let i = 0; i < days.length; i += 1) {
          const isSunday = getDayName(days[i].date.format('dd')) === '일'
          const dateForCompare = days[i].date.format('YYYY-MM-DD')

          if (remain === 0) {
            const startData = days[i].hasEventsInWeek.filter((data) => {
              if (isSunday) { return true }
              const isStartDay = getYYYYMMDD(data.startDate) === dateForCompare
              return isStartDay
            })[renderCounts[i]]

            if (startData) {
              const startYYYMMDD = getYYYYMMDD(startData.startDate)
              const endYYYYMMDD = getYYYYMMDD(startData.endDate)
              const startDate = getMsFromDate(startYYYMMDD)
              const endDate = getMsFromDate(endYYYYMMDD)
              const compareDate = getMsFromDate(dateForCompare)

              if (startDate !== compareDate) {
                remain = ((endDate - compareDate) / (MS_OF_DAY)) + 1
              } else {
                remain = (startData.period / (MS_OF_DAY)) + 1
              }
              remainEvent = startData
              renderCounts[i] += 1
            }
          }

          if (remain > 0) {
            if (remainEvent) {
              const eventStyle = `background-color:${remainEvent.bgColor};top:${(n + 1) * 28}px;`
              const isStartDay = getYYYYMMDD(remainEvent.startDate) === dateForCompare

              weekHtml[i] += `
                <div
                  class="calendar__event"
                  data-event=${JSON.stringify(remainEvent)}
                  style="${eventStyle}">
                    <span class="event__title">${isStartDay ? remainEvent.title : ' '}</span>
                </div>`.trim()
            }
            remain -= 1
          }
        }
        remain = 0
      }

      view += `
        <table class="week-type">
          <thead class="table__head">
            <tr>
              <th rowspan="2"></th>`
      for (let i = 0; i < data.length; i += 1) {
        const dateForCompare = getDayName(data[i].date.format('dd'))
        const isSunday = dateForCompare === '일'
        const isSaturday = dateForCompare === '토'
        const renderMore = (data[i].hasEventsInWeek.length > 3) ? `<span class="more right" data-events=${JSON.stringify(data[i].hasEventsInWeek)}>+${data[i].hasEventsInWeek.length - 3} more</span>` : ''
        console.log(renderMore)
        const day = data[i].number
        view += `
          <th
            class="${isSunday ? 'sun' : isSaturday ? 'sat' : ''} day">
            <div>${getDayName(data[i].date.format('dd'))} ${day}${renderMore}</div>
          </th>`
      }
      view += `<tr>`
      for (let i = 0; i < data.length; i += 1) {
        const addTodayClass = data[i].isToday ? 'today' : ''
        view += `<td class="common__td ${addTodayClass}">${weekHtml[i]}</td>`
      }

      view += '</tr></thead>'
      view += '<tbody class="table__body">'

      for (let i = 0; i < 24; i += 1) {
        view += '<tr>'
        let hour = 0
        if (i === 0) {
          hour = 12
        } else if (i > 12) {
          hour = i % 12
        } else {
          hour = i
        }
        view += `<td>${hour}시</td>`
        for (let j = 0; j < data.length; j += 1) {
          let hourHtml = ''
          let bgColor = ''
          const addTodayClass = data[j].isToday ? 'today' : ''
          const eventLength = data[j].hours[i].events.length
          let schedule
          for (let k = 0; k < eventLength; k += 1) {
            const currentHour = data[j].hours[i].number
            schedule = data[j].hours[i].events[k]
            const eventsStartTime = gethhdd(schedule.startDate)
            const startHour = parseInt(eventsStartTime.substring(0, 2), 10)

            bgColor = schedule.bgColor

            if (currentHour === startHour) {
              hourHtml += `<span class="text-white">(${eventsStartTime}) ${schedule.title}</span>`
            }
          }
          if (eventLength > 0) {
            view += `
              <td
                class="common__td calendar__event ${addTodayClass}"
                style="background-color:${bgColor}; border:0;"
                data-event=${JSON.stringify(schedule)}>
                  ${hourHtml}
              </td>`
          } else {
            view += `<td class="common__td ${addTodayClass}"></td>`
          }
        }
        view += '</tr>'
      }
      view += `</tbody>
      </table>`
    } else if (data && mode === 'day') {
      console.log(data)
      view += `
        <table class="day-type">
          <thead class="table__head">
          <tr>
            <th class="time-display" rowspan="2"></th>
            <th class="common__cd day">${getDayName(data.today.format('dd'))} ${data.today.format('DD')}</th>
          </tr>
          <tr>
            <th class="common__cd"> </th>
          </tr>
          </thead>
          <tbody class="table__body">`
      for (let i = 0; i < data.hours.length; i += 1) {
        view += '<tr>'
        let hour = 0
        if (i === 0) {
          hour = 12
        } else if (i > 12) {
          hour = i % 12
        } else {
          hour = i
        }
        view += `<td class="time-display">${hour}시</td>`
        let hourHtml = ''
        let bgColor = ''
        let schedule
        for (let j = 0; j < data.hours[i].events.length; j += 1) {
          const currentHour = i
          schedule = data.hours[i].events[j]
          const eventsStartTime = gethhdd(schedule.startDate)
          console.log(eventsStartTime)
          const startHour = parseInt(eventsStartTime.substring(0, 2), 10)
          bgColor = schedule.bgColor
          if (currentHour === startHour) {
            hourHtml += `<span class="text-white">(${eventsStartTime}) ${schedule.title}</span>`
          }
        }
        console.log(hourHtml)
        if (data.hours[i].events.length > 0) {
          console.log(schedule)
          view += `
            <td
              class="common__td calendar__event"
              style="background-color:${bgColor}; border:0;"
              data-event=${JSON.stringify(schedule)}>${hourHtml}</td>`
          console.log(view)
        } else {
          view += `<td class="common__td"></td>`
        }
        view += '</tr>'
      }
      view += '</tbody></table>'
    }

    return view
  }

  renderMoreList (data) {
    try {
      let view = ''
      view += '<ul>'
      console.log(data)
      for (let i = 0; i < data.length; i += 1) {
        const startDate = getYYYYMMDD(data[i].startDate)
        const endDate = getYYYYMMDD(data[i].endDate)
        if (startDate === endDate) {
          view += `
            <li
              class="list-circle"
              style="color:${data[i].bgColor};">
                <span>(${gethhdd(data[i].startDate)}) ${data[i].title}</span>
            </li>`
        } else {
          view += `
          <li class="list-square" style="color:${data[i].bgColor};">
            ${data[i].title}
          </li>`
        }
      }

      view += '</ul>'

      return view
    } catch (e) {
      if (e) return 'err'
    }
  }
}
