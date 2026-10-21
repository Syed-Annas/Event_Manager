import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import { eventImage, eventDate, eventCategory, eventLocation, formatDate } from '../lib/events';
export default function EventCard({ event }) {
  return <Link className="event-card" to={`/events/${event.id}`}>
    <div className="event-photo">{eventImage(event) ? <img src={eventImage(event)} alt={event.name} loading="lazy"/> : <div className="image-placeholder">EVENTLY</div>}<span className="category-pill">{eventCategory(event)}</span></div>
    <div className="event-body"><div className="event-meta"><CalendarDays size={15}/>{formatDate(eventDate(event))}</div>
    <h3>{event.name}</h3><div className="event-bottom"><span><MapPin size={15}/>{eventLocation(event)}</span><ArrowUpRight size={20}/></div></div>
  </Link>;
}
