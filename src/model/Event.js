export default class Event {
  #type;
  #status;
  #amount;

  constructor(type, status, amount) {
    this.#type = type;
    this.#status = status;
    this.#amount = amount;
  }

  setAmount(amount) {
    this.#amount = amount;
  }

  setStatus(bool) {
    this.#status = bool;
  }

  getAmount() {
    return this.#amount;
  }

  getStatus() {
    return this.#status;
  }

  print() {
    return `${this.#type}: ${this.#amount.toLocaleString('ko-KR')}원`;
  }
}
