const SETTING = Object.freeze({
  date: {
    minimun: 1,
    maximum: 31,
    christmas: 25,
    friday: 1,
    saturday: 2,
    sunday: 3,
  },
  weekDays: 7,

  locale: 'ko-KR',
  menuSplit: ',',
  menuAmountSplit: '-',

  maximumMenusAmount: 20,
  minimumApplyEventPrice: 10000,

  christmasDiscount: { default: -1000, forDay: -100 },
  weekDiscount: -2023,
  specialDiscount: -1000,

  minimumPresentPrice: 120000,
  presentMenu: '샴페인',

  minimumAmountBadge: {
    santa: -20000,
    tree: -10000,
    star: -5000,
  },
});

export default SETTING;
