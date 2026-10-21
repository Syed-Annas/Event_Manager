import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import events from './eventsSlice';
import registrations from './registrationsSlice';
export const store = configureStore({ reducer: { auth, events, registrations } });
