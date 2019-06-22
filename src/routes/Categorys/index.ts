/**
 * @api {get} /
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
 *       "Categorys": ['category1', 'category2' ...],
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
 * @api {post} /
 * @apiName category create
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 *
 * @apiParam {String} category
 *
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
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
 * @api {delete} /:category
 * @apiName category delete
 * @apiGroup category
 *
 * @apiHeader {String} Authorization jwtToken;
 * =
 * @apiSuccess {Boolean} success true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *     }
 * @apiError cannot create category
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 202 Accept
 *     {
 *       "error": "amtn errorim"
 *     }
 */