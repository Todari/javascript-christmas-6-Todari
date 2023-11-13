import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constant/Messages.js';
import SETTING from '../constant/Setting.js';

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
  },

  printPreviousPrice(price) {
    Console.print(MESSAGES.previousPriceTitle);
    Console.print(`${price.toLocaleString(SETTING.locale)}${MESSAGES.krWon}`);
  },

  printPresent(present) {
    Console.print(MESSAGES.presentTitle);
    Console.print(present);
  },

  printMenus(menus) {
    Console.print(MESSAGES.menusTitle);
    menus.forEach(menu => {
      Console.print(menu);
    });
  },

  printEvents(events) {
    Console.print(MESSAGES.eventsTitle);
    events.forEach(event => {
      Console.print(event);
    });
  },

  printEventAmount(amount) {
    Console.print(MESSAGES.eventAmountTitle);
    Console.print(`${amount.toLocaleString(SETTING.locale)}${MESSAGES.krWon}`);
  },

  printTotalPrice(amount) {
    Console.print(MESSAGES.totalPriceTitle);
    Console.print(`${amount.toLocaleString(SETTING.locale)}${MESSAGES.krWon}`);
  },

  printEventBadge(badge) {
    Console.print(MESSAGES.eventBadgeTitle);
    Console.print(badge);
  },
};

export default OutputView;
