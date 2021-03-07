# How to create and deploy a new chatbot ad

Creating a new chatbot ad instance consists of five major steps:

1. Create a new conversation history database
2. Create a new GCP app engine project
3. Create a new DialogFlow CX agent
4. Adapt the source code
5. Deploy the application

## 1. Create a new conversation history database

- Go to https://account.mongodb.com and login/create a new account
- _Optionally:_ Select an organization and create a new project
- _Optionally:_ Create a new cluster and select settings that apply to the upcoming advertising campaign. I recommend selecting GCP as the cloud provider and a server location close to the campaign target group
- Select a dedicated cluster tier that fits high-traffic applications and large datasets
- Preview the pricing and create a name for the cluster (preferably the campaign name)
- Create a network access for the database as well as a user access (select a username and a strong password)
- Click on "Connect" on the corresponding new cluster and select "Connect your application". Select "NodeJS" as the driver and copy the connection string (save for later)

## 2. Create a new GCP app engine project

- Go to https://console.cloud.google.com and login/create a new account
- _Optionally:_ Select an organization and create a new project
- _Optionally:_ Create a budget and budget alerts
- Search for "DialogFlow API" in the search bar and connect the service to the project
- Go to "Login Details" and create a new service account login with admin access to the DialogFlow API
- Create and download a new private key as JSON (save for later)
- Search for "App Engine" in the search bar and connect the service to the project. Select "NodeJS" as the app engine's environment

## 3. Create a new DialogFlow CX agent

- Go to https://dialogflow.cloud.google.com/cx/projects and select the newly created project
- Create a new agent with the corresponding language settings
- Create flows, pages, intents etc. in the DialogFlow CX interface
- For using Swiss German, I highly recommend creating more than 50 training phrases per intent

## 4. Adapt the source code

- Fork and download the source code from this repository to your machine
- Go to `client/components/organisms/ChatBody/chatBody.tsx` and adapt the initial two messages, the kick-off message and the third message that will appear after the user clicked onto the first CTA button
- Go to `server/modules/intents.ts` and adapt/add intent message types like product sliders, images and videos. Use a CDN provider for adding absolute image paths to the different message types
- Go to `server/api/api.ts` and adapt the switch statement for the new intent message types according to the intent names in DialogFlow CX (don't forget to import the exported functions for newly added message types from the `intent.ts` module at the beginning of the `api.ts` file)

## 5. Deploy the application

- Edit both `.env` files in the server and client folders with the information from DialogFlow CX (id and co.), the data from the downloaded JSON private key from GCP (private email and co.), and the connection string from MongoDB Atlas (don't forget to add the plain text password to the MongoDB connection string)
- Run the command `gcloud init` and follow the instructions from the CLI tool (don't forget to select the correct App Engine project)
- CD into the server folder and run the command `yarn deploy`
- Run the command `gcloud app browse` to  open the back-end in the browser
- Copy the URL from the deployed back-end from the browser
- Paste the URL to the `.env.local` file inside the client folder where it says `API_URL` (don't forget to add the `/api` at the end of the URL)
- CD into the client folder and run the command `yarn deploy`
- Run the command `gcloud app browse` to see the live version of your new chatbot ad
