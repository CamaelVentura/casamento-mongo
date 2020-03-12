import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import { show, store, index, update } from './app/controllers/GuestController';
import { update as up, index as id } from './app/controllers/ConfirmController';
import { store as st, index as i } from './app/controllers/PlacesController';
import { store as sI } from './app/controllers/ImageController';
import * as Message from './app/controllers/MessageController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/convidados', store);
routes.get('/convidados', index);
routes.put('/convidados/:name', update);

routes.post('/confirmar', show);
routes.put('/confirmar/:name', up);
routes.get('/confirmados', id);

routes.get('/dicas', i);
routes.post('/dicas', st);
routes.post('/dicas/img/:id', upload.single('file'), sI);

routes.get('/mural', Message.index);
routes.post('/recado', Message.store);

export default routes;
