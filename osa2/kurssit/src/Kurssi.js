import React from 'react';

const Kurssi = (props) => (
    <div>
        <Otsikko nimi={props.kurssi.nimi} />
        <Sisalto osat={props.kurssi.osat} />
        <Yhteensa osat={props.kurssi.osat} />
    </div>
)

const Otsikko = (props) => (
    <div>{props.nimi.toUpperCase()}</div>
)

const Sisalto = (props) => {
    const listaaOsat = props.osat.map(osa => <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} />)
    return (
        <div>
            {listaaOsat}
        </div>
    )
}

const Yhteensa = (props) => {
    const sum = props.osat.reduce((prev, curr) => prev + curr.tehtavia, 0)
    return (
        <div>yhteensä {sum} tehtävää</div>
    )
}

const Osa = (props) => (
    <div>{props.nimi} {props.tehtavia}</div>
)


export default Kurssi