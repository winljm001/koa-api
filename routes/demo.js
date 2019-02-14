const router = require('koa-router')()
const DemoController = require('../controllers/demo');
router.prefix('/demo')

//创建
router.post('/create',DemoController.create);
//更新
router.post('/update',DemoController.update);

//获取详情
router.get('/:id',DemoController.detail)
//删除
router.get('/del/:id',DemoController.del)

module.exports = router
