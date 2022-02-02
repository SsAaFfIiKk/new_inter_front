import React, { Component } from 'react';
import { withRouter } from "react-router";
import { checkUser, getUserData } from './utils/checkUser';
import { Redirect } from 'react-router';

class CheckUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false
        }
    }

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const isuId = query.get('isu_id')
        const token = query.get('token')

        if (isuId && token) {
            this.setState({ data_ok: true })
            const isRegistered = await checkUser(isuId, token)
            
            if (isRegistered) {
                localStorage.setItem('token', token)
                localStorage.setItem('id', isuId)
                await getUserData(isuId)
                this.setState({ isRegistered: isRegistered })
            }
        }
    }

    render() {
        return this.state.isRegistered ? <Redirect to="/" /> : 'Для доступа к интервью необходима персонифицированная ссылка'
    }

}

export default withRouter(CheckUser);