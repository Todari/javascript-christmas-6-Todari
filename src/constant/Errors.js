const PREFIX = '[ERROR]';

const ERRORS = Object.freeze({
  dateType: `${PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,

  menuOrderType: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  menuDuplicated: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  menuNotExist: `${PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,

  menuAmount: `${PREFIX} 한번에 주문 가능한 메뉴의 최대 갯수는 20개 입니다. 다시 입력해 주세요.`,
  menuOnlyBeverage: `${PREFIX} 음료만 주문할 수 없습니다. 다시 입력해 주세요.`,

  menuNameError: `${PREFIX} 생성된 메뉴의 이름이 String이 아닙니다.`,
  menuTypeError: `${PREFIX} 생성된 메뉴의 타입이 String이 아닙니다.`,
  menuPriceError: `${PREFIX} 생성된 메뉴의 가격이 Number이 아닙니다.`,
});

export default ERRORS;
