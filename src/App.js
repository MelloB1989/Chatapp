import React from 'react';
import Plist from './components/Plist';
import ChatHistory from './components/ChatHistory';
import ChatHeader from './components/ChatHeader';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'light'
    };
  }

  render() {

    const toggleMode = ()=>{
      //console.log(this.state.mode)
      if (this.state.mode === 'light'){
        //setMode('dark');
        this.setState({ mode: 'dark' })
        document.body.style.backgroundColor = '#212529';
      }
      else {
        //setMode('light');
        this.setState({ mode: 'light' })
        document.body.style.backgroundColor = 'white';
      }
    };

    return (
    <div className="container">
        <div className="row clearfix">
            <div className="col-lg-12 shadow-sm" >
                <div className="card chat-app shadow-lg" style={this.state.mode === 'light' ? {color: 'black', backgroundColor: 'white'} : {color: 'white', backgroundColor: '#212529', border: '1px white'}}>
                  <Plist mode={this.state.mode}/>
                  <div className="chat">
                    <ChatHeader toggleMode={toggleMode} mode={this.state.mode}/>
                    <ChatHistory mode={this.state.mode}/>
                  </div>
                </div>
            </div>
          </div>
    </div>
    )
  }
}

export default App;