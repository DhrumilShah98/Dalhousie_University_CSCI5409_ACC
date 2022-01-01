import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TravelMemoryHome from "./component/TravelMemory/TravelMemoryHome/TravelMemoryHome";
import TravelMemoryPostDetails from "./component/TravelMemory/TravelMemoryPostDetails/TravelMemoryPostDetails";
import Login from "./component/TravelMemory/TravelMemoryUserManagement/Login";
import EmailVerification from "./component/TravelMemory/TravelMemoryUserManagement/EmailVerification";
import Registration from "./component/TravelMemory/TravelMemoryUserManagement/Registration";
import ResetPassword from "./component/TravelMemory/TravelMemoryUserManagement/ResetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/email-verification" element={<EmailVerification />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/post" element={<TravelMemoryHome />} />
          <Route exact path="/post/:id" element={<TravelMemoryPostDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;