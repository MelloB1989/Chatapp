import React, { Component } from 'react'

export class Plist extends Component {
  render() {
    return (
    <div id="plist" className="people-list" style={this.props.mode === 'light' ? {color: 'black', backgroundColor: 'white'} : {color: 'white', backgroundColor: '#212529', border: '1px white'}}>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-search"></i></span>
            </div>
            <input type="text" className="form-control" placeholder="Search..."/>
        </div>
        <ul className="list-unstyled chat-list mt-2 mb-0">
            <li className="clearfix">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                <div className="about">
                    <div className="name">Vincent Porter</div>
                    <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                </div>
            </li>
            <li className="clearfix active" style={{color: 'black'}}>
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                <div className="about">
                    <div className="name">Aiden Chavez</div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                </div>
            </li>
            <li className="clearfix" style={{color: 'black'}}>
                <div className="about">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                </div>
            </li>
        </ul>
    </div>
    )
  }
}
export default Plist