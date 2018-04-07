import Sequelize from 'sequelize'
import striptags from 'striptags'
export const sequelize = new Sequelize('mirror', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
})
export const category = sequelize.define('cats', {
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
	shortText: {
        type: Sequelize.TEXT
	},
	rating: {
		type: Sequelize.INTEGER, defaultValue: 0
	},
	ratingCount: {
        type: Sequelize.INTEGER, defaultValue: 0
	},
	visits: {
		type: Sequelize.INTEGER, defaultValue: 0
	}
}, {
	hooks: {
		beforeCreate: (post) => {
			const shortText = striptags(post.text)
			return post.shortText = shortText.substr(0 , 250)
		},
		beforeUpdate: (post) => {
            const shortText = striptags(post.text)
            return post.shortText = shortText.substr(0 , 250)
		}
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