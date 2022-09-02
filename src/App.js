import React, { Component } from 'react';
import pList from './components/pList';
import chatHeader from './components/chatHeader';
import chatCard from './components/chatCard';
import chatHistory from './components/chatHistory';

export default class App extends Component {
  render() {
    return (

          <chatCard>
          <pList/>
            <div className="chat">
              <chatHeader/>
              <chatHistory/> 
            </div>
          </chatCard>
    )
  }
}
