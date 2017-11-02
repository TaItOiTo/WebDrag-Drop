import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const arr = 1

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          カウントの実装テスト
        </p>
          <Counter init= {arr} />
          <p>
              DnDのテスト
          </p>
          <Container/>
      </div>
    );
  }
}

class Counter extends Component{
 constructor(props) {
     super(props);
     this.state = {
         count: this.props.init
     }
     this.countChange = this.countChange.bind(this);
 }

 countChange(e) {
     const num = Number(e.currentTarget.innerText);
     this.setState({
         count: this.state.count + num
     })
 }

 render() {
     return (
         <div className="Counter">
             <button onClick={this.countChange}>1</button>
             <p>{this.state.count}</p>
             <Name name="伊藤" />
             <button onClick={this.countChange}>-1</button>
         </div>
     );
 }
}
// propにはwidth=〇〇とかclass=〇〇のような値がはいる
const Name = props => <p style={{ color:'red' }}>{props.name}</p>;



export default DragDropContext(HTML5Backend)(App)
