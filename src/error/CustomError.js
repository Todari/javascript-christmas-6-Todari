import ERRORS from '../constant/Errors.js';

export class SelectedDateTypeError extends Error {
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

export class MenuOnlyBeverageError extends Error {
  constructor() {
    super(ERRORS.menuOnlyBeverage);
  }
}
