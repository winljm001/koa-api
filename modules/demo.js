// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Demo = Sequelize.import('../schema/demo');
Demo.sync({force: false}); //自动创建表

class DemoModel {
    /**
     * 创建demo模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createDemo(data){
        return await Demo.create({
            title: data.title
        });
    }

    /**
     * 查询Demo的详情
     * @param id DemoID
     * @returns {Promise<Model>}
     */
    static async getDemoDetail(id){
        return await Demo.findOne({
            where:{
                id
            }
        });
    }
    /**
     * 删除
     * @param id DemoID
     * @returns {Promise<Model>}
     */
    static async del(id){
        return await Demo.destroy(
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
        return await Demo.update(
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

module.exports = DemoModel;