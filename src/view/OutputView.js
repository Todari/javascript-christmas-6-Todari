import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constant/Messages.js';
import MENU_LIST from '../constant/MenuList.js';

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

  printPreviousPrice(price) {
    Console.print(MESSAGES.printPreviousPrice);
    Console.print(`${price.toLocaleString('ko-KR')}원`);
  },

  printPresent(canPresent) {
    Console.print(MESSAGES.printPresents);
    Console.print(
      canPresent ? MESSAGES.presentChampagne : MESSAGES.printNoEvents,
    );
  },

  printEvents() {
    Console.print(MESSAGES.printEvents);
  },

  printChristmasDiscount(amount) {
    Console.print(
      `${MESSAGES.christmasDiscount}${amount.toLocaleString('ko-KR')}원`,
    );
  },

  printWeekdayDiscount(amount) {
    Console.print(
      `${MESSAGES.weekdayDiscount}${amount.toLocaleString('ko-KR')}원`,
    );
  },

  printWeekendDiscount(amount) {
    Console.print(
      `${MESSAGES.weekendDiscount}${amount.toLocaleString('ko-KR')}원`,
    );
  },

  printSpecialDiscount(amount) {
    Console.print(
      `${MESSAGES.specialDiscount}${amount.toLocaleString('ko-KR')}원`,
    );
  },

  printPresentDiscount() {
    Console.print(
      `${MESSAGES.presentDiscount}-${MENU_LIST.champagne.price.toLocaleString(
        'ko-KR',
      )}원`,
    );
  },

  printEventAmounts(amount) {
    Console.print(MESSAGES.printEventAmounts);
    Console.print(`${amount.toLocaleString('ko-KR')}원`);
  },
};

export default OutputView;
