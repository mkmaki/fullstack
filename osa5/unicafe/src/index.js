import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import uniReducer from './reducer'

const store = createStore(uniReducer)

const Statistics = (props) => {
  const stat = props.stats
  if(stat.hyva === 0 && stat.neutraali === 0 && stat.huono === 0) {
    return (
      <h1>Ei palautetta</h1>
    )
  }
    const total = stat.hyva + stat.neutraali + stat.huono
    const avg = ((stat.hyva + stat.huono * -1) / total).toFixed(2)
    const pos = ((stat.hyva / total) * 100).toFixed(2) + " %"

    return (
        <table>
            <thead>
                <tr><th>Statistiikka</th></tr>
            </thead>
            <tbody>
                <Statistic title="hyva" stat={stat.hyva} />
                <Statistic title="neutraali" stat={stat.neutraali} />
                <Statistic title="huono" stat={stat.huono} />
                <Statistic title="keskiarvo" stat={avg} />
                <Statistic title="positiivisia" stat={pos} />
                <button onClick={e => store.dispatch({ type: 'RESET' })}>
                    Nollaa tilastot
                  </button>
            </tbody>
        </table>
    )
}

const Statistic = (props) => (
    <tr><td width="100">{props.title} </td><td> {props.stat}</td></tr>
)

const Feedback = (props) => {
    return (
        <table>
        <thead>
            <tr><th colSpan="2">Anna palautetta</th></tr>
        </thead>
        <tbody>
            <tr>
                <td>
                  <button onClick={e => store.dispatch({ type: 'HYVA' })}>
                    hyvä
                  </button>
                </td>
                <td>
                  <button onClick={e => store.dispatch({ type: 'NEUTRAALI' })}>
                    neutraali
                  </button>
                </td>
                <td>
                  <button onClick={e => store.dispatch({ type: 'HUONO' })}>
                    huono
                  </button>
                </td>
            </tr>
        </tbody>
    </table>
    )
}

class App extends React.Component {
  constructor() {
      super()
  }

  render() {
    return (
      <div>
        <Feedback />
        <Statistics stats={store.getState()}/>
      </div>
    )
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp)

export default App

