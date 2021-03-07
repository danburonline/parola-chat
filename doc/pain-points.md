# Pain points

- Despite using TypeScript and SASS, I didn't actually use their advanced features to provide a cleaner and more understandable codebase. I would highly recommend refactoring the codebase to lower the risks of running into bugs.
- Some files (especially the `api.ts` file) are way too long and complicated. I would highly recommend refactoring this part of the codebase and splitting it into utility functions and pure functional modules.
- There is no single test written for the whole codebase. I would highly recommend writing unit and integration tests before refactoring or adjusting the code.
- The accuracy of the FingerprintJS Pro service would improve significantly by using a subdomain integration. This feature is especially critical for Safari and iPhone users and those who have ad blockers installed. I would highly recommend creating such a subdomain integration.
