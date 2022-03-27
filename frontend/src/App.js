import io from "socket.io-client";
const socket = io("http://localhost:420");

function Button(props) {
    const onClick = () =>{
        socket.emit('click');
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}

function Table() {
    let data = {
        Eric: 5,
        Sydney: 52,
        Gio: 104
    }
    
    let rows = [
        <tr key="0">
            <th>Name</th>
            <th>Count</th>
        </tr>
    ]
    
    let id = 1
    for (let key in data){
        rows.push(
            <tr key={id.toString()}>
                <td>{key}</td>
                <td>{data[key]}</td>
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
  
function App() {
    return (
        <div>
            <Button />
            
            <Table />
        </div>
    )
}

export default App  ;
