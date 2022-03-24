import io from "socket.io-client";
const socket = io("http://localhost:420");

function Form(props) {
    const onClick = () =>{
        socket.emit('message', "test");
        console.log("Works")
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}
  
function App() {
    //socket.emit('chat message', "test");
    console.log("ran")

    return (
        <div>
        <Form />
        </div>
    )
}

export default App;
