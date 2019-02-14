// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Account = Sequelize.import('../schema/account');
Account.sync({force: false}); //自动创建表

class AccountModel {
    /**
     * 创建Account模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createAccount(data){
        return await Account.create({
            account: data.account,
            password: data.password,
            accountType: data.accountType
        });
    }

    /**
     * 查询Account的详情
     * @param obj 查询obj
     * @returns {Promise<Model>}
     */
    static async getAccountDetail(obj){
        return await Account.findOne({
            where:obj
        });
    }
    /**
     * 登录
     * @returns {Promise<Model>}
     */
    static async findAllAccount(data){
        return await Account.findAll({
            where:data
        });
    }
    /**
     * 删除
     * @param id AccountID
     * @returns {Promise<Model>}
     */
    static async del(id){
        return await Account.destroy(
            {
                'where':{
                    'id':id
                }
            }
        )
    }
    /**
     * 更新
     * @param data
     * @returns {Promise<Model>}
     */
    static async update(data){
        return await Account.update(
            {
                title: data.title
            }, 
            {
                where: {
                    id: data.id
                }
            }
        )
    }
}

module.exports = AccountModel;