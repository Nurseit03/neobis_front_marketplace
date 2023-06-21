import '../css/cssreset.css';
import '../css/App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupCreatePassword from './pages/SignupCreatePassword';
import SignupConfirmPassword from './pages/SignupConfirmPassword';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import MyProducts from './pages/MyProducts';
import { Route, Routes, useLocation} from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/SignupCreatePassword" element={<SignupCreatePassword />}></Route>
        <Route path="/SignupConfirmPassword" element={<SignupConfirmPassword />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/MyProducts" element={<MyProducts />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;
