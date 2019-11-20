import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {Message} from "../../components/chat/Message";
import '../../styles/chat/chatbody.scss';

export class ChatBody extends React.Component {

    render() {
        let messages;

        if(this.props.messages.length === 0) {
            messages =  <CircularProgress />;
        } else {
            messages = this.props.messages.map((message, index) => {
                 return (
                    <Message
                        nickname={message.pseudonym}
                        text={message.message}
                        key={index}
                    />
                );
            })
        }

        return(
            <div className="chat-body-container" id="chat-body-container">
                {messages}
            </div>
        );
    }
}
