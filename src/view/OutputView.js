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
  },

  printPreviousPrice(price) {
    Console.print(MESSAGES.previousPriceTitle);
    Console.print(`${price.toLocaleString('ko-KR')}원`);
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
    Console.print(`${amount.toLocaleString('ko-KR')}원`);
  },

  printTotalPrice(amount) {
    Console.print(MESSAGES.totalPriceTitle);
    Console.print(`${amount.toLocaleString('ko-KR')}원`);
  },

  printEventBadge(badge) {
    Console.print(MESSAGES.eventBadgeTitle);
    Console.print(badge);
  },
};

export default OutputView;
