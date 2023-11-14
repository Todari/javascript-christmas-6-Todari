import { MissionUtils } from '@woowacourse/mission-utils';
import GetOrder from '../../src/domain/GetOrder.js';
import SETTING from '../../src/constant/Setting.js';
import REGEXP from '../../src/constant/RegExp.js';
import ERRORS from '../../src/constant/Errors.js';

const mockQuestions = inputs => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const CORRECT_DATE = '3';
const CORRECT_MENUS = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';

describe('GetOrder domain 단위테스트', () => {
  test('GetOrder/startOrder 을 통해 정상적인 경우 date와 menus를 성공적으로 입력받아야 한다.', () => {
    mockQuestions([CORRECT_DATE, CORRECT_MENUS]);
    expect(() => new GetOrder().startOrder()).not.toThrowError();
  });

  test.each([['3.1', '일', 'monday', '_', 3]])(
    'GetOrder/startOrder 에서 Date가 string 내부의 숫자 형식이어야 한다. 그렇지 않으면 DateTypeError을 반환해야 한다.',
    async input => {
      const logSpy = getLogSpy();
      mockQuestions([input, CORRECT_DATE, CORRECT_MENUS]);

      await new GetOrder().startOrder();

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(ERRORS.dateType),
      );
    },
  );

  test.each([['0', '32', '33', '34', '35']])(
    `GetOrder/startOrder 에서 Date가 ${SETTING.date.minimun}이상 ${SETTING.date.maximum}이하여야 한다. 그렇지 않으면 DateTypeError을 반환해야 한다.`,
    async input => {
      const logSpy = getLogSpy();
      mockQuestions([input, CORRECT_DATE, CORRECT_MENUS]);

      await new GetOrder().startOrder();

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(ERRORS.dateType),
      );
    },
  );

  test.each([
    [
      '티본스테이크 1개,바비큐립 1개',
      '티본스테이크-1,바비큐립-1,초코케이크-0',
      '티본스테이크,바비큐립,초코케이크',
      '티본스테이크-1개,바비큐립-1개,초코케이크-1개',
      '티본스테이크-1바비큐립-1초코케이크-1',
    ],
  ])(
    `GetOrder/startOrder 에서 Menu가 ${REGEXP.menus}와 같은 형식이어야 한다. 그렇지 않으면 MenuOrderTypeError를 반환해야 한다.`,
    async input => {
      const logSpy = getLogSpy();
      mockQuestions([CORRECT_DATE, input, CORRECT_MENUS]);

      await new GetOrder().startOrder();

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(ERRORS.menuOrderType),
      );
    },
  );
});
