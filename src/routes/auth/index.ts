import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/mongodb/user';
import passport from '../../models/passport';
import jwt_conf from '../../private/jwt/jwt_config';

const router = express.Router();
const saltRounds = 10;

/**
 * @api {post} /auth/register register
 * @apiName register
 * @apiGroup Auth
 *
 * @apiParam {String} id Users unique ID.
 * @apiParam {String} pw Users PassWord,
 * @apiParam {Number} mem_power Users Memory Power(1,2,3).
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *     }
 *
 * @apiError DuplicatedID ID is duplicated
 * @apiError IncorrectID ID foramt is incorrect
 * @apiError IncorrectPW PW foramt is incorrect
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "DuplicatedID"
 *     }
 */

router.post('/register', (req: any, res: any) => {
  const receiveID = req.body.id;
  const plainPW = req.body.pw;
  let hashPassword: string;
  bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
    bcrypt.hash(plainPW, salt).then((hash: string) => {
      hashPassword = hash;
      UserModel.findOne({ id: receiveID}, (err: any, user: any) => {
        if (user === null) {
          UserModel.create({id: receiveID, pw: hashPassword, mem_power: req.body.mem_power});
          res.status(200).json({success: true});
        } else {
          res.status(202).json({error: 'DuplicatedID'});
        }
      });
    });
  });

  // have to check id, pw, mem_power

  // email dup check and create

});

/**
 * @api {post} /auth/login login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} id Users unique ID.
 * @apiParam {String} pw Users Password,
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} jwtToken jwttoken 
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
 *     HTTP/1.1 202 Accept
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
      return res.status(202).json({ err: 'LoginFailed' });
    }
    req.login(user, {session: false}, (loginErr: any) => {
      if (loginErr) {
        return res.status(202).json({ err: 'LoginFailed' });
      }
      const token = jwt.sign({userinfo: user}, jwt_conf.jwtSecret);
      // res.cookie('Authorization', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
      return res.status(200).json({success: true, jwtToken: token});
    });
  })(req, res, next);
});

export default router;
