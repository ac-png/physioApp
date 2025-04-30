Recommended: use ngrok for API endpoint:

npm install -g ngrok

Signup: ngrok.com

ngrok config add-authtoken [authToken]

<!-- npx ngrok http 5000 -->
npx ngrok http [backend API port]

rename .env.example to .env

add the ngrok URL to .env for API_URL

--

npm install

npx expo start

(preview the app in Expo Go on your mobile device)

--

'npm run test' to run jest in dev
