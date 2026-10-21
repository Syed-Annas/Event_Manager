import { createSlice } from '@reduxjs/toolkit';
import { read, write } from '../lib/storage';

const initialState = { users: read('evently_users', []), currentUser: read('evently_session', null), error: null };
const authSlice = createSlice({
  name: 'auth', initialState,
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload;
      const normalized = email.trim().toLowerCase();
      if (!name.trim() || !normalized || password.length < 6) { state.error = 'Enter your name, email and a password of at least 6 characters.'; return; }
      if (state.users.some(u => u.email === normalized)) { state.error = 'An account with this email already exists.'; return; }
      // Demonstration-only local authentication. Never use this approach for production.
      const user = { id: crypto.randomUUID(), name: name.trim(), email: normalized, password };
      state.users.push(user);
      state.currentUser = { id: user.id, name: user.name, email: user.email };
      state.error = null;
      write('evently_users', state.users); write('evently_session', state.currentUser);
    },
    login(state, action) {
      const email = action.payload.email.trim().toLowerCase();
      const user = state.users.find(u => u.email === email && u.password === action.payload.password);
      if (!user) { state.error = 'Invalid email or password.'; return; }
      state.currentUser = { id: user.id, name: user.name, email: user.email };
      state.error = null; write('evently_session', state.currentUser);
    },
    logout(state) { state.currentUser = null; state.error = null; localStorage.removeItem('evently_session'); },
    clearAuthError(state) { state.error = null; }
  }
});
export const { register, login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
