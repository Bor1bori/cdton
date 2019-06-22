import express from 'express';
import AuthRouter from './auth/index';
import UsersRouter from './Users/index';

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('index');
});

router.use('/auth', AuthRouter);
router.use('/Users', UsersRouter);

export default router;
