import ERRORS from '../constant/Errors.js';

const errorMessage = (message, input) => `${message} 입력값 : ${input}`;

export class DateTypeError extends Error {
  constructor(input) {
    super(errorMessage(ERRORS.dateType, input));
  }
}
