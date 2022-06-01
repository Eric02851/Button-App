import React from 'react'
import io from "socket.io-client"

const splitUrl = window.location.href.split(':')
const socket = io(`${splitUrl[0]}:${splitUrl[1]}`)
//socket.on('data', (data) => {console.log(data)})

function ClickButton() {
    const onClick = () => {
        socket.emit('click')
    }

    return (<button type="button" onClick={onClick}>Click Here</button>)
}

function Table(props) {
    let rows = [
        <tr key="0">
            <th>ID</th>
            <th>Count</th>
        </tr>
    ]

    for (let i = 0; i < props.tableData.length; i++) {
        rows.push(
            <tr key={String(i + 1)}>
                <td>{props.tableData[i][2]}</td>
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
        this.state = { tableData: [] };
    }

    componentDidMount() {
        socket.on('data', (data) => {
            if (JSON.stringify(data) !== JSON.stringify(this.state.tableData)) {
                this.setState({ tableData: data })
                console.log("updated")
            }
        })
    }

    render() {
        return (<Table tableData={this.state.tableData} />)
    }
}

class IdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        socket.emit('idUpdate', this.state.value)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" placeholder="Enter ID < 39 Chars" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

function App() {
    return (
        <div>
            <ClickButton />
            <IdForm />
            <LiveTable />
        </div>
    )
}

export default App
