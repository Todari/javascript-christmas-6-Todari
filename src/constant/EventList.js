import MESSAGES from './Messages.js';

const EVENT_LIST = Object.freeze({
  christmasDiscount: {
    type: MESSAGES.christmasDiscount,
    status: false,
    amount: 0,
  },

  weekdayDiscount: {
    type: MESSAGES.weekdayDiscount,
    status: false,
    amount: 0,
  },
  weekendDiscount: { type: MESSAGES.weekendDiscount, status: false, amount: 0 },
  specialDiscount: { type: MESSAGES.specialDiscount, status: false, amount: 0 },
  presentChampagne: {
    type: MESSAGES.presentDiscount,
    status: false,
    amount: 0,
  },
});

export default EVENT_LIST;
