import React, { Component } from 'react'

export class ChatHeader extends Component {
  render() {
    return (
        <div className="chat-header clearfix">
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="/" data-toggle="modal" data-target="#view_info">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                            </a>
                            <div className="chat-about">
                                <h6 className="m-b-0">{this.props.name}</h6>
                                <small>Last seen: 2 hours ago</small>
                            </div>
                        </div>
                        <div className="col-lg-6 hidden-sm text-right">
                            <a href="/" className="btn btn-outline-secondary mx-1"><i className="fa fa-camera"></i></a>
                            <a href="/" className="btn btn-outline-primary mx-1"><i className="fa fa-image"></i></a>
                            <a href="/" className="btn btn-outline-info mx-1"><i className="fa fa-cogs"></i></a>
                            <a href="/" className="btn btn-outline-warning mx-1"><i className="fa fa-question"></i></a>
                            <button className="btn btn-outline-primary mx-1" onClick={this.props.toggleMode}><img src="https://img.icons8.com/external-dashed-line-kawalan-studio/48/000000/external-dark-mode-user-interface-dashed-line-kawalan-studio.png" alt="dark mode"/></button>
                        </div>
                    </div>
        </div>
    )
  }
}
export default ChatHeader