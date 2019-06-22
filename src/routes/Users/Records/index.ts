import express from 'express';

const router = express.Router();

router.get('/')

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
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

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
 * @apiName get category list
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} category
 *
 * @apiSuccess {array} Categorys category_list
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
