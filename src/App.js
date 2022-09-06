import React from 'react';
import Cookies from 'universal-cookie';
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

    const cookies = new Cookies();

    this.setState({
      username: cookies.get('username'),
      //logged_in: cookies.get('logged_in'),
      cookie: cookies.get('token')
    })

    if (this.state.logged_in !== false){

      let payload = new FormData();
      payload.append('username', this.state.username)
      payload.append('api_key', api.API_KEY)
      payload.append('context', 'c')

    setInterval(()=> { fetch(`${this.state.API_URL}/user/messages`, {
      method: 'POST',
      mode : "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: payload,
      cache: 'default'
    })
      .then(response => response.json())
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

    const cookies = new Cookies();

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
    
      fetch(`${this.state.API_URL}/accounts/login`, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          "Authorization": api.API_KEY,
          "username": user,
          "password": pswd
        }
      })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.error){
            this.setState({
              logged_in: false,
              error: result.error
            });
          showAlert(result.error, "warning")  
          }
          else{
          this.setState({
            logged_in: true,
            username: result.username,
            name: result.name,
            cookie: result.cookie
          });
          
          cookies.set('username', String(result.username))
          cookies.set('logged_in', true)
          cookies.set('token', String(result.cookie))
        }
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

    const logout = ()=>{
      cookies.set('username', '')
      cookies.set('token', '')
      cookies.set('logged_in', false)

      this.setState({
        username: '',
        cookie: '',
        logged_in: false
      })
    }

    return(
    <>
    { this.state.logged_in !== false ? (
    <div className="container">
      <Alert showAlert={showAlert}/>
        <div className="row clearfix">
            <div className="col-lg-12 shadow-sm" >
                <div className="card chat-app shadow-lg" style={this.state.mode === 'light' ? {color: 'black', backgroundColor: 'white'} : {color: 'white', backgroundColor: '#212529', border: '1px white'}}>
                  <Plist mode={this.state.mode}/>
                  <div className="chat">
                    <ChatHeader toggleMode={toggleMode} logout={logout} mode={this.state.mode} name={this.state.name}/>
                    <ChatHistory mode={this.state.mode} messages={this.state.messages} isLoaded={this.state.isLoaded} totalMgs={this.state.totalMgs} error={this.state.error} setstatev={setstatev}/>
                  </div>
                </div>
            </div>
          </div>
    </div>
    ) : (
      <div>
      <Alert showAlert={showAlert} />
      <Login login={login}/>
      </div>
    )
    }
    </>
      )
  }
}

export default App;