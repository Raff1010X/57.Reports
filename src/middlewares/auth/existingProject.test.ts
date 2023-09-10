import AppError from '@/utils/appError';
import existingProject from './existingProject';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { Codes } from '@/types/apiResponse';
import Project from '@/models/projectModel';

jest.mock('@/models/projectModel', () => ({
    find: jest.fn(),
}));

describe('existingProject middleware', () => {
    let req: Partial<NextApiRequest>;
    let res: Partial<NextApiResponse>;
    let next: NextApiHandler;

    beforeEach(() => {
        jest.clearAllMocks();
        req = { body: { project: 'existing-project' } };
        res = {};
        next = jest.fn();
    });

    it('should call next if project does not exist in database', async () => {
        (Project.find as jest.Mock).mockResolvedValue(null);
        await existingProject(
            req as NextApiRequest,
            res as NextApiResponse,
            next
        );
        expect(next).toHaveBeenCalledWith(req, res);
    });

    it('should throw AppError with conflict code if project already exists in database', async () => {
        (Project.find as jest.Mock).mockResolvedValue('existing-project');
        await expect(
            existingProject(req as NextApiRequest, res as NextApiResponse, next)
        ).rejects.toEqual(
            new AppError(
                Codes.Conflict,
                `Project already exists! Change name of project.`
            )
        );
    });
});