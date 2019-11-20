import React from 'react';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import '../../styles/chat/message.scss';

export class Message extends React.Component {

    render() {
           return (
               <Card className="message">
                   <CardContent>
                       <strong>
                           {this.props.nickname} :
                       </strong>
                       <br/>
                       <br/>
                       {this.props.text}
                   </CardContent>
               </Card>
           );
    }
}
