import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { cancelRegistration } from '../store/registrationsSlice';
import { isUpcoming } from '../lib/events';
import { CalendarCheck2 } from 'lucide-react';
export default function MyEvents() {
  const dispatch=useDispatch();const user=useSelector(s=>s.auth.currentUser);
  const registrations=useSelector(s=>s.registrations.entries.filter(r=>r.userId===user.id));
  const [tab,setTab]=useState('upcoming');
  const filtered=registrations.filter(r=>isUpcoming(r.event)===(tab==='upcoming'));
  return <main className="container section my-events"><span className="overline">YOUR EXPERIENCES</span><h1>My Events</h1><p>All your plans, all in one place.</p>
    <div className="tabs"><button className={tab==='upcoming'?'active':''} onClick={()=>setTab('upcoming')}>Upcoming ({registrations.filter(r=>isUpcoming(r.event)).length})</button><button className={tab==='completed'?'active':''} onClick={()=>setTab('completed')}>Completed ({registrations.filter(r=>!isUpcoming(r.event)).length})</button></div>
    {filtered.length ? <div className="event-grid">{filtered.map(r=><div className="registered-item" key={r.event.id}><EventCard event={r.event}/>{tab==='upcoming'&&<button className="cancel-link" onClick={()=>dispatch(cancelRegistration({userId:user.id,eventId:r.event.id}))}>Cancel registration</button>}</div>)}</div> : <div className="empty-state"><CalendarCheck2 size={40}/><h2>No {tab} events yet</h2><p>Find an experience worth remembering.</p><Link className="btn btn-primary" to="/">Explore events</Link></div>}
  </main>;
}
