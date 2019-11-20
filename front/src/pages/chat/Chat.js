import React from 'react';
import axios from 'axios';
import {ChatBody} from "../../components/chat/ChatBody";
import {ChatForm} from "../../components/chat/ChatForm";
import {ThumbsUp} from "../../components/chat/ThumbsUp";
import '../../styles/chat/chat.scss';

export class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          nickname: window.localStorage.getItem('nickname'),
          messages: [],
          nextMessage: '',
          thumbsUp: 0
        };
        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.thumbsUp = this.thumbsUp.bind(this);
    }

    componentDidMount() {
        axios.get('http://demochat.local:80/')
        .then((response) => {
            this.setState({
               messages: JSON.parse(response.data)
            });
            this.scrollBottom();
        })
        .catch((error) => {
            alert(error);
        });

        const url = new URL('http://demochat.local:3000/hub');
        url.searchParams.append('topic', 'http://demochat.local:80/');
        url.searchParams.append('topic', 'http://demochat.local:80/ping');
        const eventSource = new EventSource(url);
        eventSource.onmessage = e => {
            // Will be called every time an update is published by the server
            let origin = JSON.parse(e.data);
            if(origin.data === 'ping'){
                this.setState({
                    thumbsUp: this.state.thumbsUp + 1
                });
                window.setTimeout(() => {
                    this.setState({
                        thumbsUp: this.state.thumbsUp - 1
                    });
                }, 10000);
            }else{
                this.setState({
                    nextMessage: '',
                    messages: this.state.messages.concat(JSON.parse(e.data))
                });
                this.scrollBottom();
            }
        }
    }

    changeMessage(nextMessage) {
        this.setState({
            nextMessage: nextMessage
        });
    }

    sendMessage() {
        this.setState({
            nextMessage: ''
        });
        axios.post('http://demochat.local:80/', {
            pseudonym: this.state.nickname,
            message: this.state.nextMessage
        })
        .catch((error) => {
            alert(error);
        });
    }

    thumbsUp() {
        axios.post('http://demochat.local:80/ping')
        .catch((error) => {
            alert(error);
        });
    }

    scrollBottom() {
        let container = document.getElementById("chat-body-container");
        container.scrollTop = container.scrollHeight;
    }

    render() {
        let thumbsUp = [];
        for(let iterator=0 ; iterator < this.state.thumbsUp ; iterator++) {
            thumbsUp.push(<ThumbsUp key={iterator}/>);
        }

        return (
            <div className="chat-container">
                <ChatBody
                    messages={this.state.messages}
                />
                <ChatForm
                    nickname={this.state.nickname}
                    message={this.state.nextMessage}
                    onChange={this.changeMessage}
                    onMessage={this.sendMessage}
                    onThumbsUp={this.thumbsUp}
                />
                {thumbsUp}
            </div>
        );
    }
}
