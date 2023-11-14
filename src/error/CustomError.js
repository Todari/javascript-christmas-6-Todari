import ERROR from '../constant/Error.js';

export class DateTypeError extends Error {
  constructor() {
    super(ERROR.dateType);
  }
}

export class MenuOrderTypeError extends Error {
  constructor() {
    super(ERROR.menuOrderType);
  }
}

export class MenuDuplicatedError extends Error {
  constructor() {
    super(ERROR.menuDuplicated);
  }
}

export class MenuNotExistError extends Error {
  constructor() {
    super(ERROR.menuNotExist);
  }
}

export class MenuAmountError extends Error {
  constructor() {
    super(ERROR.menuAmount);
  }
}

export class MenuOnlyBeverageError extends Error {
  constructor() {
    super(ERROR.menuOnlyBeverage);
  }
}

export class MenuNameError extends Error {
  constructor() {
    super(ERROR.menuName);
  }
}

export class MenuTypeError extends Error {
  constructor() {
    super(ERROR.menuType);
  }
}
export class MenuPriceError extends Error {
  constructor() {
    super(ERROR.menuPrice);
  }
}

export class EventTypeError extends Error {
  constructor() {
    super(ERROR.eventType);
  }
}
export class EventStatusError extends Error {
  constructor() {
    super(ERROR.eventStatus);
  }
}
export class EventAmountError extends Error {
  constructor() {
    super(ERROR.eventAmount);
  }
}

export class EventNotExistError extends Error {
  constructor() {
    super(ERROR.eventNotExist);
  }
}
