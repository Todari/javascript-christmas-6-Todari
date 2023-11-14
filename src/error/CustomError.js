import ERRORS from '../constant/Errors.js';

export class DateTypeError extends Error {
  constructor() {
    super(ERRORS.dateType);
  }
}

export class MenuOrderTypeError extends Error {
  constructor() {
    super(ERRORS.menuOrderType);
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

export class MenuOnlyBeverageError extends Error {
  constructor() {
    super(ERRORS.menuOnlyBeverage);
  }
}

export class MenuNameError extends Error {
  constructor() {
    super(ERRORS.menuNameError);
  }
}

export class MenuTypeError extends Error {
  constructor() {
    super(ERRORS.menuTypeError);
  }
}
export class MenuPriceError extends Error {
  constructor() {
    super(ERRORS.menuPriceError);
  }
}