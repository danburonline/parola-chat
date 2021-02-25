# How to set up and develop locally

## Server service

- `cd /server`
- Create a `.env` file and fill in these environment variables (for more information, read the [How to create and deploy a new chatbot ad](https://github.com/danburonline/parola-chat/blob/master/doc/how-to-new-ad.md.md) documentation):

```txt
DB_URI=
DF_PROJECTID=
DF_AGENTID=
DF_LANGCODE=
DF_LOCATION=
API_ENDPOINT=
GCP_CLIENTEMAIL=
GCP_CLIENTKEY=
```

- `yarn install` to install all the Node dependencies
- `yarn dev` to start the local development server
- `yarn build` to compile the TypeScript code
- `yarn start` to start the build server

## Client service

- `cd /client`
- Create a `.env.local` file and fill in these environment variables (for more information, read the [How to create and deploy a new chatbot ad](https://github.com/danburonline/parola-chat/blob/master/doc/how-to-new-ad.md.md) documentation):

```txt
FS_TOKEN=
API_URL=
REGION=
```

- `yarn install` to install all the Node dependencies
- `yarn dev` to start the local server
- `yarn build` to create a production build
- `yarn start` to start the build NextJS app
