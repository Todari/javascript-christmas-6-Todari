import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, SETTING } from '../constant/index.js';

const OutputView = {
  printStartOrder() {
    Console.print(MESSAGE.startOrder);
  },

  printErrorMessage(error) {
    Console.print(error.message);
  },

  printResultTitle(date) {
    Console.print(
      `${MESSAGE.resultTitle.preffix}${date}${MESSAGE.resultTitle.suffix}`,
    );
  },

  printPreviousPrice(price) {
    Console.print(MESSAGE.previousPriceTitle);
    Console.print(`${price.toLocaleString(SETTING.locale)}${MESSAGE.krWon}`);
  },

  printPresent(present) {
    Console.print(MESSAGE.presentTitle);
    Console.print(present);
  },

  printMenus(menus) {
    Console.print(MESSAGE.menusTitle);
    menus.forEach(menu => {
      Console.print(menu);
    });
  },

  printEvents(events) {
    Console.print(MESSAGE.eventsTitle);
    events.forEach(event => {
      Console.print(event);
    });
  },

  printEventAmount(amount) {
    Console.print(MESSAGE.eventAmountTitle);
    Console.print(`${amount.toLocaleString(SETTING.locale)}${MESSAGE.krWon}`);
  },

  printTotalPrice(amount) {
    Console.print(MESSAGE.totalPriceTitle);
    Console.print(`${amount.toLocaleString(SETTING.locale)}${MESSAGE.krWon}`);
  },

  printEventBadge(badge) {
    Console.print(MESSAGE.eventBadgeTitle);
    Console.print(badge);
  },
};

export default OutputView;
