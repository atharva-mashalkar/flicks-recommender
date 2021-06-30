import React, { Component } from 'react'

class ClassCounter extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            input:""
        }
    }

    changeCounter = (value) => {
        this.setState(prevState => {
            return {
                count:prevState.count+value
            }
        });
    }

    componentDidMount(){

        document.title = `Counter value is ${this.state.count}`;
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.count !== this.state.count){
            console.log("Updating document title");
            document.title = `Counter value is ${this.state.count}`;
        }
    }


    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={e=>{
                        this.setState({ input: e.target.value })
                    }}
                    value={this.state.input}
                />
                Count: {this.state.count}
                <button onClick={()=>this.changeCounter(5)}>Increment by 5</button>
                <button onClick={()=>this.changeCounter(-5)}>Decrement by 5</button>
                <button 
                onClick={()=>this.setState({
                    count:0
                })}>Reset counter</button>
            </div>
        )
    }
}

export default ClassCounter
