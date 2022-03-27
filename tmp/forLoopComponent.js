import io from "socket.io-client";
const socket = io("http://localhost:420");

function Button(props) {
    const onClick = () =>{
        socket.emit('click');
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}

function Test() {
    let testArray = []

    for (let i = 0; i < 5; i++){
        testArray.push(<h1>Hello</h1>)
    }

    return testArray
}
  
function App() {
    return (
        <div>
            <Button />
            <Test />
        </div>
    )
}

export default App  ;
