import React from 'react';
import Plist from './components/Plist';
import ChatHistory from './components/ChatHistory';
import ChatHeader from './components/ChatHeader';
import Login from './components/auth/Login';
import api from './api.json'
import Alert from './components/Alert';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'light',
      API_URL: api.API_URL,
      isLoaded: false,
      logged_in: false,
      totalMgs: 0,
      messages: []
    };
  }
  
  componentDidMount() {
    if (this.state.logged_in !== false){
    setInterval(()=> { fetch(`${this.state.API_URL}/user/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://192.168.1.10:5000',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        username: this.state.username,
        context: this.state.person,
        cookie: this.state.cookie,
        api_key: api.API_KEY
      }),
      cache: 'default'
    })
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
    }, 2000);
    }
  }
  render() {

    const setstatev = (myname)=>{
      this.setState({
        name: myname
      })
    }

    const login = (user, pswd)=>{
      this.setState({
        username: user,
        password: pswd
      });
      let payload = {
          username: this.state.username,
          password: this.state.password,
          api_key: api.API_KEY
      }
      console.log(user)
      fetch(`${this.state.API_URL}/accounts/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "mode": "no-cors",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
        body: payload
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            logged_in: true,
            username: result.username,
            name: result.name,
            cookie: result.cookie
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

    const showAlert = (message, type)=>{
      this.setState({
        message: message,
        type: type
      });
  
      setTimeout(()=>{
        this.setState({
          message: null,
          type: null
        });
      }, 3000);
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

    if (this.state.logged_in){
      return(
    <div className="container">
      <Alert showAlert={showAlert}/>
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
    else {
      return(
        <>
      <Alert showAlert={showAlert} />
      <Login login={login}/>
      </>
      )
    }
  }
}

export default App;