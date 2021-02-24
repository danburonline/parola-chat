import 'dotenv/config'
import { SessionsClient } from '@google-cloud/dialogflow-cx';

const projectId = process.env.DF_PROJECTID;
const agentId = process.env.DF_AGENTID;
const languageCode = process.env.DF_LANGCODE;
const location = process.env.DF_LOCATION;
const apiEndpoint = process.env.API_ENDPOINT

const gcpCredentials = {
  client_email: process.env.GCP_CLIENTEMAIL,
  private_key: process.env.GCP_CLIENTKEY,
};

const client = new SessionsClient({
  projectId: projectId,
  credentials: gcpCredentials,
  apiEndpoint: apiEndpoint
});

async function detectIntentText(query: any, sessionId: any) {
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId!,
    location!,
    agentId!,
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

  const [response]: any = await client.detectIntent(request);
  // Filter out the empty array objects in the DialogFlow response
  let dialogFlowResponses = response.queryResult.responseMessages.filter(
    (singleMessage: any) => singleMessage.text
  );
  let mappedDialogFlowResponses = dialogFlowResponses.map(
    (singleMessage: any) => singleMessage.text
  );
  let finalFinalDialogFlowResponses = mappedDialogFlowResponses.map(
    (singleMessage: any) => singleMessage.text
  );

  let replyObject = {
    dialogFlowResponse: finalFinalDialogFlowResponses.flat(),
    dialogFlowIntent: ""
  }

  // If the user triggered an intent, then pass it to the reply object
  if (response.queryResult.match.intent) {
    replyObject.dialogFlowIntent = response.queryResult.match.intent.displayName
  }

  return replyObject;
}

export default detectIntentText;
