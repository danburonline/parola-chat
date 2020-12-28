require('dotenv').config();
const { SessionsClient } = require('@google-cloud/dialogflow-cx');

const projectId = process.env.DF_PROJECTID;
const agentId = process.env.DF_AGENTID;
const languageCode = process.env.DF_LANGCODE;
const location = process.env.DF_LOCATION;

const gcpCredentials = {
  client_email: process.env.GCP_CLIENTEMAIL,
  private_key: process.env.GCP_CLIENTKEY,
};

const client = new SessionsClient({
  projectId: projectId,
  credentials: gcpCredentials,
});

async function detectIntentText(query, sessionId) {
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };

  const [response] = await client.detectIntent(request);
  // Filter out the empty array objects in the DialogFlow response
  let dialogFlowResponses = response.queryResult.responseMessages.filter(
    (singleMessage) => singleMessage.text
  );
  let mappedDialogFlowResponses = dialogFlowResponses.map(
    (singleMessage) => singleMessage.text
  );
  let finalFinalDialogFlowResponses = mappedDialogFlowResponses.map(
    (singleMessage) => singleMessage.text
  );
  return finalFinalDialogFlowResponses.flat();
  // console.log(`User Query: ${query}`);
  // for (const message of response.queryResult.responseMessages) {
  //   if (message.text) {
  //     // console.log(`Agent Response: ${message.text.text}`);
  //     return message.text.text;
  //   }
  // }
  // if (response.queryResult.match.intent) {
  //   console.log(
  //     `Matched Intent: ${response.queryResult.match.intent.displayName}`
  //   );
  // }
  // console.log(`Current Page: ${response.queryResult.currentPage.displayName}`);
}

module.exports = detectIntentText;
// [END dialogflow_cx_detect_intent_text]

// main(...process.argv.slice(2));
// process.on('unhandledRejection', err => {
//   console.error(err.message);
//   process.exitCode = 1;
//});
