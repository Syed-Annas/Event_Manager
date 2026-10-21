import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login, register } from '../store/authSlice';
import { Ticket } from 'lucide-react';
export default function Auth({ mode }) {
  const dispatch = useDispatch();const navigate = useNavigate();const location = useLocation();
  const { currentUser, error } = useSelector(s=>s.auth);
  const [name,setName] = useState('');const [email,setEmail] = useState('');const [password,setPassword] = useState('');
  useEffect(()=>{dispatch(clearAuthError());},[mode,dispatch]);
  if(currentUser) return <Navigate to={location.state?.from || '/'} replace/>;
  const submit = e => {
    e.preventDefault();
    const action = mode==='register'?register({name,email,password}):login({email,password});
    dispatch(action);
    // Navigation follows Redux state update on the next render.
  };
  return <main className="auth-shell"><div className="auth-card"><Link className="auth-logo" to="/"><Ticket size={23}/> evently<span>.</span></Link>
    <span className="overline">{mode==='register'?'JOIN THE COMMUNITY':'WELCOME BACK'}</span><h1>{mode==='register'?'Create your account':'Good to see you again.'}</h1><p>{mode==='register'?'Your next great experience is one click away.':'Sign in to manage your experiences.'}</p>
    <form onSubmit={submit}>{mode==='register'&&<label>Full name<input required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Morgan"/></label>}
    <label>Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
    <label>Password<input type="password" minLength={mode==='register'?6:undefined} required autoComplete={mode==='register'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/></label>
    {error && <div className="form-error" role="alert">{error}</div>}
    <button className="btn btn-primary auth-submit" type="submit">{mode==='register'?'Create account':'Log in'}</button></form>
    <div className="auth-switch">{mode==='register'?'Already have an account?':'New to Evently?'} <Link to={mode==='register'?'/login':'/register'}>{mode==='register'?'Log in':'Create an account'}</Link></div>
    <div className="demo-note">Demo authentication only. Do not use a real password.</div>
  </div></main>;
}
