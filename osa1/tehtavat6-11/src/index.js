import React from 'react';
import ReactDOM from 'react-dom';


const Statistics = (props) => {
    const stat = props.stats
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
                <td><Button handleClick={props.handleClick('hyva')} nimi="hyvä"/> </td>
                <td><Button handleClick={props.handleClick('neutraali')} nimi="neutraali"/> </td>
                <td><Button handleClick={props.handleClick('huono')} nimi="huono"/> </td>
            </tr>
        </tbody>
    </table>
    )
}

const Button = (props) => (
    <div>
        <button onClick={props.handleClick}>
          {props.nimi}
        </button>
    </div> 

)

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
    kasvataYhdella = (kentta) => {
        return () => { 
            this.setState({ [kentta]: this.state[kentta] + 1 })
        }
    }
    render() {
        if(this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
            return (
                <div>
                    <Feedback handleClick={this.kasvataYhdella}/>
                    <h2>ei palautetta</h2>
                </div>
            )
        }
        return (
            <div>
                <Feedback handleClick={this.kasvataYhdella}/>
                <Statistics stats={this.state}/>
            </div>
        )
        }
  }

ReactDOM.render(<App />, document.getElementById('root'));

