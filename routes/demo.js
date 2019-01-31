const router = require('koa-router')()
const DemoController = require('../controllers/demo');
router.prefix('/demo')

//创建
router.post('/demo/create',DemoController.create);
//更新
router.post('/demo/update',DemoController.update);

//获取详情
router.get('/demo/:id',DemoController.detail)
//删除
router.get('/demo/del/:id',DemoController.del)

module.exports = router
