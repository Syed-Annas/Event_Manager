import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../store/eventsSlice';
import EventCard from '../components/EventCard';
import { Search, SlidersHorizontal, Sparkles, ArrowRight } from 'lucide-react';
const categories = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];
export default function Explore() {
  const dispatch = useDispatch();
  const { items, total, totalPages = 0, source, loading, error } = useSelector(s => s.events);
  const [keyword, setKeyword] = useState(''); const [city, setCity] = useState('');
  const [category, setCategory] = useState('All'); const [upcoming, setUpcoming] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({ keyword: '', city: '', category: 'All', upcoming: true });
  useEffect(() => { dispatch(fetchEvents({ ...search, page })); }, [dispatch, search, page]);
  const submit = e => {
    e.preventDefault();
    setPage(0);
    setSearch({ keyword: keyword.trim(), city: city.trim(), category, upcoming });
  };
  const selectCategory = value => {
    setCategory(value);
    setPage(0);
    setSearch(s => ({ ...s, category: value }));
  };
  const setUpcomingFilter = value => {
    setUpcoming(value);
    setPage(0);
    setSearch(s => ({ ...s, upcoming: value }));
  };
  return <><section className="hero"><div className="container hero-inner"><div className="eyebrow"><Sparkles size={15}/> YOUR NEXT EXPERIENCE STARTS HERE</div>
    <h1>Find your next<br/><em>unforgettable</em> moment.</h1>
    <p>Discover live music, sports, art, and experiences worth showing up for.</p>
    <form className="search-bar" onSubmit={submit}><label><Search size={19}/><input aria-label="Search events" placeholder="Search events, artists..." value={keyword} onChange={e=>setKeyword(e.target.value)}/></label><span className="search-divider"/><label><input aria-label="City" placeholder="City (optional)" value={city} onChange={e=>setCity(e.target.value)}/></label><button className="btn btn-primary" type="submit">Find events <ArrowRight size={17}/></button></form>
  </div><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/></section>
  <main className="container section"><div className="section-heading"><div><span className="overline">EXPLORE WHAT'S HAPPENING</span><h2>Discover events</h2><p>Something exciting is always around the corner.</p></div><div className="filter-label"><SlidersHorizontal size={17}/> Browse by category</div></div>
  <div className="filters">{categories.map(c => <button key={c} className={`filter-chip ${category===c?'selected':''}`} onClick={()=>selectCategory(c)}>{c}</button>)}<label className="upcoming-toggle"><input type="checkbox" checked={upcoming} onChange={e=>setUpcomingFilter(e.target.checked)}/> Upcoming only</label></div>
  {source === 'sample' && !loading && <div className="sample-data-notice" role="status">Showing sample events bundled with this project. Add a Ticketmaster API key to load live listings.</div>}
  {loading ? <div className="status">Finding amazing events...</div> : error ? <div className="status error">{error}<br/><button className="btn btn-outline" onClick={()=>dispatch(fetchEvents({ ...search, page }))}>Try again</button></div> : items.length ? <><div className="results-count">Showing {items.length} of {total.toLocaleString()} events</div><div className="event-grid">{items.map(e=><EventCard key={e.id} event={e}/>)}</div>
  {totalPages > 1 && <nav className="pagination" aria-label="Event pages"><button className="btn btn-outline" onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}>Previous</button><span>Page {page+1} of {totalPages}</span><button className="btn btn-outline" onClick={()=>setPage(p=>Math.min(totalPages-1,p+1))} disabled={page>=totalPages-1}>Next</button></nav>}
  </> : <div className="status">No events found. Try a different city, keyword, or category.</div>}
  </main></>;
}
