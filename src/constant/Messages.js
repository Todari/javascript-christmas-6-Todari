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

  printMenus: '\n<주문 메뉴>',
  printPreviousPrice: '\n<할인 전 총주문 금액>',
  printPresents: '\n<증정 메뉴>',
  presentChampagne: '샴페인 1개',

  printNoEvents: '없음',
});

export default MESSAGES;
