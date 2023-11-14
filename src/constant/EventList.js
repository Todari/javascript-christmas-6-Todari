import MESSAGE from './Message.js';

const EVENT_LIST = Object.freeze({
  christmasDiscount: {
    type: MESSAGE.christmasDiscount,
    status: false,
    amount: 0,
  },

  weekdayDiscount: {
    type: MESSAGE.weekdayDiscount,
    status: false,
    amount: 0,
  },
  weekendDiscount: { type: MESSAGE.weekendDiscount, status: false, amount: 0 },
  specialDiscount: { type: MESSAGE.specialDiscount, status: false, amount: 0 },
  presentChampagne: {
    type: MESSAGE.presentDiscount,
    status: false,
    amount: 0,
  },
});

export default EVENT_LIST;
