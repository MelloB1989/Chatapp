import React, { Component } from 'react'

export class ChatHistory extends Component {
  render() {
    const { messages, isLoaded, error } = this.props;
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="container my-8"><img alt="Loading GIF" height="80px" width="150px"src={this.props.mode === 'light' ? 'https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif' : 'https://i.pinimg.com/originals/42/a8/d4/42a8d4625aeb088c45eba5a84ca36325.gif'}/></div>;
    }
    else{
    return (
        <>
        <div className="chat-history scroll" id="chat-history-box">
                    <ul className="m-b-0">
                    {messages.map((message) => {
              return <li className="clearfix" key={message.id}>
                        <div className={message.name === "kartik" ? "message-data text-right" : "message-data"}>
                            <span className="message-data-time" style={this.props.mode === 'light' ? {color: 'black'} : {color: 'white'}}>{message.timeStamp}</span>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                        </div>
                        <div className={message.name === "kartik" ? "message other-message float-right" : "message my-message"}> {message.message} </div>
                    </li>
            })}
            {/*  const cha = document.getElementById("chat-history-box");
  cha.scroll({top: cha.scrollHeight});*/}
                    </ul>
        </div>
        <div className="chat-message clearfix">
            <div className="input-group mb-0">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-send"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Enter text here..."/>                                    
            </div>
        </div>
        </>
    )
    }
  }
}
export default ChatHistory