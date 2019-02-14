module.exports = function(sequelize,DataTypes){
    return sequelize.define('account',{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        account:{
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        accountType:{
            type: DataTypes.STRING,
            allowNull: false
        },
        isLocked:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        }
    },{
        freezeTableName: true,
        timestamps: true
    });
}