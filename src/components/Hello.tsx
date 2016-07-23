import * as React from "react";
import ReactDOM = require('react-dom');

export interface HelloProps { 
    compiler: string; 
    framework: string; 
}

interface HelloState{
    red: String,
    blue: String,
    green: String
}

export class Hello extends React.Component<HelloProps, HelloState> {
    refs: {
        [key: string]: (Element),
        red: (HTMLInputElement),
        blue: (HTMLInputElement),
        green: (HTMLInputElement)
    }
    constructor(){
        super();
        this.state = {
            red: '0',
            blue: '0',
            green: '0'
        };
        this.update = this.update.bind(this);
    }
    update(e){
            this.setState({
                red: ReactDOM.findDOMNode<HTMLInputElement>(this.refs.red).value,
                blue: ReactDOM.findDOMNode<HTMLInputElement>(this.refs.blue).value,
                green: ReactDOM.findDOMNode<HTMLInputElement>(this.refs.green).value
            });
    }
    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Button>I <Heart /> React</Button>
                <Slider ref="red" update={this.update}/>
                {this.state.red}
                <br/>
                <Slider ref="blue" update={this.update}/>
                {this.state.blue}
                <br/>
                <Slider ref="green" update={this.update}/>
                {this.state.green}
                <br/>
            </div>
            );
    }
}

class Slider extends React.Component<{update:Function}, {}> {
    render(){
        return (
            <input 
                type="range"
                min="0"
                max="255"
                onChange={this.props.update} />
        );
    }
}

/**
 * Button
 */
class Button extends React.Component<{},{}>{
    render(){
        return (
            <button>{this.props.children}</button>
            );
    }
}

const Heart = () => <span className="glyphicon glyphicon-heart"></span>