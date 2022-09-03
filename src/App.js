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

  componentDidMount() {
    this.setState({
      isLoaded: false,
      totalMgs: 0,
      messages: []
    });
    fetch(`https://raw.githubusercontent.com/MelloB1989/Chatapp/production/src/message.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            messages: result.messages,
            totalMgs: result.totalMgs
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    const setstatev = (myname)=>{
      this.setState({
        name: myname
      })
    }

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
                    <ChatHeader toggleMode={toggleMode} mode={this.state.mode} name={this.state.name}/>
                    <ChatHistory mode={this.state.mode} messages={this.state.messages} isLoaded={this.state.isLoaded} totalMgs={this.state.totalMgs} error={this.state.error} setstatev={setstatev}/>
                  </div>
                </div>
            </div>
          </div>
    </div>
    )
  }
}

export default App;