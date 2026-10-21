import { createSlice } from '@reduxjs/toolkit';
import { read, write } from '../lib/storage';
const slice = createSlice({
  name: 'registrations',
  initialState: { entries: read('evently_registrations', []) },
  reducers: {
    addRegistration(state, action) {
      const { userId, event } = action.payload;
      if (state.entries.some(r => r.userId === userId && r.event.id === event.id)) return;
      state.entries.push({ userId, event, registeredAt: new Date().toISOString() });
      write('evently_registrations', state.entries);
    },
    cancelRegistration(state, action) {
      const { userId, eventId } = action.payload;
      state.entries = state.entries.filter(r => !(r.userId === userId && r.event.id === eventId));
      write('evently_registrations', state.entries);
    }
  }
});
export const { addRegistration, cancelRegistration } = slice.actions;
export default slice.reducer;
