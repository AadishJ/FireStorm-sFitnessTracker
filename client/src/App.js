import React from 'react';
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { Route, Routes, BrowserRouter as Router, useNavigate } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import Faq from "./Pages/Faq/Faq";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RefreshHandler from "./RouteHandler/RefreshHandler";
import Workout from "./Pages/Workout/Workout";
import PrivateRoute from './RouteHandler/PrivateRoute';
import Footer from './Pages/Footer/Footer';
import LoginDark from './Pages/Login/LoginDark';
import SignupDark from './Pages/Signup/SignupDark';
import DashboardLayout from './Layouts/DashboardLayout';
import WorkoutName from './Pages/WorkoutName/WorkoutName';
import Yoga from './Pages/Yoga/Yoga';
import YogaName from './Pages/YogaName/YogaName';
import Cardio from './Pages/Cardio/Cardio';
import CardioName from './Pages/CardioName/CardioName';
import Profile from './Pages/Profile/Profile';
import Diet from './Pages/Diet/Diet';
import DietName from './Pages/DietName/DietName';
import Error404 from './Pages/Error404/Error404';
import Schedule from './Pages/Schedule/Schedule';
import ScrollToTop from './RouteHandler/ScrollToTop';
import Loading from './Pages/Loading/Loading';
import { LoadingProvider } from './Context/LoadingContext';

function App ()
{
  const navigate = useNavigate();
  return (
    <AuthProvider navigate={navigate}>
      <RefreshHandler />
      <Navbar />
      <Loading/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignupDark />} />
        <Route path="/login" element={<LoginDark />} />
        <Route path="/faq" element={ <Faq /> } />
        <Route path="*" element={<Error404/>} />

        <Route element={<PrivateRoute element={<DashboardLayout />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/yoga" element={ <Yoga /> } />
          <Route path="/cardio" element={ <Cardio /> } />
          <Route path="/diet" element={ <Diet /> } />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/workout/name" element={ <WorkoutName /> } />
          <Route path="/yoga/name" element={ <YogaName /> } />
          <Route path="/cardio/name" element={ <CardioName /> } />
          <Route path="/diet/name" element={ <DietName /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
        
      </Routes>
      <Footer />
      </AuthProvider>
  );
}
const Root = () => (
  <Router>
    <LoadingProvider>
    <ScrollToTop/>
    <App />
    </LoadingProvider>
  </Router>
);

export default Root;
