import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({nimi}) => (
    <div>{nimi}</div>
)
const Sisalto = (props) => {
    const osat = props.osat
    return (
    <div>
      <Osa nimi={osat[0].nimi} tehtavia={osat[0].tehtavia} />
      <Osa nimi={osat[1].nimi} tehtavia={osat[1].tehtavia} />
      <Osa nimi={osat[2].nimi} tehtavia={osat[2].tehtavia} />
    </div>
    )
}
const Yhteensa = (props) => {
    const summa = props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia;
    return (
        <div>yhteensä {summa} tehtävää</div>
    )
}
const Osa = (props) => (
    <div>{props.nimi} {props.tehtavia}</div>
)
const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
    {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    },
    {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    },
    {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }
    ]
  }
  return (
    <div>
      <Otsikko nimi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)