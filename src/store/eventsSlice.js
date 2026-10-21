import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const BASE = 'https://app.ticketmaster.com/discovery/v2';
const key = import.meta.env.VITE_TICKETMASTER_API_KEY?.trim();
const missingKeyMessage = 'Add your Ticketmaster API key to .env and restart the server.';
const isConfigured = () => key && key !== 'your_ticketmaster_consumer_key_here';
const apiErrorMessage = status => {
  if (status === 401 || status === 403) return 'Ticketmaster rejected the API key. Check that your Consumer Key is correct and active.';
  if (status === 429) return 'Ticketmaster request limit reached. Wait a moment and try again.';
  if (status === 404) return 'This event could not be found.';
  return `Ticketmaster API error (${status}). Please try again.`;
};

export const fetchEvents = createAsyncThunk('events/fetch', async (filters = {}, { rejectWithValue }) => {
  if (!isConfigured()) return rejectWithValue(missingKeyMessage);
  const params = new URLSearchParams({ apikey: key, size: '24', sort: 'date,asc', page: String(filters.page ?? 0) });
  if (filters.keyword) params.set('keyword', filters.keyword);
  if (filters.city) params.set('city', filters.city);
  if (filters.category && filters.category !== 'All') params.set('classificationName', filters.category);
  if (filters.upcoming !== false) params.set('startDateTime', new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'));
  const response = await fetch(`${BASE}/events.json?${params}`);
  if (!response.ok) return rejectWithValue(apiErrorMessage(response.status));
  const data = await response.json();
  return {
    events: data._embedded?.events ?? [],
    total: data.page?.totalElements ?? 0,
    totalPages: data.page?.totalPages ?? 0
  };
});

export const fetchEventById = createAsyncThunk('events/detail', async (id, { rejectWithValue }) => {
  if (!isConfigured()) return rejectWithValue(missingKeyMessage);
  const response = await fetch(`${BASE}/events/${encodeURIComponent(id)}.json?apikey=${encodeURIComponent(key)}`);
  if (!response.ok) return rejectWithValue(apiErrorMessage(response.status));
  return response.json();
});

const slice = createSlice({
  name: 'events', initialState: { items: [], total: 0, selected: null, loading: false, detailLoading: false, error: null, detailError: null },
  reducers: { clearSelected(state) { state.selected = null; state.detailError = null; } },
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.events;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchEvents.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error.message; })
      .addCase(fetchEventById.pending, state => { state.detailLoading = true; state.selected = null; state.detailError = null; })
      .addCase(fetchEventById.fulfilled, (state, action) => { state.detailLoading = false; state.selected = action.payload; })
      .addCase(fetchEventById.rejected, (state, action) => { state.detailLoading = false; state.detailError = action.payload || action.error.message; });
  }
});
export const { clearSelected } = slice.actions;
export default slice.reducer;
