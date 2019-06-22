import express from 'express';

const router = express.Router();

router.get('/')

/**
 * @api {get} /:id/records get Records
 * @apiName get category list
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiSuccess {array} Records category_list
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Records": {
 * ['category1', 'category2' ...],
 *     }
 * @apiError cannot create category
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */

/**
 * @api {post} /:id/records post record
 * @apiName post record
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} title titlename
 * @apiParam {String} link link(not essential)
 * @apiParam {String} content contetn
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

/**
 * @api {get} / get category
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

/**
 * @api {get} / get category
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
