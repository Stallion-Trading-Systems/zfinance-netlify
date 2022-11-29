import Admin from "./Containers/Admin/Admin"
import { BrowserRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";
import LandingPage from "./ZContainers/LandingPage/LandingPage.jsx";
import AddGrants from "./ZContainers/AddGrants/AddGrants.jsx";
import Portfolio from "./ZContainers/Portfolio/Portfolio.jsx";
import Report from "./ZContainers/Advisory/Report.jsx";
import Advisory from "./ZContainers/Advisory/Advisory.jsx";
import PortfolioMain from "./ZContainers/Portfolio/PortfolioMain.jsx";
import LandingPageHome from "./ZContainers/LandingPage/LandingPageHome.jsx";
import Signin from "./ZComponents/auth/Signin.jsx";
import Signup from "./ZComponents/auth/Signup.jsx";
import ResetPassword from "./ZComponents/auth/forgotpassword/ResetPassword.jsx";
import ForgotPassword from "./ZComponents/auth/forgotpassword/ForgotPassword.jsx";
import Zadvisory from "./ZContainers/Zadvisory/Zadvisory.jsx";
import Marketplace from "./ZContainers/Zadvisory/Marketplace.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandingPageHome />} />
          <Route exact path="/home" element={<LandingPage />} />
          <Route exact path="/addgrant" element={<AddGrants />} />
          <Route exact path="/signin" element={<Signin/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/portfolio" element={<Portfolio/>}/>
          <Route exact path="/portfolio/:type" element={<PortfolioMain/>}/>
          <Route exact path="/advisory/report" element={<Report/>}/>
          <Route exact path="/advisory/report/:period/:capital/:liquidity" element={<Report/>}/>
          <Route exact path="/advisory" element={<Advisory/>}/>
          <Route exact path="/zadvisory" element={<Zadvisory/>}/>
          <Route exact path="/marketplace" element={<Marketplace/>}/>
          <Route exact path="/auth/resetpassword/:email" element={<ResetPassword/>} />
          <Route exact path="/auth/forgotpassword" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
