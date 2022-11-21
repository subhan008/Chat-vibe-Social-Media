import './App.css';
import Signup from "./Components/User/Signup";
import Login from "./Components/User/Login";
import HomePage from "./Components/User/HomePage/HomePage";
import Profile from "./Components/User/Profile/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route element={ <PrivateRoute /> } > 
          <Route path="/" element={<HomePage />}/>
          <Route path="/profile" element={<Profile />}/>
         
        </Route>
      
      </Routes>
      </BrowserRouter>
       
      </div>
  ); 
}

export default App;
