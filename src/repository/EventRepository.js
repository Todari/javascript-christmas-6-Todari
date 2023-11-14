import Event from '../model/Event.js';
import EVENT_LIST from '../constant/EventList.js';
import { EventNotExistError } from '../error/CustomError.js';

export default class EventRepository {
  static #events = this.#initEventRepository();

  static #initEventRepository() {
    const result = [];
    Object.keys(EVENT_LIST).forEach(key => {
      result.push(
        new Event(
          EVENT_LIST[key].type,
          EVENT_LIST[key].status,
          EVENT_LIST[key].amount,
        ),
      );
    });
    return result;
  }

  static getEventByType(type) {
    const result = this.#events.find(event => event.getType() === type);
    if (result === undefined) {
      throw new EventNotExistError();
    }
    return result;
  }

  static get() {
    return this.#events;
  }
}
