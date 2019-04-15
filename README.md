# Chat-App-React-Native
Mobile app for SE final project

## Usage
- Server: `cd backend && node index.js`
- Client:
	- run android emulator
	- `cd mobile && react-native run-android`

## Notes
- `api-backend`: handles 1 way request: client -> server. For: login, register,...
	- `PORT`: 4000
	- `POST /auth/login`
	- `POST /auth/register`
- `socket-backend`: handles 2 way communication: client <-> server. For: send msg, receive msg, dispatch msg,...
	- `PORT`: 3000

## History commits
- `v1.0.0`: basic chat: client sends msg => server receives, dispatches msg to all clients
- `v1.0.1`: basic chat + basic login: server receives apis login => responds faked token
