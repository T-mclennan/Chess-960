import React from "react";

const SocketContext = React.createContext();

export default SocketContext;

// TODO:
// Portion to go in Lobby:
// Pass socket into all underlying components:

// import SocketContext from './socket-context'
// import * as io from 'socket.io-client'

// const socket = io()

// const App = props => (
//   <SocketContext.Provider value={socket}>
//     <YourChildComponent />
//   </SocketContext.Provider>
// )

//https://itnext.io/how-to-use-a-single-instance-of-socket-io-in-your-react-app-6a4465dcb398
