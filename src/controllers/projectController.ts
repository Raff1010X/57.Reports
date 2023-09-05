// Project controller

import Project from '../models/projectModel';
import { factoryController } from './factoryController';

export const projectController = factoryController(Project, 'projectID');
