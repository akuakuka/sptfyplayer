sptfyplayer

alternative client for Spotify with focus on albums
Install instructions
Register new app with Spotify

https://developer.spotify.com/dashboard/login
.env

/server/.env

SPOTIFY_SECRET=

SPOTIFY_CLIENTID=

SPOTIFY_CALLBACK_DEV=

SPOTIFY_CALLBACK_PROD=

FRONTEND_URL_DEV=

FRONTEND_URL_PROD=

BACKEND_URL_DEV=

VITE_BACKEND_URL_DEV=
Local

npm install

npm run dev
Docker

docker-compose build docker-compose up
