import '../css/cssreset.css';
import '../css/App.css';
import Login from './pages/Login';
import { Route, Routes, useLocation} from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;
