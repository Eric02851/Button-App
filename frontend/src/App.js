import React from 'react'
import io from "socket.io-client"
const socket = io("http://localhost:420")
//socket.on('data', (data) => {console.log(data)})

function Button() {
    const onClick = () =>{
        socket.emit('click')
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}

function Table(props) {
    let rows = [
        <tr key="0">
            <th>IPV6</th>
            <th>Count</th>
        </tr>
    ]

    for (let i = 0; i < props.tableData.length; i++){
        rows.push(
            <tr key={String(i+1)}>
                <td>{props.tableData[i][0]}</td>
                <td>{props.tableData[i][1]}</td>
            </tr>
        )
    }

    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

class LiveTable extends React.Component {
    constructor(props) {
        //try awaiting socket.on('data', (data) => {console.log(data)})
        super(props);
        this.state = {tableData: []};
    }

    componentDidMount() {
        socket.on('data', (data) => {
            if (JSON.stringify(data) != JSON.stringify(this.state.tableData)){
                this.setState({tableData: data})
                console.log("updated")
            }
        })
      }

    render() {
        return (<Table tableData={this.state.tableData} />)
    }
  }

function App() {
    return (
        <div>
            <Button />
            <LiveTable />
        </div>
    )
}

export default App
