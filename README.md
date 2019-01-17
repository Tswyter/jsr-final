# jsr-final
Final project for JavaScript class

To start, run `npm install` in both the `menu-images` and `menu-images-backend` folders.
Then in the `menu-images` folder, run `npm start`, which will spin up localhost at port 3000. `http://localhost:3000`. 
In the `menu-images-backend` folder, while the frontend is running, you'll need to run `PORT=3001 npm start`. This will spin up an express server at port 3001. Currently all backend calls in the front end are pointing at this specific port.

The back end connects to a few services using API Keys that need to be kept confidential, so those are stored in a .env file that you'll need to store.

You'll need to sign up for a Yelp-Fusion API key, a Firebase API key (along with some other credentials), and a HubSpot API key (this one isn't free unfortunately, but this is how we store files in this app.) 
Once you create your `.env` file, you'll need to add these keys with very specific constant variable names. Those can be found in the `menu-images-backend` folder's README file.
