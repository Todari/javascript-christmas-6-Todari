const MESSAGES = Object.freeze({
  startOrder: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  readDate:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  readMenus:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',

  resultTitle: {
    preffix: '12월 ',
    suffix: '일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  },

  menusTitle: '\n<주문 메뉴>',
  previousPriceTitle: '\n<할인 전 총주문 금액>',
  presentTitle: '\n<증정 메뉴>',
  present: '샴페인 1개',

  printNoEvent: '없음',

  eventsTitle: '\n<혜택 내역>',

  christmasDiscount: '크리스마스 디데이 할인',
  weekdayDiscount: '평일 할인',
  weekendDiscount: '주말 할인',
  specialDiscount: '특별 할인',
  presentDiscount: '증정 이벤트',

  eventAmountTitle: '\n<총혜택 금액>',
  totalPriceTitle: '\n<할인 후 예상 결제 금액>',
  eventBadgeTitle: '\n<12월 이벤트 배지>',

  badge: {
    star: '별',
    tree: '트리',
    santa: '산타',
  },

  krWon: '원',
});

export default MESSAGES;
