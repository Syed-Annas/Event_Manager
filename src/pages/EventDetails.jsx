import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../store/eventsSlice';
import { addRegistration, cancelRegistration } from '../store/registrationsSlice';
import { eventImage, eventDate, eventCategory, eventLocation, eventVenue, formatDate, isUpcoming, snapshot } from '../lib/events';
import { ArrowLeft, CalendarDays, MapPin, Ticket, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
export default function EventDetails() {
  const { id } = useParams(); const dispatch = useDispatch(); const navigate = useNavigate();
  const { selected: event, detailLoading, detailError } = useSelector(s=>s.events);
  const user = useSelector(s=>s.auth.currentUser);
  const registered = useSelector(s=>s.registrations.entries.some(r=>r.userId===user?.id && r.event.id===id));
  const [notice,setNotice] = useState('');
  useEffect(()=>{setNotice('');dispatch(fetchEventById(id));},[id,dispatch]);
  const register = () => {
    if (!user) { navigate('/login',{state:{from:`/events/${id}`}}); return; }
    if (!event || !isUpcoming(event)) return;
    dispatch(addRegistration({userId:user.id,event:snapshot(event)}));setNotice('You are registered! Find this event in My Events.');
  };
  const cancel = () => {dispatch(cancelRegistration({userId:user.id,eventId:id}));setNotice('Your registration has been cancelled.');};
  if (detailLoading) return <main className="container section"><div className="status">Loading event details...</div></main>;
  if (detailError || !event) return <main className="container section"><div className="status error">{detailError || 'Event not found.'}</div></main>;
  const venue = eventVenue(event); const date = eventDate(event);
  return <main className="container details-page"><Link className="back-link" to="/"><ArrowLeft size={17}/> Back to events</Link>
    <div className="details-hero">{eventImage(event) && <img src={eventImage(event)} alt={event.name}/>}<div className="details-shade"/><span className="details-category">{eventCategory(event)}</span></div>
    <div className="details-layout"><article><span className="overline">THE EXPERIENCE</span><h1>{event.name}</h1><div className="details-info"><span><CalendarDays size={18}/>{formatDate(date)}</span><span><MapPin size={18}/>{eventLocation(event)}</span></div>
      <h2>About this event</h2><p>{event.info || event.pleaseNote || 'Get ready for an incredible live experience. Explore the event details and secure your spot.'}</p>
      {event.pleaseNote && event.info && <p>{event.pleaseNote}</p>}
      {event.isSampleData && <div className="sample-data-notice" role="note">This is sample event information bundled with the project, not a live Ticketmaster listing.</div>}
      {event.url && <a className="external-link" href={event.url} target="_blank" rel="noreferrer">View official Ticketmaster listing <ExternalLink size={16}/></a>}
    </article><aside className="booking-card"><div className="booking-icon"><Ticket size={24}/></div><h3>Event details</h3>
      <div className="booking-row"><CalendarDays size={19}/><div><small>Date</small><strong>{formatDate(date)}</strong></div></div>
      <div className="booking-row"><Clock size={19}/><div><small>Time</small><strong>{event.dates?.start?.localTime?.slice(0,5) || 'To be announced'}</strong></div></div>
      <div className="booking-row"><MapPin size={19}/><div><small>Venue</small><strong>{venue?.name || 'To be announced'}</strong><span>{eventLocation(event)}</span></div></div>
      {notice && <div className="notice"><CheckCircle2 size={17}/>{notice}</div>}
      {!isUpcoming(event) ? <button className="btn btn-muted" disabled>Event has ended</button> : registered ? <button className="btn btn-danger" onClick={cancel}>Cancel registration</button> : <button className="btn btn-primary" onClick={register}>{user?'Register for event':'Log in to register'} <ArrowLeft className="arrow-right" size={17}/></button>}
      <small className="booking-note">Registration is a local demo only; this does not purchase a Ticketmaster ticket.</small>
    </aside></div></main>;
}
