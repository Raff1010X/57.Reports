import { SuperUser } from '@/models/userModel';
import AppError from '@/utils/appError';
import existingUser from './existingUser';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { Codes } from '@/types/apiResponse';

const mockUser = {
    _id: 'abc123',
    email: 'existing-email',
};

jest.mock('@/models/userModel', () => ({
    findOne: jest.fn(),
}));

describe('existingUser middleware', () => {
    let req: Partial<NextApiRequest>;
    let res: Partial<NextApiResponse>;
    let next: NextApiHandler;

    beforeEach(() => {
        jest.clearAllMocks();
        req = { body: { email: 'existing-email' } };
        res = {};
        next = jest.fn();
    });

    it('should call next if user does not exist in database', async () => {
        (SuperUser.findOne as jest.Mock).mockResolvedValue(null);
        await existingUser(req as NextApiRequest, res as NextApiResponse, next);
        expect(next).toHaveBeenCalledWith(req, res);
    });

    it('should throw AppError with conflict code if user already exists in database', async () => {
        (SuperUser.findOne as jest.Mock).mockResolvedValue(mockUser);
        await expect(
            existingUser(req as NextApiRequest, res as NextApiResponse, next)
        ).rejects.toEqual(new AppError(Codes.Conflict, `User already exists!`));
    });
});
