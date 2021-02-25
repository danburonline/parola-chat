# Ideas and features

- Create serverless webhooks so that the DialogFlow CX service can call them from within itself. Therefore one won't need to adapt the server's logic to adjust/add new intent message types.
- Create a simple front-end for adding new message types (and especially for uploading images and videos directly to the app engine).
- Create a new custom (intent) message type: button. It should show a headline, a description of the outgoing link and a clear CTA button.
- Create a `settings.json` file to easily change the colours, images and settings (like initial messages or the kick-off message) without the need to edit the code.
- Embed an audio-detection functionality since DialogFlow CX can also handle audio/speech input.
- Create an automation script to easily create a new chatbot ad from scratch (like setting up a new agent, connecting it to the app engine etc.).
- Create a version of Parola that can run on the publisher's website (as the last touchpoint). This version of Parola wouldn't run inside an ad frame; instead, it would function as a conventional chatbot ad (right corner bubble etc.).
- Build a spam and bot protection for the ad, so that spammers can't DDoS the Parola services.
- Create Emoji keyboard shortcuts with the`:` notation (like Discord, WhatsApp etc.).
