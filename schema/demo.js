module.exports = function(sequelize,DataTypes){
    return sequelize.define('demo',{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        //文章标题
        title:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即demo
         * 如果为fasle，mysql创建的表名称会是复数，即demos
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true,
        /**
         * 是否自动添加时间戳
         */
        timestamps: true
    });
}