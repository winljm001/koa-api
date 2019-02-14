const AccountModel = require("../modules/account");
const jwt     = require('jsonwebtoken'); // 用于签发、解析`token`
const {secret,saltStr } = require('../config/base')
const md5 = require('md5')
class AccountController {
    /**
     * 创建账号
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        if(req.account&&req.password&&req.accountType){
            try{
                let verifyData = await AccountModel.findAllAccount({account:req.account});
                if(verifyData.length>0){
                    ctx.response.status = 400;
                    ctx.body = {
                        code: 400,
                        msg: '账户已存在'
                    }
                }else{
                    req.password=md5(req.password+saltStr)
                    //创建账号模型
                    const ret = await AccountModel.createAccount(req);
                    //使用刚刚创建的文章ID查询文章详情，且返回账号详情信息
                    const data = await AccountModel.getAccountDetail(ret.id);
    
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        msg: '创建成功',
                        data
                    }
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
                let data = await AccountModel.getAccountDetail(id);
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
                msg: 'AccountID必须传'
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
                let data = await AccountModel.del(id);
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
                msg: 'AccountID必须传'
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
                const ret = await AccountModel.update(req);
                const data = await AccountModel.getAccountDetail(req.id);

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
    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx){
        let req = ctx.request.body;
        if(req.password&&req.account){
            try{
                let data = await AccountModel.findAllAccount({account:req.account});
                if(data.length>0){
                    if(md5(req.password+saltStr)!==data[0].password){
                        ctx.response.status = 400;
                        ctx.body = {
                            code: 190010,
                            msg: '账号认证失败，帐户或密码错误'
                        }
                    }else{
                        ctx.response.status = 200;
                        delete data[0]['password'];
                        
                        ctx.body = {
                            code: 200,
                            msg: '查询成功',
                            data:{
                                token:getToken({ account: req.account, password: req.password }),
                                info:data[0]
                            }
                        }
                    }
                }else{
                    ctx.response.status = 400;
                    ctx.body = {
                        code: 400,
                        msg: '账号不存在'
                    }
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
                msg: 'AccountID必须传'
            }
        }
    }
}
/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
    return jwt.sign(payload, secret, { expiresIn: '4h' });
}
module.exports = AccountController;