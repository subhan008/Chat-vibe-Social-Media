import './App.css';
import Signup from "./Components/User/Signup";
import Login from "./Components/User/Login";
import HomePage from "./Components/User/HomePage/Feed";
import Profile from "./Components/User/Profile/Profile";
import Notification from "./Components/User/Notification";
import ChatPage from "./Components/User/Chat/Chat";
import EditProfile from "./Components/User/Profile/EditProfile";
import UserProfile from "./Components/User/UserProfile/profilePage";

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
          <Route path="/notification" element={<Notification />}/>
          <Route path="/inbox" element={<ChatPage />}/>
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/user-page" element={<UserProfile/>} />
        </Route>
      
      </Routes>
      </BrowserRouter>
       
      </div>
  ); 
}

export default App;
