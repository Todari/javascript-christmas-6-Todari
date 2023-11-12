import ERRORS from '../constant/Errors.js';

export class DateTypeError extends Error {
  constructor() {
    super(ERRORS.dateType);
  }
}

export class MenuTypeError extends Error {
  constructor() {
    super(ERRORS.menuType);
  }
}

export class MenuDuplicatedError extends Error {
  constructor() {
    super(ERRORS.menuDuplicated);
  }
}

export class MenuNotExistError extends Error {
  constructor() {
    super(ERRORS.menuNotExist);
  }
}

export class MenuAmountError extends Error {
  constructor() {
    super(ERRORS.menuAmount);
  }
}
