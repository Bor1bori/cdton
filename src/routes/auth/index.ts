// 에러처리는 포기
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../models/passport';
import UserModel from '../../models/mongodb/user';
import jwt_conf from '../../private/jwt/jwt_config';

const router = express.Router();
const saltRounds = 10;

router.get('/', (req: any, res: any) => {
  res.render('./auth/index');
});

/**
 * @api {post} /register register
 * @apiName register
 * @apiGroup Auth
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} pw Users PassWord,
 * @apiParam {String} nickname Users unique Nickname.
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *     }
 *
 * @apiError DuplicatedEmail Email is duplicated
 * @apiError DuplicatedNickname Nickname is duplicated
 * @apiError IncorrectEmail Email foramt is incorrect
 * @apiError IncorrectPW PW foramt is incorrect
 * @apiError IncorrectNickname Nickname foramt is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DuplicatedId"
 *     }
 */

router.post('/register', (req: any, res: any) => {
  const receiveEmail = req.body.email;
  const plainPassword = req.body.password;
  let hashPassword: string;
  const recieveNickname = req.body.nickname;
  bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
    bcrypt.hash(plainPassword, salt).then((hash: string) => {
      hashPassword = hash;
      createAccount();
    });
  });

  // have to check email, password, nickname

  // email dup check and create
  function createAccount() {
    UserModel.findOne({ email: receiveEmail}, (err: any, user: any) => {
      if (user === null) {
        UserModel.create({email: receiveEmail, password: hashPassword, nickname: recieveNickname});
        res.send('ID is registered\nWelcome ' + recieveNickname);
      } else {
        res.send('ID is exist');
      }
    });
  }
});

/**
 * @api {post} /login login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} email Users unique Email.
 * @apiParam {String} pw Users Password,
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5 ..... P_fJR2wQifJwsaL0"
 *     }
 * @apiError LoginFailed Incorrect ID-PW
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "LoginFailed"
 *     }
 */
router.post('/login', (req: any, res: any, next: any) => {
  passport.authenticate('local', {
    session: false,
    failureRedirect: '/'
  }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(400).json({ err: 'LoginFailed' });
    }
    req.login(user, {session: false}, (loginErr: any) => {
      if (loginErr) {
        return res.status(400).json({ err: 'LoginFailed' });
      }
      const token = jwt.sign({userinfo: user}, jwt_conf.jwtSecret);
      // res.cookie('Authorization', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
      return res.status(200).json({success: true, jwtToken: token});
    });
  })(req, res, next);
});

router.get('/logout', (req: any, res: any) => {
  res.clearCookie('Authorization');
  res.redirect('/');
});
export default router;
