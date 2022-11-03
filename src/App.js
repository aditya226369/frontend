import { Route, Routes  } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Roughslate from './Components/Roughslate/Roughslate';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/LoginPortal/Login';
import Register from './Components/LoginPortal/Register';
import Error from './Components/Error';
import './App.css';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roughslate" element={<Roughslate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        </div>
  );
}

export default App;
