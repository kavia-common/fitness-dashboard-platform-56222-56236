# fitness-dashboard-platform-56222-56236

## fitness_frontend (React)

### Environment variables
The frontend expects these variables (already present in `fitness_frontend/.env`):

- `REACT_APP_API_BASE` - Base URL for backend REST API (e.g. `https://...:8000`)
- `REACT_APP_BACKEND_URL` - Alias for backend URL (used as fallback)
- `REACT_APP_FRONTEND_URL` - Public URL for the frontend
- `REACT_APP_WS_URL` - WebSocket URL (reserved for real-time features)

### Run locally
```bash
cd fitness-dashboard-platform-56222-56236/fitness_frontend
npm install
npm start
```

### Features implemented
- Responsive layout:
  - Desktop: left sidebar navigation
  - Mobile: bottom navigation bar
- Pages:
  - Dashboard (with onboarding modal and quick log widgets)
  - Workout plan
  - Log (workout + nutrition)
  - Progress (trend chart)
  - Library (searchable items)
  - Account/Profile
- Style guide: light modern theme (primary `#3B82F6`, secondary `#10B981`, accent `#F59E0B`, error `#EF4444`)
