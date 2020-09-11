module.exports =(sequelize, DataTypes) => {
    const Media = sequelize.define('media', {
        type:{
            type:DataTypes.STRING,
            allowNull: false
        },
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
		},
		rated: {
			type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        },
        consumed: {
            type: DataTypes.STRING
        },
        platform: {
            type: DataTypes.STRING
        },
        userId: {
			type: DataTypes.INTEGER,
			allowNull: false
        }

    })
    return Media;
}