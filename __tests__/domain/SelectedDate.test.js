import SelectedDate from '../../src/SelectedDate.js';
import { SelectedDateTypeError } from '../../src/error/CustomError.js';

describe('SelectedDate/#validate 생성 예외테스트', () => {
  test.each(['월요일', 'one', ' ', '$$', '3.14'])(
    '날짜가 숫자 형식이어야 한다. 그렇지 않으면 SelectedDateTypeError를 반환해야 한다.',
    input => {
      expect(() => new SelectedDate(input)).toThrowError(SelectedDateTypeError);
    },
  );

  test.each(['-1', '0', '32', '40', '50'])(
    '날짜가 1이상 31이하여야 한다. 그렇지 않으면 SelectedDateTypeError를 반환해야 한다.',
    input => {
      expect(() => new SelectedDate(input)).toThrowError(SelectedDateTypeError);
    },
  );
});

describe('SelectedDate/hasStar 별 표시 날짜 반환 테스트', () => {
  test.each(['3', '10', '17', '24', '25', '31'])(
    '별표시가 있는 날짜의 경우, true를 반환한다.',
    input => {
      const date = new SelectedDate(input);
      expect(date.hasStar()).toEqual(true);
    },
  );
  test.each(['1', '4', '18', '23', '28', '30'])(
    '별표시가 없는 날짜의 경우, flase를 반환한다.',
    input => {
      const date = new SelectedDate(input);
      expect(date.hasStar()).toEqual(false);
    },
  );
});

describe('SelectedDate/isWeekend 주말 여부 반환 테스트', () => {
  test.each(['1', '2', '8', '9', '15', '16', '22', '23', '29', '30'])(
    '주말(금, 토)인 날짜의 경우, true를 반환한다.',
    input => {
      const date = new SelectedDate(input);
      expect(date.isWeekend()).toEqual(true);
    },
  );
  test.each(['3', '4', '11', '13', '18', '20', '25', '27', '28', '31'])(
    '평일(일 ~ 목)인 날짜의 경우, flase를 반환한다.',
    input => {
      const date = new SelectedDate(input);
      expect(date.isWeekend()).toEqual(false);
    },
  );
});
