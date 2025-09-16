import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Должен логировать в формате TSKV', () => {
    const spy = jest.spyOn(console, 'log');
    logger.log('hello', 'world');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('level=log'));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('message=hello'));
  });
});
