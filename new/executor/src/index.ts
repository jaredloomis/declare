import { subscribe, TEST_EXECUTION_CHANNEL, TestExecutionMessage } from 'declare-server-common/src/pubsub';
import { LocalTestExecutor } from './executor';
import 'dotenv/config';

(async () => {
  await subscribe(TEST_EXECUTION_CHANNEL, async (message: TestExecutionMessage | undefined) => {
    if (!message) {
      return;
    }

    await new LocalTestExecutor().executeTest(message.test);
  });
})();
