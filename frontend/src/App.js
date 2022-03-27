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
            <th>Name</th>
            <th>Count</th>
        </tr>
    ]
    
    let id = 1
    for (let key in props.tableData){
        rows.push(
            <tr key={id.toString()}>
                <td>{key}</td>
                <td>{props.tableData[key]}</td>
            </tr>
        )
        id ++
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
        this.state = {tableData: {}};
    }
    
    componentDidMount() {
        socket.on('data', (data) => {
            this.setState({tableData: data})
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
