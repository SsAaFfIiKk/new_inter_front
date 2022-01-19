import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Instructions from '../Instructions';

import "../css/style.css";

export default class InterIns extends Component {

    render() {
        return (
            <div className="container">
                <div className="info">
                    Здравствуйте, {localStorage.getItem("fio")}.
                    {Instructions.longInstruction()}
                    <div className="interviewButton buttonSmall">
                        <Link to="./inter">
                            <button>Начать интервью</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
