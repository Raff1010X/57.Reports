import checkPassword from './checkPassword';
import { Codes } from '../../types/apiResponse';
import AppError from '../../utils/appError';

// create mocks for NextApiRequest and NextApiResponse interfaces
const req = {} as any;
const res = {
  status: jest.fn(),
  end: jest.fn()
} as any;
const next = jest.fn();

describe('checkPassword middleware', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if password is between 8 and 50 characters long', async () => {
    // arrange
    req.body = { password: 'abc12345' }; // valid password

    // act
    await checkPassword(req, res, next);

    // assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(req, res);
  });

  it('should throw an error with status 400 (Bad Request) if password is less than 8 characters long', async () => {
    // arrange
    req.body = { password: 'abc123' }; // invalid password

    // act and assert
    await expect(checkPassword(req, res, next)).rejects.toThrow(new AppError(Codes.BadRequest, 'Password should be between 8 and 50 characters long'));
  });

  it('should throw an error with status 400 (Bad Request) if password is more than 50 characters long', async () => {
    // arrange
    req.body = { password: 'a'.repeat(51) }; // invalid password

    // act and assert
    await expect(checkPassword(req, res, next)).rejects.toThrow(new AppError(Codes.BadRequest, 'Password should be between 8 and 50 characters long'));
  });

});
