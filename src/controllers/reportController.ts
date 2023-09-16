// Report controller

import  Report  from '../models/reportModel';

import { factoryController } from './factoryController';

export const reportController = factoryController(Report, 'reportID');
