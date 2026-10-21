const daysFromToday = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const makeEvent = ({ id, name, daysAhead, time, segment, genre, venue, city, state, country, info }) => ({
  id,
  name,
  type: 'event',
  info,
  images: [],
  dates: {
    start: {
      localDate: daysFromToday(daysAhead),
      localTime: time,
      dateTime: `${daysFromToday(daysAhead)}T${time}`
    },
    status: { code: 'onsale' }
  },
  classifications: [{
    primary: true,
    segment: { id: segment.toLowerCase().replaceAll(' ', '-'), name: segment },
    genre: { name: genre }
  }],
  _embedded: {
    venues: [{
      name: venue,
      city: { name: city },
      state: { stateCode: state },
      country: { name: country }
    }]
  },
  isSampleData: true
});

export const sampleEvents = [
  makeEvent({
    id: 'sample-live-music-night',
    name: 'Live Music Under the Stars',
    daysAhead: 7,
    time: '19:30:00',
    segment: 'Music',
    genre: 'Rock',
    venue: 'Riverside Open Air',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    info: 'An open-air evening of live bands, local food, and great company. This sample listing demonstrates how event details appear in Evently.'
  }),
  makeEvent({
    id: 'sample-city-marathon',
    name: 'City Lights 10K',
    daysAhead: 14,
    time: '08:00:00',
    segment: 'Sports',
    genre: 'Running',
    venue: 'Harborfront Park',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    info: 'Join runners of all experience levels for a friendly city route and a lively finish-line celebration. This is bundled sample data, not a real event listing.'
  }),
  makeEvent({
    id: 'sample-contemporary-art',
    name: 'Beyond the Frame: Contemporary Art',
    daysAhead: 21,
    time: '11:00:00',
    segment: 'Arts & Theatre',
    genre: 'Fine Art',
    venue: 'The Foundry Gallery',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    info: 'Explore an imagined exhibition of bold color, new perspectives, and works by emerging artists. This sample listing is included with the project.'
  }),
  makeEvent({
    id: 'sample-film-festival',
    name: 'Independent Film Weekend',
    daysAhead: 28,
    time: '18:00:00',
    segment: 'Film',
    genre: 'Film Festival',
    venue: 'Grandview Cinema',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    info: 'A weekend showcase of independent storytelling, with screenings and community conversations. This sample listing is not an actual ticket offer.'
  }),
  makeEvent({
    id: 'sample-food-festival',
    name: 'Neighborhood Food & Culture Fair',
    daysAhead: 35,
    time: '12:00:00',
    segment: 'Miscellaneous',
    genre: 'Community',
    venue: 'Central Market Square',
    city: 'London',
    state: '',
    country: 'United Kingdom',
    info: 'A fictional community fair celebrating local makers, food, and music. This project sample demonstrates the event discovery and registration flows.'
  }),
  makeEvent({
    id: 'sample-jazz-evening',
    name: 'Sunday Jazz Sessions',
    daysAhead: 42,
    time: '20:00:00',
    segment: 'Music',
    genre: 'Jazz',
    venue: 'Blue Note Hall',
    city: 'Montreal',
    state: 'QC',
    country: 'Canada',
    info: 'Settle in for an intimate evening of live jazz and improvisation. This is example content bundled with the application, not a live event.'
  })
];

export const findSampleEvent = id => sampleEvents.find(event => event.id === id);

export const searchSampleEvents = ({ keyword = '', city = '', category = 'All', upcoming = true } = {}) => {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  return sampleEvents.filter(event => {
    const venue = event._embedded.venues[0];
    const matchesKeyword = !normalizedKeyword
      || `${event.name} ${event.info} ${event.classifications[0].genre.name}`.toLowerCase().includes(normalizedKeyword);
    const matchesCity = !normalizedCity || venue.city.name.toLowerCase().includes(normalizedCity);
    const matchesCategory = category === 'All' || event.classifications[0].segment.name === category;
    const matchesDate = !upcoming || new Date(event.dates.start.dateTime).getTime() >= Date.now();
    return matchesKeyword && matchesCity && matchesCategory && matchesDate;
  });
};
