import '../css/cssreset.css';
import '../css/App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes, useLocation} from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;
