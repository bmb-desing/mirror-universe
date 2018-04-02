import Sequelize from 'sequelize'
const sequelize = new Sequelize('mirror', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
})
export const category = sequelize.define('categoties', {
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	alias: {
		type: Sequelize.STRING, unique: true
	},
	thumbnail: Sequelize.STRING
})
export const post = sequelize.define('posts', {
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	alias: {
		type: Sequelize.STRING, unique: true
	},
	thumbnail: Sequelize.STRING,
	text: {
		type: Sequelize.TEXT, allowNull: false
	},
	rating: {
		type: Sequelize.INTEGER, defaultValue: 0
	},
	visits: {
		type: Sequelize.INTEGER, defaultValue: 0
	}
})
export const comment = sequelize.define('comments', {
	name: {
		type: Sequelize.STRING, allowNull: false
	},
	text: {
		type: Sequelize.TEXT, allowNull: false
	},
	parent_id: {
		type: Sequelize.INTEGER, defaultValue: 0
	}
})
category.hasMany(post)
post.belongsTo(category)
post.hasMany(comment)
comment.belongsTo(post)
export default sequelize