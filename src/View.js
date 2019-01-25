export default class View {
  constructor (template) {
    console.log('view created')
    this.template = template
  }

  // render (viewCmd, parameter) {
  //   const viewCommands = {
  //     renderMonth: () => {
  //       this.renderMonth()
  //     },
  //     renderWeek: () => {
  //       this.renderWeek()
  //     },
  //     renderDay: () => {
  //       this.renderDay()
  //     }
  //   }

  //   viewCommands[viewCmd]()
  // }
}
