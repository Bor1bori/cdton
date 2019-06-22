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
 *       "records": [{
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
router.get('/:id/records', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user || (user.id !== req.params.id)) {
      res.status(403).json({success: false});
    } else {
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if (userInDb === null) {
          res.status(403).json({success: false});
        } else {
          const userRecords: any = [];
          const now: any = new Date();
          for (let i = 0; i < userInDb.records.length; i++) {
            RecordModel.findOne({index: userInDb.records[i]}, (err3: any, recordDb: any) => {
              const t = (now - recordDb.base_time) / (1000 * 60 * 60 * 24);
              recordDb.retention = Math.exp( -t / (recordDb.retrieve_num * userInDb.mem_power));
              recordDb.retrieve_num = recordDb.retrieve_num + 1;
              userRecords.push(recordDb);
              console.log('iiii', userRecords);
              recordDb.save();
            });
          }
          console.log('jjjj', userRecords);
          res.status(200).json({records: userRecords});
        }
      });
    };
  })(req, res, next);
});


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
 *     HTTP/1.1 403 forbidden
 *     {
 *       "error": "amtn errorim"
 *     }
 */

router.post('/:id/records', (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user || (user.id !== req.params.id)) {
      res.status(403).json({error: 'amtn errorim'});
    } else {
      UserModel.findOne({id: user.id}, (err2: any, userInDb: any) => {
        if(userInDb === null) {
          res.status(403).json({error: 'amtn errorim'});
        } else {
          const instance: any = new RecordModel();
          instance.title = req.body.title;
          instance.link = req.body.link;
          instance.content = req.body.content;
          instance.category = req.body.category;
          instance.base_time = new Date();
          instance.retention = 100;
          RecordModel.findOne().sort('-index')
          .exec((err: any, record: any) => {
            if (record) {
              instance.index = record.index + 1;
            } else {
              instance.index = 1;
            }
            userInDb.records.push(instance.index);
            instance.save();
            userInDb.save();
            res.status(200).json({success: true});
          });
        }
      });
}})(req, res, next);
});

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
