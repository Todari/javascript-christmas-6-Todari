import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constant/Messages.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGES.readDate);
    return input;
  },
  // ...
};

export default InputView;
