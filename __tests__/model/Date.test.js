import { SETTING } from '../../src/constant/index.js';
import { Date } from '../../src/model/index.js';
import { DateTypeError } from '../../src/error/CustomError.js';

describe('Date model 단위테스트', () => {
  const WEEKEND = [['1', '2', '8', '9', '15', '16', '22', '23', '29', '30']];
  const WEEKDAY = [['3', '4', '5', '6', '7', '10', '11', '12', '13', '14', '17', '18', '19', '20', '21', '24', '25', '26', '27', '28', '31']];
  const STARDAY = [['3', '10', '17', '24', '25', '31']];
  const NOSTARDAY = [['1', '2', '4', '5', '6', '7', '8', '9', '11', '12', '13', '14', '15', '16', '18', '19', '20', '21', '22', '23', '26', '27', '28', '29', '30']];

  test.each([['3.1', '일', 'monday', '_', 3]])(
    'date는 string 내부의 숫자 형식이어야 한다. 그렇지 않으면 DateTypeError을 반환해야 한다.',
    input => {
      expect(() => new Date(input)).toThrowError(DateTypeError);
    },
  );

  test.each([['0', '32', '33', '34', '35']])(
    `date는 ${SETTING.date.minimun}이상 ${SETTING.date.maximum}이하여야 한다. 그렇지 않으면 DateTypeError을 반환해야 한다.`,
    input => {
      expect(() => new Date(input)).toThrowError(DateTypeError);
    },
  );

  test.each(STARDAY)(
    'Date/hasStar 을 통해 별이 있는 날짜인 경우 true를 반환해야 한다.',
    input => {
      expect(new Date(input).hasStar()).toEqual(true);
    },
  );

  test.each(NOSTARDAY)(
    'Date/hasStar 을 통해 별이 없는 날짜인 경우 false를 반환해야 한다.',
    input => {
      expect(new Date(input).hasStar()).toEqual(false);
    },
  );

  test.each(WEEKEND)(
    'Date/isWeekend 을 통해 주말인 날짜인 경우 true를 반환해야 한다.',
    input => {
      expect(new Date(input).isWeekend()).toEqual(true);
    },
  );

  test.each(WEEKDAY)(
    'Date/isWeekend 을 통해 평일 날짜인 경우 false를 반환해야 한다.',
    input => {
      expect(new Date(input).isWeekend()).toEqual(false);
    },
  );

  const INPUT = [['1', '2', '3', '5', '8', '13', '21']];
  test.each(INPUT)('Date/get 을 통해 올바른 날짜를 반환해야 한다.', input => {
    expect(new Date(input).get()).toEqual(Number(input));
  });
});
