# sptfyplayer

alternative client for Spotify with focus on albums

# Install instructions

### Register new app with Spotify ###
https://developer.spotify.com/dashboard/login

### .env ###
/.env 

FRONTEND_URL=http://localhost:3001

VITE_BACKEND_URL=http://localhost:3000

SPOTIFY_CLIENTID=

SPOTIFY_SECRET=

SPOTIFY_CALLBACK=http://localhost:3000/api/auth/callback


### Local ###
npm install 

npm run dev

### Docker ###
docker-compose build
docker-compose up
