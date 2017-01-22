## Commands

- `npm start`: Run locally on a browser (http://localhost:8080/webpack-dev-server)
- `npm test`: Run unit tests
- `npm lint`: Lint project
- `npm run compile`: Compile project into dist directory

## Architecture

The architecture is MVVM-inspired, with UI state management handled by view-models that are then rendered via stateless components.

Business logic is implemented via "service classes", ensuring that model classes don't accumulate business logic over time and become bloated

The source code is split into:

- `src/components` - Stateless components responsible for rendering HTML
- `src/containers` - Components that glue view-models to their respective stateless components
- `src/models` - Model definitions and enums
- `src/services` - Business logic
- `src/view-models` - Manages UI state; can be subscribed to for changes

## Test suite

The test suite is not meant to be exhaustive; it is a sanity check to be used in tandem with manual testing.
As the project progresses, the test suite can be fine-tuned to be more rigorous in bug-prone areas.

The test suite covers the following:
- Components
- Services
- View-model classes

## Future improvements

- Redux is recommended as a future replacement to the MVVM architecture if the project gets to the point where it's hard to track data flow
- Automated browser testing is recommended to verify that the project shows up properly in all browsers
- TypeScript can be used to provide a better auto-complete experience and to statically enforce types
- Code coverage can be measured using Istanbul

