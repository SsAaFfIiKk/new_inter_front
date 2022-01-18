import React, {Component} from 'react';
import { withRouter } from "react-router";
import {checkUser, getUserData} from './utils/checkUser';
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
        const authorId = query.get('author_id')
        const type = query.get('type')
        const token = query.get('token')

        if (authorId && type && token) {
            const isRegistered = await checkUser(authorId, type, token)
            this.setState({isRegistered: isRegistered})
            
            if (isRegistered) {
                localStorage.setItem('token', token)
                localStorage.setItem('id', authorId)
                getUserData(authorId, type)
            }
        }
    }

    render() {
        return this.state.isRegistered ? <Redirect to="/" /> : 'Для доступа к интервью необходима персонифицированная ссылка'
    }

}

export default withRouter(CheckUser);