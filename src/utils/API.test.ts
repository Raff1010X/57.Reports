import { Codes } from '../types/apiResponse';
import { checkStatus } from './API.js';

describe('checkStatus', () => {
  it('returns true when given an existing status code', () => {
    expect(checkStatus(Codes.OK)).toBe(true);
  });

  it('returns false when given a non-existing status code', () => {
    expect(checkStatus(223)).toBe(false);
  });

  it('returns false when given a non-numeric value', () => {
    expect(checkStatus('error')).toBe(false);
  });
});
