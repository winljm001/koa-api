const router = require('koa-router')()
const AccountController = require('../controllers/account');
router.prefix('/account')

//创建
router.post('/create',AccountController.create);
//更新
router.post('/update',AccountController.update);

//获取详情
router.get('/:id',AccountController.detail)
//删除
router.get('/del/:id',AccountController.del)
//登录
router.post('/login',AccountController.login)

module.exports = router
