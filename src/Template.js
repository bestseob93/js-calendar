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
      for (let i = 0; i < weeks.length; i += 1) {
        const days = data[i].days
        const weekHtml = ['', '', '', '', '', '', ''] // 7개 html 스트링 (이벤트 div)
        view += '<tr>'

        let remain = 0
        let remainEvent
        let renderCount = [0, 0, 0, 0, 0, 0, 0]
        for (let n = 0; n < 3; n += 1) {
          for (let k = 0; k < days.length; k += 1) {
            console.log('remain', remain)
            console.log('k', k)
            const isSunday = days[k].name === '일'
            if (remain === 0) {
              const startData = days[k].hasEvents.filter((data) => {
                if (isSunday) {
                  return true
                }
                const isStartDay = data.startDate.split('T')[0] === days[k].date.format('YYYY-MM-DD')

                return isStartDay
              })[renderCount[k]]
              if (startData) {
                const startDate = new Date(startData.startDate.split('T')[0]).getTime()
                const endDate = new Date(startData.endDate.split('T')[0]).getTime()
                const compareDate = new Date(days[k].date.format('YYYY-MM-DD')).getTime()
                if (startDate !== compareDate) {
                  remain = ((endDate - compareDate) / (60 * 60 * 24000)) + 1
                } else {
                  remain = (startData.period / (60 * 60 * 24000)) + 1
                }
                remainEvent = startData
                renderCount[k] += 1
                // startDatas[0].period = 3
              }
            }

            if (remain > 0) {
              if (remainEvent) {
                const eventStyle = `background-color:${remainEvent.bgColor};top:${(n + 1) * 28}px;`
                const isStartDay = remainEvent.startDate.split('T')[0] === days[k].date.format('YYYY-MM-DD')
                const isEndDay = remainEvent.endDate.split('T')[0] === days[k].date.format('YYYY-MM-DD')
                weekHtml[k] += `<div
                  class="calendar__event ${isStartDay ? 'calendar__event--start' : ''} ${isEndDay ? 'calendar__event--end' : ''}"
                  data-event=${JSON.stringify(remainEvent)}
                  style="${eventStyle}">
                    <span class="event__title">${isStartDay ? remainEvent.title : '&nbsp;'}</span>
                </div>`.trim()
                console.log(renderCount)
                console.log(weekHtml)
              }
              remain--
            }
          }
          remain = 0
        }
        console.log(weekHtml)
        for (let j = 0; j < days.length; j += 1) {
          const id = days[j].date.format('YYYY-MM-DD')
          const isSunday = (days[j].name === '일')
          const isSaturday = (days[j].name === '토')
          const day = days[j].number
          const isToday = days[j].isToday

          const isCurrentMonth = days[j].isCurrentMonth
          const events = days[j].hasEvents || []
          const eventsLength = events.length

          const renderMore = eventsLength > 3 ? `<span class="more right" data-events=${JSON.stringify(events)}>+${eventsLength - 3} more</span>` : ''
          if (isToday) {
            view += `<td class="common__td current-month today${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${weekHtml[j]}</td>`
          } else if (isCurrentMonth) {
            view += `<td class="common__td current-month${isSunday ? ' sun' : ''}${isSaturday ? ' sat' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${weekHtml[j]}</td>`
          } else {
            view += `<td class="common__td" data-dateId=${id}><div>${day}${renderMore}</div>${weekHtml[j]}</td>`
          }
        }
      }

      view += '</tr>'
      console.timeEnd()
      view += '</tbody></table>'
    } else if (data && mode === 'week') {
      const hasEventsDays = ['', '', '', '', '', '', '']
      for (let n = 0; n < 3; n += 1) {
        for (let i = 0; i < data.length; i += 1) {
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
      for (let i = 0; i < data.length; i += 1) {
        console.log(data[i].hasEventsInWeek)
        const renderMore = data[i].hasEventsInWeek.length > 3 ? `<span class="more right">+${data[i].hasEventsInWeek.length - 3} more</span>` : ''
        const day = data[i].number
        view += `<th><div>${data[i].date.format('dd').substring(0, 2)}${day}${renderMore}</div></th>`
      }
      view += `<tr>`
      for (let i = 0; i < data.length; i += 1) {
        view += `<td class="common__td">${hasEventsDays[i]}</td>`
      }

      view += '</tr></thead>'
      console.log(hasEventsDays)
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
          for (let k = 0; k < data[j].hours[i].events.length; k += 1) {
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
        view += `<td>${hour}시</td>`
        let hourHtml = ''
        let bgColor = ''
        for (let j = 0; j < data.hours[i].events.length; j += 1) {
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

  renderMoreList (data) {
    try {
      let view = ''
      view += '<ul>'
      console.log(data)
      for (let i = 0; i < data.length; i += 1) {
        console.log(data[i].startDate.split('T')[0])
        console.log(data[i].endDate.split('T')[0])
        if (data[i].startDate.split('T')[0] === data[i].endDate.split('T')[0]) {
          view += `<li class="list-circle" style="color:${data[i].bgColor};"><span>(${data[i].startDate.split('T')[1]}) ${data[i].title}</span></li>`
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
