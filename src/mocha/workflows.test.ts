import { TestWorkflowEnvironment } from '@temporalio/testing';
import { after, before, it } from 'mocha';
import { Worker } from '@temporalio/worker';
import assert from 'assert';
import * as activities from '../activities';
import { example } from '../workflows';

describe('Hello World workflow', () => {
  let testEnv: TestWorkflowEnvironment;
  before(async function () {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it('successfully runs hello world workflow', async () => {
    const { client, nativeConnection } = testEnv;
    const taskQueue = 'test';

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve('../workflows'),
      activities,
    });

    await worker.runUntil(async () => {
      const result = await client.workflow.execute(example, {
        args: ['World'],
        workflowId: 'hello-world-test-workflow',
        taskQueue,
      });

      assert.equal(result, 'Hello, World!');
    });
  });

  it('successfully runs hello world workflow with different name', async () => {
    const { client, nativeConnection } = testEnv;
    const taskQueue = 'test';

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve('../workflows'),
      activities,
    });

    await worker.runUntil(async () => {
      const result = await client.workflow.execute(example, {
        args: ['Temporal'],
        workflowId: 'hello-world-test-workflow-2',
        taskQueue,
      });

      assert.equal(result, 'Hello, Temporal!');
    });
  });
});
