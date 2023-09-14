import Router from '@koa/router';
import FileController from '../controllers/FileController';

const router = new Router();

router.get('/', FileController.init)
router.post('/files', FileController.create);
router.get('/files', FileController.list);
router.get('/files/:id', FileController.read);

export default router;
