import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/index.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.readDate);
    return input;
  },

  async readMenus() {
    const input = await Console.readLineAsync(MESSAGE.readMenus);
    return input;
  },
};

export default InputView;
