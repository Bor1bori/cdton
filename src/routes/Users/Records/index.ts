import express from 'express';
import passport from 'passport';
import RecordModel from '../../../models/mongodb/record';
import UserModel from '../../../models/mongodb/user';

const router = express.Router();

/**
 * @api {get} /Users/:id/records get Records
 * @apiName get records list
 * @apiGroup Records
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiSuccess {array} Records records_list
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Records": [{
 *            _id: "AAAAAAAAAAAAAAAAA",
 *            index: 12
 *            title: "mytitle",
 *            link: "http://somedomain.some",
 *            conent: "mytitle means this is my title",
 *            category: "default",
 *            alarm_status: 1,
 *            retrieve_num: 1,
 *            base_time: Date,
 *            retention: 70
 *            },
 *            {
 *            _id: "BBBBBasdfBBBBB",
 *            ..
 *            ..
 *            }, ...]
 *
 * @apiError 403 forbidden
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "error": "amtn errorim"
 *     }
 */

/**
 * @api {post} /Users/:id/records post record
 * @apiName post record
 * @apiGroup Records
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} title titlename
 * @apiParam {String} link link(not essential)
 * @apiParam {String} content content
 * @apiParam {String} category
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 * @apiError cannot create record
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

router.post('/', (req: any, res: any, next: any) => {
  console.log(111111);
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user || (user.id !== req.params.id)){
      console.log('TTTT');
      res.status(403).json({error: 'amtn errorim'});
    } else {
      console.log('got : ' + user.id);
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if(userInDb === null) {
          res.status(403).json({error: 'amtn errorim'});
        } else {
          console.log('22got : ' + userInDb.id);
          const instance: any = new RecordModel();
          instance.title = req.body.title;
          instance.link = req.body.link;
          instance.content = req.body.content;
          instance.category = req.body.category;
          instance.base_time = Date();
          instance.retention = 100;
          RecordModel.findOne().sort('-index')
          .exec((err: any, record: any) => {
            instance.index = record.index+1;
            console.log(instance.index);
            instance.save()
            res.status(200).json({success: true});
          });
        }
      }
      );
}}
)});

/**
 * @api {put} /Users/:id/records/:record_index put record
 * @apiName modify a record
 * @apiGroup Records
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} title titlename
 * @apiParam {String} link link(not essential)
 * @apiParam {String} content content
 * @apiParam {String} category
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 * @apiError cannot create record
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

/**
 * @api {delete} /Users/:id/records/:record_index get category
 * @apiName delete a record
 * @apiGroup Records
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {Number} index record_index
 *
 * @apiSuccess {Boolean} Success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Success": true
 *     }
 * @apiError cannot create category
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

export default router;
