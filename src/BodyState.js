export default class MonthState {
  constructor (container) {
    this.container = container
    this.value = `
      <div class="calendar__header">
        <div class="nav header__nav">
          <div class="header__date-today">2019-01-24</div>
          <button class="nav__button--prev"><span><</span></button>
          <button class="nav__button--next"><span>></span></button>
          <button class="nav__button--today"><span>오늘</span></button>
        </div>
        <div class="tab header__tab">
          <button class="header__tab-days" data-mode="Day">일간</button>
          <button class="header__tab-weeks" data-mode="Week">주간</button>
          <button class="header__tab-months" data-mode="Month">월간</button>
        </div>
        <button class="header__todo-button--add">일정 추가</button>
      </div>
      <div class="calendar__body">
        <table>
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
          <tbody class="table__body">
            <tr>
              <td>31</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
            </tr>
            <tr>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
            </tr>
            <tr>
              <td>21</td>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
            </tr>
            <tr>
              <td>28</td>
              <td>29</td>
              <td>30</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>`
    container.state = this
  }

  next (stateName) {
    const self = this
    if (stateName === 'Week') {
      return new WeekState(self.container)
    } else if (stateName === 'Day') {
      return new DayState(self.container)
    }
  }
}

class DayState {
  constructor (container) {
    this.container = container
    this.value = `
      <div class="calendar__header">
        <div class="nav header__nav">
          <div class="header__date-today">2019-01-24</div>
          <button class="nav__button--prev"><span><</span></button>
          <button class="nav__button--next"><span>></span></button>
          <button class="nav__button--today"><span>오늘</span></button>
        </div>
        <div class="tab header__tab">
          <button class="header__tab-days" data-mode="Day">일간</button>
          <button class="header__tab-weeks" data-mode="Week">주간</button>
          <button class="header__tab-months" data-mode="Month">월간</button>
        </div>
        <button class="header__todo-button--add">일정 추가</button>
      </div><div>day</div>`

    container.state = this
  }

  next (stateName) {
    const self = this
    if (stateName === 'Month') {
      return new MonthState(self.container)
    } else if (stateName === 'Week') {
      return new WeekState(self.container)
    }
  }
}

class WeekState {
  constructor (container) {
    this.container = container
    this.value = '<div>week</div>'

    container.state = this
  }

  next (stateName) {
    const self = this
    if (stateName === 'Month') {
      return new MonthState(self.container)
    } else if (stateName === 'Day') {
      return new DayState(self.container)
    }
  }
}
