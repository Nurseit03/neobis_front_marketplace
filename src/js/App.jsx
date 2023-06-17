import '../css/cssreset.css';
import '../css/App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupCreatePassword from './pages/SignupCreatePassword';
import { Route, Routes, useLocation} from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/SignupCreatePassword" element={<SignupCreatePassword />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;
