import React, { Component } from 'react';
import './App.css';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends Component {
    render() {
        return (
            <div className="App">
                {arr.map( item => <Counter init={item} /> )}
            </div>
        );
    }
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.init
        }
        this.countChange = this.countChange.bind(this);
    }

    countChange(e) {
        const num = Number( e.currentTarget.innerText );
        this.setState({
            count: this.state.count + num
        })
    }

    render() {
        return (
            <div className="Counter">
                <button onClick={this.countChange}>1</button>
                <p>{this.state.count}</p>
                <Name name="尾崎" />
                <button onClick={this.countChange}>-1</button>
            </div>
        );
    }
}

const Name = props => <p style={{ color:'red' }}>{props.name}</p>;

export default App;
