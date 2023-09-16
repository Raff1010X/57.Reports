// Page layout controller

import PageLayout from '../models/pageLayoutModel';

import { factoryController } from './factoryController';

export const pageLayoutController = factoryController(PageLayout, 'pageLayoutID');