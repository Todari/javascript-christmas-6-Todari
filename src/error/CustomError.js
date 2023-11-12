import ERRORS from '../constant/Errors.js';

const errorMessage = (message, input) => `${message} 입력값 : ${input}`;

export class DateTypeError extends Error {
  constructor(input) {
    super(errorMessage(ERRORS.dateType, input));
  }
}

export class MenuTypeError extends Error {
  constructor(input) {
    super(errorMessage(ERRORS.menuType, input));
  }
}

export class MenuDuplicatedError extends Error {
  constructor(input) {
    super(errorMessage(ERRORS.menuDuplicated, input));
  }
}

export class MenuNotExistError extends Error {
  constructor(input) {
    super(errorMessage(ERRORS.menuNotExist, input));
  }
}
