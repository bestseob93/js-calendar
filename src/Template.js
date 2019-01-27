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

          // 이벤트 가지고 있는 td 소리질러
          if (days[j].hasEvents.length > 0) {
            console.log(day)
          }

          if (isToday) {
            view += `<td class="current-month today${isSunday ? ' su' : ''}${isSaturday ? ' sa' : ''}" data-dateId=${id}>${day}</td>`
          } else if (isCurrentMonth) {
            view += `<td class="current-month${isSunday ? ' su' : ''}${isSaturday ? ' sa' : ''}" data-dateId=${id}>${day}</td>`
          } else {
            view += `<td data-dateId=${id}>${day}</td>`
          }
        }
        view += '</tr>'
      }
      view += '</tbody></table>'
    } else if (mode === 'week') {
      view = '<div>week</div>'
    } else if (mode === 'day') {
      view = '<div>day</div>'
    }

    return view
  }
}
