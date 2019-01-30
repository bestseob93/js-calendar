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
      console.log(data)
      view += `<table>
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
      console.time()
      for (let i = 0; i < weeks.length; i++) {
        const days = data[i].days
        // const weekHtml = [] // 7개 html 스트링 (이벤트 div)
        // // 데이터를 들어가서
        view += '<tr>'

        for (let j = 0; j < days.length; j++) {
          const id = days[j].date.format('YYYY-MM-DD')
          const isSunday = (days[j].name === '일')
          const isSaturday = (days[j].name === '토')
          const day = days[j].number
          const isToday = days[j].isToday
          const isCurrentMonth = days[j].isCurrentMonth
          const events = days[j].hasEvents || []
          const eventsLength = events.length
          let hasEventsDays = ''
          for (let k = 0; k < eventsLength; k++) {
            if (k >= 3) {
              break
            }
            const eventStyle = `background-color:${events[k].bgColor};top:${(k + 1) * 28}px;`
            const isStartDay = events[k].startDate.split('T')[0] === days[j].date.format('YYYY-MM-DD')
            const isEndDay = events[k].endDate.split('T')[0] === days[j].date.format('YYYY-MM-DD')
            hasEventsDays += `
              <div
                class="calendar__event ${isStartDay ? 'calendar__event--start' : ''} ${isEndDay ? 'calendar__event--end' : ''}"
                data-event=${JSON.stringify(events[k])}
                style="${eventStyle}">
                  <span class="event__title">${isStartDay ? events[k].title : '&nbsp;'}</span>
              </div>`.trim()
          }

          const renderMore = eventsLength > 3 ? `<span class="more right" data-events=${JSON.stringify(events)}>+${eventsLength - 3} more</span>` : ''
          if (isToday) {
            view += `<td class="common__td current-month today${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${hasEventsDays}</td>`
          } else if (isCurrentMonth) {
            view += `<td class="common__td current-month${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${hasEventsDays}</td>`
          } else {
            view += `<td class="common__td" data-dateId=${id}><div>${day}${renderMore}</div>${hasEventsDays}</td>`
          }
        }

        view += '</tr>'
      }
      console.timeEnd()
      view += '</tbody></table>'
    } else if (data && mode === 'week') {
      const hasEventsDays = ['', '', '', '', '', '', '']
      for (let n = 0; n < 3; n++) {
        for (let i = 0; i < data.length; i++) {
          const a = data[i].hasEventsInWeek[n]
          if (a) {
            console.log(a)
            const eventStyle = `background-color:${a.bgColor};top:${(n + 1) * 28}px;`
            hasEventsDays[i] += `
              <div
                class="calendar__event"
                data-event=${JSON.stringify(a)}
                style="${eventStyle}">
                  <span class="event__title">${a.startDate.split('T')[0] === data[i].date.format('YYYY-MM-DD') ? a.title : '&nbsp;'}</span>
              </div>`.trim()
          }
        }
      }
      view += `
        <table>
          <thead class="table__head">
            <tr>
              <th rowspan="2"></th>`
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].hasEventsInWeek)
        const renderMore = data[i].hasEventsInWeek.length > 3 ? `<span class="more right">+${data[i].hasEventsInWeek.length - 3} more</span>` : ''
        const day = data[i].number
        view += `<th><div>${data[i].date.format('dd').substring(0, 2)}${day}${renderMore}</div></th>`
      }
      view += `<tr>`
      for (let i = 0; i < data.length; i++) {
        view += `<td class="common__td">${hasEventsDays[i]}</td>`
      }

      view += '</tr></thead>'
      console.log(hasEventsDays)
      view += '<tbody class="table__body">'

      for (let i = 0; i < 24; i++) {
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
        for (let j = 0; j < data.length; j++) {
          let hourHtml = ''
          let bgColor = ''
          const addTodayClass = data[j].isToday ? 'today' : ''
          for (let k = 0; k < data[j].hours[i].events.length; k++) {
            const currentHour = data[j].hours[i].number
            const schedule = data[j].hours[i].events[k]
            const eventsStartTime = schedule.startDate.split('T')[1]
            const startHour = parseInt(eventsStartTime.substring(0, 2), 10)
            bgColor = schedule.bgColor
            if (currentHour === startHour) {
              hourHtml += `<span class="text-white">(${eventsStartTime}) ${schedule.title}</span>`
            }
          }
          if (data[j].hours[i].events.length > 0) {
            view += `<td class="common__td ${addTodayClass}" style="background-color:${bgColor}; border:0;">${hourHtml}</td>`
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
        <table>
          <thead class="table__head">
          <tr>
            <th rowspan="2"></th>
            <th>${data.today.format('dd').substring(0, 2)} ${data.today.format('DD')}</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody class="table__body">`
      for (let i = 0; i < data.hours.length; i++) {
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
        let hourHtml = ''
        let bgColor = ''
        for (let j = 0; j < data.hours[i].events.length; j++) {
          const currentHour = i
          const schedule = data.hours[i].events[j]
          const eventsStartTime = schedule.startDate.split('T')[1]
          const startHour = parseInt(eventsStartTime.substring(0, 2), 10)
          bgColor = schedule.bgColor
          if (currentHour === startHour) {
            hourHtml += `<span class="text-white">(${eventsStartTime}) ${schedule.title}</span>`
          }
        }
        console.log(hourHtml)
        if (data.hours[i].events.length > 0) {
          view += `<td class="common__td" style="background-color:${bgColor}; border:0;">${hourHtml}</td>`
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
}
