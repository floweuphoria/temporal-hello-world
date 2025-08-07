import { Connection, ConnectionOptions, WorkflowClient } from '@temporalio/client';
import { example } from './workflows';
import { getEnv } from './helpers';
import { taskQueueName } from './shared';
import { nanoid } from 'nanoid';

async function run() {
  const { address, namespace, clientCert, clientKey, apiKey } = await getEnv();


  const connectionOptions: ConnectionOptions = {
    address,
  };

  // Configure mTLS authentication if certificates are provided
  if (clientCert && clientKey) {
    connectionOptions.tls = {
      clientCertPair: {
        crt: clientCert,
        key: clientKey,
      },
    };
  } else if (apiKey) {
    // Configure API key authentication
    connectionOptions.tls = true;
    connectionOptions.apiKey = apiKey;
    connectionOptions.metadata = {
      'temporal-namespace': namespace,
    };
  } else {
    // No authentication
    connectionOptions.tls = false;
  }

  // Create the connection
  const connection = await Connection.connect(connectionOptions);

  const client = new WorkflowClient({ connection, namespace });

  const handle = await client.start(example, {
    args: ['Temporal'],
    taskQueue: taskQueueName,
    workflowId: 'hello-world-' + nanoid(),
  });

  console.log(`Started workflow ${handle.workflowId}`);
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
