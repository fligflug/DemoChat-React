import React from 'react';
import Grid from '@material-ui/core/Grid';
import {SignUpForm} from "../../components/home/SignUpForm";
import { history } from "../../index.js";

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          nickname: ''
        };
        this.changeNickname = this.changeNickname.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeNickname(nextNickname) {
        this.setState({
            nickname: nextNickname
        });
    }

    submit() {
        window.localStorage.setItem('nickname', this.state.nickname);
        history.push('/chat');
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <h1>Demo Chat <span role="img" aria-label="Smiling Cat With Heart-Eyes">😻</span></h1>
                <i>Choose a nickname and start sending messages</i>
                <SignUpForm
                    nickname={this.state.nickname}
                    onChange={this.changeNickname}
                    onSubmit={this.submit}
                />
            </Grid>
        );
    }
}
