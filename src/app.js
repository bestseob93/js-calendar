import Store from 'store'

const store = new Store('js-calendar')
console.log(store)

window.onload = () => {
  const calendar = document.getElementById('js-calendar')
  console.log(calendar)
  // calendar.appendChild(header)
  // calendar.appendChild(main)
}
