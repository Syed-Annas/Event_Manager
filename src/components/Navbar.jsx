import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { CalendarDays, LogOut, Ticket } from 'lucide-react';
export default function Navbar() {
  const user = useSelector(s => s.auth.currentUser);
  const dispatch = useDispatch(); const navigate = useNavigate();
  return <header className="navbar"><div className="container nav-inner">
    <Link to="/" className="brand"><span className="brand-icon"><Ticket size={21}/></span>evently<span className="brand-dot">.</span></Link>
    <nav className="nav-links"><NavLink to="/">Explore</NavLink>{user && <NavLink to="/my-events">My Events</NavLink>}</nav>
    <div className="nav-actions">{user ? <><span className="welcome">Hi, {user.name.split(' ')[0]}</span><button className="btn btn-outline btn-small" onClick={() => {dispatch(logout());navigate('/');}}><LogOut size={15}/> Logout</button></> : <><Link className="login-link" to="/login">Log in</Link><Link className="btn btn-primary btn-small" to="/register">Sign up</Link></>}</div>
  </div></header>;
}
