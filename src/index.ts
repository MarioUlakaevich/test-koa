import Koa from 'koa';
import bodyParser from "koa-bodyparser"
import router from './router/index';
import {dbConnect} from './db-connect';
import {startScheduler} from './scheduler';

const app = new Koa();

const port = process.env.PORT || 3000

app.use(bodyParser({
  enableTypes: ['json', 'form'],
  formLimit: '10mb',
  jsonLimit: '10mb'
}));

startScheduler();

app.use(router.routes()).use(router.allowedMethods());

dbConnect.sync().then(() => {
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
});
