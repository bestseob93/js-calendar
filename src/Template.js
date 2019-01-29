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
    let view = ''
    if (data) {
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
      const weeks = data
      for (let i = 0; i < weeks.length; i++) {
        const days = data[i].days
        view += '<tr>'
        for (let j = 0; j < days.length; j++) {
          const id = days[j].date.format('YYYY-MM-DD')
          const isSunday = (days[j].name === '일')
          const isSaturday = (days[j].name === '토')
          const day = days[j].number
          const isToday = days[j].isToday
          const isCurrentMonth = days[j].isCurrentMonth

          const isStartDay = days[j].startEvents.length > 0

          // 이벤트 가지고 있는 td 소리질러
          let hasEventsDays = ''
          const events = days[j].hasEvents || []
          const eventsLength = events.length
          if (eventsLength > 0) {
            for (let k = 0; k < events.length; k++) {
              if (k >= 3) {
                break
              }
              const todoEvent = events[k]
              const eventStyle = `background-color:${todoEvent.bgColor};top:${(k + 1) * 28}px;`
              hasEventsDays += `
                <div
                  class="calendar__event"
                  data-event=${JSON.stringify(todoEvent)}
                  style="${eventStyle}">
                    <span class="event__title">${isStartDay ? todoEvent.title : '&nbsp;'}</span>
                </div>`
            }
          }

          const renderMore = eventsLength > 3 ? `<span style="float:right;">+${eventsLength - 3} more</span>` : ''

          if (isToday) {
            view += `<td class="common__td current-month today${isSunday ? ' su' : ''}${isSaturday ? ' sa' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${hasEventsDays}</td>`
          } else if (isCurrentMonth) {
            view += `<td class="common__td current-month${isSunday ? ' su' : ''}${isSaturday ? ' sa' : ''}" data-dateId=${id}>
            <div>${day}${renderMore}</div>${hasEventsDays}</td>`
          } else {
            view += `<td class="common__td" data-dateId=${id}><div>${day}${renderMore}</div>${hasEventsDays}</td>`
          }
        }
        view += '</tr>'
      }
      view += '</tbody></table>'
    } else if (mode === 'week') {
      view = `<table>
        <thead class="table__head">
          <tr>
            <th rowspan="2"></th>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr>
            <td>12시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>1시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>2시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>3시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>4시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>5시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>6시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>7시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>8시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>9시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>10시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>11시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>12시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>1시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>2시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>3시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>4시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>5시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>6시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>7시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>8시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>9시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>10시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
          <tr>
            <td>11시</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
            <td>1&nbsp;</td>
          </tr>
        </tbody>
      </table>`
    } else if (mode === 'day') {
      view = '<div>day</div>'
    }

    return view
  }
}
