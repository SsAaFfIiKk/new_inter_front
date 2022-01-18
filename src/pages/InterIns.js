import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Instructions from '../Instructions';

export default class InterIns extends Component {

    render() {
        return (
            <div className="info">
                Здравствуйте, {localStorage.getItem("fio")}.
                {Instructions.longInstruction()}
                <Link to="./inter"><button>Начать интервью</button></Link>
            </div>
        )
    }
}
