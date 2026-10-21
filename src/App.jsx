import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import EventDetails from './pages/EventDetails';
import Auth from './pages/Auth';
import MyEvents from './pages/MyEvents';
import ProtectedRoute from './components/ProtectedRoute';
export default function App() {
  return <BrowserRouter><Navbar/><Routes>
    <Route path="/" element={<Explore/>}/>
    <Route path="/events/:id" element={<EventDetails/>}/>
    <Route path="/login" element={<Auth mode="login"/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route path="/my-events" element={<ProtectedRoute><MyEvents/></ProtectedRoute>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes><footer className="footer"><div className="container">© {new Date().getFullYear()} Evently · Built with React, Redux Toolkit & Ticketmaster Discovery API <span>Discover more. Experience more.</span></div></footer></BrowserRouter>;
}
