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
    super(ERRORS.menuName);
  }
}

export class MenuTypeError extends Error {
  constructor() {
    super(ERRORS.menuType);
  }
}
export class MenuPriceError extends Error {
  constructor() {
    super(ERRORS.menuPrice);
  }
}

export class EventTypeError extends Error {
  constructor() {
    super(ERRORS.eventType);
  }
}
export class EventStatusError extends Error {
  constructor() {
    super(ERRORS.eventStatus);
  }
}
export class EventAmountError extends Error {
  constructor() {
    super(ERRORS.eventAmount);
  }
}

export class EventNotExistError extends Error {
  constructor() {
    super(ERRORS.eventNotExist);
  }
}