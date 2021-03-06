import express from 'express';
import UserModel from '../../models/mongodb/user';
import passport from '../../models/passport';
import categoryRouter from './category/index';
import recordsRouter from './Records/index';
const router = express.Router();

/**
 * @api {get} /Users/:id getUserInfo
 * @apiName getUserInfo
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} id user's id
 * @apiSuccess {String} mem_power user's memory power(1,2,3)
 * @apiSuccess {Array} category user's category
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       id: hongildong,
 *       mem_power: 3,
 *       category: ['default', 'math', 'english']
 *     }
 *
 * @apiError {Bollean} success false
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       success: false
 *     }
 */

router.get('/userinfo', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    console.log(user);
    if (err || !user) {
      res.status(403).json({success: false});
    } else {
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if (userInDb === null) {
          res.status(403).json({success: false});
        } else {
          res.status(200).json({
            id: userInDb.id,
            mem_power: userInDb.mem_power,
            category: userInDb.category
          });
        }
      });
    }
  })(req, res, next);
});

router.use('/:id/category', categoryRouter);
router.use('/', recordsRouter);

export default router;
