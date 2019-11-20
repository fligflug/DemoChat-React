import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Fab from "@material-ui/core/Fab/Fab";
import SendIcon from '@material-ui/icons/Send';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import '../../styles/chat/chatform.scss';

export class ChatForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    handleKeyDown(e) {
        if(e.keyCode === 13 && e.metaKey) {
            this.props.onMessage();
        }
    }

    handleMessage() {
        this.props.onMessage();
    }

    handleThumbsUp() {
        this.props.onThumbsUp();
    }

    render() {
        let disabled;
        this.props.message.length > 0 ? disabled = false : disabled = true;

        let error = false;
        let helperText= null;
        if (this.props.message.length > 500) {
            error = true;
            helperText = 'Nickname must be less than 500 characters long.';
            disabled=true;
        } else {
            helperText= "Press CMD + Enter to send your message.";
        }

        const label = 'Wath\'s up ' + this.props.nickname + '?';

        return (
            <div className="chat-form-container">
                <TextField
                    id="standard-multiline-static"
                    label={label}
                    multiline
                    rows="4"
                    placeholder="Send a new message..."
                    className="textfield"
                    margin="normal"
                    error={error}
                    helperText={helperText}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    value={this.props.message}
                />
                <div className="actions-container">
                    <Fab
                        className="button create-action"
                        aria-label="create"
                        disabled={disabled}
                        onClick={this.handleMessage}
                    >
                        <SendIcon />
                    </Fab>
                    <Fab
                        className="button thumb-up-action"
                        aria-label="create"
                        onClick={this.handleThumbsUp}
                    >
                        <ThumbUpIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}
