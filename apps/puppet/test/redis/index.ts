import { describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import Redis, { Redis as RedisClient } from 'ioredis';

import { sendProgressUpdate, progressChannelName } from '../../src/redis';

describe('Redis', () => {
  const item = {
    id: 'test',
    status: true,
    progress: 67,
  };
  const message = JSON.stringify(item);

  it('sendProgressUpdate - should send', async () => {
    const stubRedis = sinon.createStubInstance<RedisClient>(Redis);
    stubRedis.publish.withArgs(progressChannelName, message).returns(Promise.resolve(5));
    stubRedis.publish.throws();

    const result = await sendProgressUpdate((stubRedis as unknown) as RedisClient, item);

    expect(result, 'Send progress should succeed').to.be.true;
  });

  it('sendProgressUpdate - should not send', async () => {
    const stubRedis = sinon.createStubInstance<RedisClient>(Redis);
    stubRedis.publish.withArgs(progressChannelName, message).throws();
    stubRedis.publish.returns(Promise.resolve(5));

    const result = await sendProgressUpdate((stubRedis as unknown) as RedisClient, item);

    expect(result, 'Send progress should fail').to.be.false;
  });
});
