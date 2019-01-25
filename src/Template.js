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
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody class="table__body">`
      console.log(data)
      const weeks = data
      for (let i = 0; i < weeks.length; i++) {
        console.log(data[i].days)
        const days = data[i].days
        view += '<tr>'
        for (let j = 0; j < days.length; j++) {
          const isSunday = (days[j].name === '일')
          const isSaturday = (days[j].name === '토')
          const day = days[j].number
          const isToday = days[j].isToday
          const isCurrentMonth = days[j].isCurrentMonth

          if (isToday) {
            view += `<td class="${isSunday ? 'su' : ''} ${isSaturday ? 'sa' : ''} current-month today">${day}</td>`
          } else if (isCurrentMonth) {
            view += `<td class="${isSunday ? 'su' : ''} ${isSaturday ? 'sa' : ''} current-month">${day}</td>`
          } else {
            view += `<td>${day}</td>`
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
