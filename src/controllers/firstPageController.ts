// first page layout controller

import FirstPage from '@/models/firstPageModel';

import { factoryController } from '@/controllers/factoryController';

export const firstPageController = factoryController(FirstPage, 'firstPageID');
