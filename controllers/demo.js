const DemoModel = require("../modules/demo");
const dayjs = require("dayjs");
class demoController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        if(req.title){
            try{
                //创建文章模型
                const ret = await DemoModel.createDemo(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await DemoModel.getDemoDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询文章详情模型
                let data = await DemoModel.getDemoDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data:[]
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: 'DemoID必须传'
            }
        }
    }
    /**
     * 删除
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async del(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                let data = await DemoModel.del(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: data>0?'删除成功':'已删除',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '删除失败',
                    data:[]
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: 'DemoID必须传'
            }
        }
    }
    /**
     * 改
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx){
        let req = ctx.request.body;
        if(req.title){
            try{
                //创建文章模型
                const ret = await DemoModel.update(req);
                const data = await DemoModel.getDemoDetail(req.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '修改失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
}

module.exports = demoController;