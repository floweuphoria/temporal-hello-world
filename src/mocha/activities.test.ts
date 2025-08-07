import { MockActivityEnvironment } from '@temporalio/testing';
import { it } from 'mocha';
import assert from 'assert';
import * as activities from '../activities';

describe('hello world activities', async () => {
  it('successfully greets with a name', async () => {
    const env = new MockActivityEnvironment();
    const result = await env.run(activities.greet, 'World');
    assert.equal(result, 'Hello, World!');
  });

  it('successfully greets with another name', async () => {
    const env = new MockActivityEnvironment();
    const result = await env.run(activities.greet, 'Temporal');
    assert.equal(result, 'Hello, Temporal!');
  });
});
