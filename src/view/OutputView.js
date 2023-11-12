import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constant/Messages.js';

const OutputView = {
  printStartOrder() {
    Console.print(MESSAGES.startOrder);
  },

  printErrorMessage(error) {
    Console.print(error.message);
  },

  printResultTitle(date) {
    Console.print(
      `${MESSAGES.resultTitle.preffix}${date}${MESSAGES.resultTitle.suffix}`,
    );
    // ...
  },

  printMenu() {
    Console.print(MESSAGES.printMenus);
    // ...
  },
  // ...
};

export default OutputView;
