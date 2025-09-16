import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('Должен логировать сообщение в формате JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message', { foo: 'bar' });

    expect(spy).toHaveBeenCalledTimes(1);

    const callArg = JSON.parse(spy.mock.calls[0][0]);

    expect(callArg).toEqual(
      expect.objectContaining({
        level: 'log',
        message: 'test message',
        optionalParams: [{ foo: 'bar' }],
      }),
    );

    spy.mockRestore();
  });

  it('Должен логировать ошибки', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('oops!', { code: 500 });

    expect(spy).toHaveBeenCalledTimes(1);

    const callArg = JSON.parse(spy.mock.calls[0][0]);

    expect(callArg).toEqual(
      expect.objectContaining({
        level: 'error',
        message: 'oops!',
        optionalParams: [{ code: 500 }],
      }),
    );

    spy.mockRestore();
  });
});
