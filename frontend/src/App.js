import io from "socket.io-client";
const socket = io("http://localhost:420");

function Button(props) {
    const onClick = () =>{
        socket.emit('click');
        console.log("Works")
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}
  
function App() {
    return (<Button />)
}

export default App;
