import express from 'express';
import passport from '../../models/passport';

const router = express.Router();

/**
 * @api {get} /Users/:id getUserInfo
 * @apiName getUserInfo
 * @apiGroup Users
 *
 * @apiHeader {String} Cookies Authorization={$jwtToken};
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message "hello, {$id}"
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "message": "Hello, aabbcc"
 *     }
 *
 * @apiError {Bollean} success false
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "success": "false"
 *     }
 */

router.get('/:id', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user || (user.id !== req.params.id)) {
      res.status(403).json({success: false});
    } else {
      res.status(200).json({success: true, massage: `Hello!, ${user.id}`});
    }
  })(req, res, next);
});

export default router;
