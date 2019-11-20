import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import '../../styles/home/signupform.scss';

export class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    render() {
        let disabled;
        this.props.nickname.length > 0 ? disabled = false : disabled = true;

        let error = false;
        let helperText= null;
        if (this.props.nickname.length > 20) {
            error = true;
            helperText = 'Nickname must be less than 20 characters long.';
            disabled=true;
        }

        return (
            <div className="signup">
                <TextField
                    className="textfield"
                    id="standard-basic"
                    label="My Nickname"
                    margin="normal"
                    error={error}
                    helperText={helperText}
                    onChange={this.handleChange}
                    value={this.props.nickname}
                />
                <Button
                    color="primary"
                    disabled={disabled}
                    onClick={this.handleSubmit}
                >
                    <strong>ENTER ></strong>
                </Button>
            </div>
        );
    }
}
