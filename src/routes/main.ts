import express from 'express';
import AuthRouter from './auth/index';
import UsersRouter from './Users/index';

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  res.render('apidoc/index');
});

router.use('/auth', AuthRouter);
router.use('/Users', UsersRouter);
router.get('/login',(req: any, res: any, next: any) => {
  res.render('login');
});
router.get('/register',(req: any, res: any, next: any) => {
  res.render('regiser');
});

export default router;
