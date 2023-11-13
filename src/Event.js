export default class Event {
  canPresentChampagne(price) {
    if (price >= 120000) {
      return true;
    }

    return false;
  }

  christmasDiscount(date) {
    if (date <= 25) {
      return -1000 - 100 * (date - 1);
    }
    return 0;
  }

  weekdatDiscount(date) {

  }
}
