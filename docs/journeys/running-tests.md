# Running Tests

Football Subs includes a comprehensive test suite to ensure that the application is functioning correctly. This document explains how to run the tests and how to create new tests for the application.

## Running the Test Suite

To run the test suite, use the following command:

```bash
npm run test
```

This will run all the tests in the project and display the results in the terminal.

To run the tests in watch mode, which will automatically re-run the tests when files change, use:

```bash
npm run test:watch
```

## Test Types

The test suite includes several types of tests:

1. **Component Tests**: These test the rendering and behavior of React components
2. **Utility Tests**: These test utility functions to ensure they produce the expected outputs
3. **Model Tests**: These test the business logic models to ensure they behave as expected

## Test Structure

The tests are located in the `tests` directory, which mimics the structure of the `src` directory. For example:

- `tests/App.test.tsx` - Tests for the main App component
- `tests/components/SignIn.test.tsx` - Tests for the SignIn component
- `tests/utils/parsePlayers.test.ts` - Tests for the parsePlayers utility function
- `tests/models/playerModel.test.ts` - Tests for the player model

For details on creating new tests, please refer to the Creating New Tests document.

[Creating New Tests](./running-tests-creating-new-tests.md)

For details on mocking dependencies in tests, please refer to the Mocking Dependencies document.

[Mocking Dependencies](./running-tests-mocking.md)

## Troubleshooting

If you encounter issues with the tests:

1. Make sure all dependencies are installed
2. Check that the component or function you're testing is exported correctly
3. Verify that all required providers are set up in your tests
4. Check for any console errors during test execution