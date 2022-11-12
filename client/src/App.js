import './App.css';
import Signup from "./User/Signup";
import Login from "./User/Login";
import HomePage from "./User/HomePage";
import Profile from "./User/Profile";

import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/" element={<HomePage />}/>
      </Routes>
      </BrowserRouter>
       
      </div>
  ); 
}

export default App;
