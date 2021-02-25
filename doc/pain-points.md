# Pain points

- Despite using TypeScript and SASS, I didn't actually use their advanced features to provide a cleaner and more understandable codebase. I would highly recommend refactoring the codebase to lower the risks of running into bugs.
- Some files (especially the `api.ts` file) are way too long and complicated. I would highly recommend refactoring this part of the codebase and splitting it into utility functions and pure functional modules.
- There is no single test written for the whole codebase. I would highly recommend writing unit and integration tests before refactoring or adjusting the code.
- When you compile the server-side TypeScript code, you will see tons of errors. These errors won't destroy the logic of the compiled JavaScript, but they hinder the automatic deployment of the Google Cloud Platform's app engine. Therefore you need, as of today, to compile the TypeScript code (with all it's type errors) locally and then deploy the app on the GCP's app engine. The current `yarn deploy` script addresses this unpleasant flaw. I would highly recommend (as mentioned before) refactoring the whole server-side codebase using the full power of TypeScript so that the type errors go away.
- The accuracy of the FingerprintJS Pro service would improve significantly by using a subdomain integration. This feature is especially critical for Safari and iPhones users and those who have ad blockers installed. I would highly recommend creating such a subdomain integration.