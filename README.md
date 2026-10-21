# Evently — Event Management System

A responsive React application built for **Web Programming Assignment 2**. Browse real events from the Ticketmaster Discovery API, create a local demo account, register for events, and manage registrations.

## Tech stack
- React + Vite
- Redux Toolkit (`configureStore`, `createSlice`, async thunks, actions, reducers, `useSelector`, `useDispatch`)
- React Router
- Ticketmaster Discovery API
- Local Storage
- Lucide React icons

## Setup

1. Install **Node.js 18+**.
2. Open the project folder in VS Code.
3. Run `npm install`.
4. Create `.env` in the project root using `.env.example` as a template.
5. Get a **Consumer Key** from https://developer.ticketmaster.com/.
6. Set `VITE_TICKETMASTER_API_KEY=your_actual_key` in `.env`.
7. Run `npm run dev`, then open the localhost URL shown in the terminal.

**Do not commit `.env` to GitHub.** The Ticketmaster key is used in browser requests, so Vite environment variables do **not** make it secret. The key is public to anyone using the running site. Apply API key restrictions/monitoring where available. For true secrecy, a backend proxy would be required.

## Features
- Register, log in, log out; login survives refresh
- Search by keyword/city, filter by category and upcoming status
- Browse paginated Ticketmaster search results
- View event image, venue, location, category, date, time and description
- Register for upcoming events; prevent duplicates
- Cancel registration and view upcoming/completed registrations
- Protected My Events route
- Loading, error and empty states
- Responsive layouts

## Pages
| Path | Purpose |
| --- | --- |
| `/` | Explore events |
| `/events/:id` | Event details |
| `/register` | Create demo account |
| `/login` | Log in |
| `/my-events` | Personal registrations (protected) |

## Redux structure
- `authSlice`: demo users and current session
- `eventsSlice`: API results, details, loading/errors
- `registrationsSlice`: user-linked event registrations

## Important limitations
- **Authentication is simulated entirely in the browser.** Demo passwords are stored in plaintext in Local Storage. Never enter a real password or use this design in production.
- Registration means saving the event to this demo app, **not buying a Ticketmaster ticket**.
- API responses, quotas, and event availability depend on Ticketmaster.

## Git and GitHub submission
Initialize Git in the project folder and commit changes as you develop. Use descriptive messages that accurately reflect the work in each commit. Since this project was provided as a completed starting point, do not invent historical feature commits.

To create a local repository:
```bash
git init
git add .
git commit -m "Add Evently event management system"
```

Create an accessible GitHub repository, add it as `origin`, and push your commits when ready. Never include `.env` or a Ticketmaster key in commits.

## Build check
```bash
npm run build
```

## Testing checklist
- Create an account and log out/in; refresh the page
- Search and filter events
- Open an event's detail page
- Register and try to register twice
- View My Events and cancel a registration
- Check mobile layout and API error messages
