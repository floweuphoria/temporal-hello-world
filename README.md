# Temporal Hello World in TypeScript

A simple "Hello World" Temporal application with environment-based configuration support for both local development and Temporal Cloud.

## Features

- Simple greeting workflow and activity
- Environment-based configuration for easy Temporal Cloud deployment
- Support for both mTLS and API Key authentication
- Comprehensive test suite
- TypeScript with proper linting and formatting

## Running Locally

1. **Start Temporal Server**:
   ```bash
   temporal server start-dev
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Worker** (in one terminal):
   ```bash
   npm run worker
   ```

4. **Run the Client** (in another terminal):
   ```bash
   npm run client
   ```

Expected output:
```bash
Started workflow hello-world-abc123
Hello, Temporal!
```

## Running on Temporal Cloud

Set the following environment variables:

### Using API Key (recommended)
```bash
export TEMPORAL_ADDRESS="your-namespace.tmprl.cloud:7233"
export TEMPORAL_NAMESPACE="your-namespace"
export TEMPORAL_API_KEY="your-api-key"
```

### Using mTLS
```bash
export TEMPORAL_ADDRESS="your-namespace.tmprl.cloud:7233"
export TEMPORAL_NAMESPACE="your-namespace"
export TEMPORAL_TLS_CERT="/path/to/client.crt"
export TEMPORAL_TLS_KEY="/path/to/client.key"
```

Then run the worker and client as usual with `npm run worker` and `npm run client`.

## Development

- **Build**: `npm run build`
- **Test**: `npm test`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

## Project Structure

- `src/activities.ts` - Activity implementations
- `src/workflows.ts` - Workflow definitions  
- `src/worker.ts` - Worker configuration with environment-based auth
- `src/client.ts` - Client code with environment-based auth
- `src/helpers.ts` - Environment configuration utilities
