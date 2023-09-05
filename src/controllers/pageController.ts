// Page controller

import Page from '../models/pageModel';
import { factoryController } from './factoryController';

export const pageController = factoryController(Page, 'pageID');
