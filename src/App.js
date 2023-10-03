
import { ChatEngine } from 'react-chat-engine';
import Login from './components/Login';
import './App.css';

function App() {
  if (!localStorage.getItem('username')) {
    return <Login />;
  }

  return (
    <ChatEngine
      height="95vh"
      projectID="4ddd21de-9c21-4d15-a7c3-658cdfe6720e"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
    />
  );
}

export default App;
