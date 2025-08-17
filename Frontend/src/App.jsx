import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import ViewProfile from "./pages/ViewProfile";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/Createpost";
import MessageBox from "./pages/MessageBox";
import NotificationPanel from "./pages/NotificationPanel"; 
import Postjob from "./pages/create_job_post_form"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createprofile" element={<CreateProfile/>}/>
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/chat" element={<MessageBox />} />
        <Route path="/notifications" element={<NotificationPanel />} />
        <Route path="/jobpost" element={<Postjob />} />


      </Routes>
    </Router>
  );
}

export default App;
