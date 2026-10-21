export const eventImage = event => event?.images?.find(i => i.ratio === '16_9' && i.width >= 600)?.url || event?.images?.[0]?.url || '';
export const eventDate = event => event?.dates?.start?.dateTime || event?.dates?.start?.localDate || '';
export const eventCategory = event => event?.classifications?.[0]?.segment?.name || 'Other';
export const eventVenue = event => event?._embedded?.venues?.[0];
export const eventLocation = event => {
  const v = eventVenue(event);
  return [v?.city?.name, v?.state?.stateCode || v?.country?.name].filter(Boolean).join(', ') || 'Location TBA';
};
export const formatDate = value => {
  if (!value) return 'Date TBA';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? 'Date TBA' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
export const isUpcoming = event => {
  const value = eventDate(event);
  return value ? new Date(value).getTime() >= Date.now() : true;
};
export const snapshot = event => ({
  id: event.id, name: event.name, images: event.images, dates: event.dates,
  classifications: event.classifications, _embedded: { venues: event._embedded?.venues || [] },
  url: event.url
});
