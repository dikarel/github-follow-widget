# github-follow-widget

Follow random people on GitHub

<img width="316" alt="screen shot 2017-01-22 at 3 38 48 pm" src="https://cloud.githubusercontent.com/assets/15131271/22187306/ea9d7af8-e0b8-11e6-912b-5df89198f191.png">

## Commands

- `npm start`: Run locally on a browser (http://localhost:8080/webpack-dev-server)
- `npm test`: Run unit tests
- `npm run lint`: Lint project
- `npm run compile`: Compile project into dist directory

## Architecture

The architecture is MVVM-inspired, with UI state management handled by view-models that are then rendered via stateless components.

Business logic is implemented via services, ensuring that models don't accumulate business logic over time and become bloated

The source code is split into:

- `src/components` - Stateless components responsible for rendering HTML
- `src/containers` - Components that glue view-models to their respective stateless components
- `src/models` - Model definitions and enums
- `src/services` - Business logic
- `src/view-models` - Manages UI state; can be subscribed to for changes
- `src/index.js` - Main entry point; service dependencies are resolved here

## Test suite

The test suite is a sanity check to be used in tandem with manual testing.
It can be fine-tuned to be more rigorous in bug-prone areas as the project progresses.

The test suite covers the following:
- Components
- Services
- View-models

## Future improvements

- Redux is recommended as a replacement to the MVVM architecture if the project gets to the point where it's hard to track data flow
- Automated browser testing is recommended to verify that the project shows up properly in all browsers
- TypeScript can be used to provide a better auto-complete experience and to statically enforce types
- Code coverage can be measured using Istanbul
