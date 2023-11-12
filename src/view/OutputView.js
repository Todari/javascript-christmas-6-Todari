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

  printMenu(menus) {
    Console.print(MESSAGES.printMenus);
    menus.forEach(menu => {
      Console.print(menu);
    });
  },
  // ...
};

export default OutputView;
