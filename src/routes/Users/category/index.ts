import express from 'express';
import UserModel from '../../../models/mongodb/user';
import passport from '../../../models/passport';

const router = express.Router();

/**
 * @api {get} /:id/category get category
 * @apiName get category list
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} category
 *
 * @apiSuccess {array} category category_list
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "category": ['category1', 'category2' ...],
 *     }
 * @apiError cannot create category
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

router.get('/', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user){
      res.status(202).json({error: 'amtn errorim'});
    } else {
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if (userInDb === null) {
          res.status(202).json({error: 'amtn errorim'});
        } else {
          res.status(200).json({category: userInDb.category});
        }
      });
    }
  })(req, res, next);
});

/**
 * @api {put} /:id/category edit category
 * @apiName category create
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {Array} category category list ex) ['a' ,'b']
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 * @apiError cannot create category
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

router.put('/', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user) {
      res.status(202).json({error: 'amtn errorim'});
    } else {
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if (userInDb === null) {
          res.status(202).json({error: 'amtn errorim'});
        } else {
          userInDb.category = req.body.category;
          userInDb.save();
          res.status(200).json({success: true});
        }
      });
    }
  })(req, res, next);
});

export default router;
