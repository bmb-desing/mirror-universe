import { Router } from 'express'
import {post, category, sequelize, comment} from "../model";
import {askMail} from "../mails/askMail";
const router = Router()

router.get('/post-index', function (req, res, next) {
    post.findAll({limit: 7, order: [['createdAt', 'DESC']],  include: [{model:category}, {model:comment, attributes: ['id']}]}).then((posts) => {
        res.json(posts)
    })
})
router.get('/posts', function (req, res, next) {
    post.findAndCountAll({ limit: 7, offset: 7 * (req.query.page-1 || 0), include: [{model: category},{model:comment, attributes: ['id']}] , order: [['createdAt', 'DESC']]}).then(posts => {
        if (req.query.page <= parseInt(posts.count/7)) {
            res.json({posts: posts.rows, count: parseInt(posts.count / 7)})
        }
        else {
            res.sendStatus(404)
        }
    })
})
router.get('/post/:category', function (req,res,next) {
    category.findOne({
        where: {
            alias: req.params.category
        }
    }).then(cat => {
        if(cat) {
            post.findAndCountAll({where: {catId: cat.id }, include: [{model:category}, {model:comment, attributes: ['id']}], limit: 7, offset: 7 * (req.query.page-1 || 0) , order: [['createdAt', 'DESC']]}).then(posts => {
                const count = parseInt(posts.count/7)
                res.json({posts: posts.rows, count: count, cat: cat})
            })
        }
        else {
            res.sendStatus(404)
        }
    })
})
router.get('/post/:category/:post', function (req, res, next) {
    post.findOne(
        {
            where:
                {
                    alias: req.params.post
                },
            include: [
                {
                    model: category,
                    where:
                        {
                            alias: req.params.category
                        }
                }
                ]
        }).then((item) => {
        if (item) {
            comment.findAll(
                {
                    where:
                    {
                        postId: item.id
                    }
                }).then((comments) => {
                post.findAll({where: {catId: item.catId }, order: [[sequelize.fn(('RAND'))]], limit: 2}).then((rand) => {
                    res.json({post: item, rand: rand, comments: comments})
                })
            })


        }
        else {
            res.sendStatus(404)
        }
    })
})
router.post('/addRating', function (req,res,next) {
    if (!req.session.rating) {
        req.session.rating = []
    }
    if (req.session.rating.indexOf(req.body.id) == -1) {
        post.findOne({where: {id: req.body.id}}).then((item) => {
            if (item) {
                const count = item.ratingCount + 1
                const rating= req.body.rating + item.rating
                item.update({
                    rating: rating,
                    ratingCount: count
                }).then((status) => {
                    req.session.rating.push(req.body.id)
                    res.json(req.body.id)
                })
            }
            else {
                res.sendStatus(404)
            }
        })
    }
    else {
        res.sendStatus(403)
    }
})
router.post('/addVisit', function (req,res,next) {
	if (!req.session.visits) {
		req.session.visits = []
	}
	if (req.session.visits.indexOf(req.body.id) == -1) {
		post.findOne({where: {id: req.body.id}}).then((item) => {
			if (item) {
				const count = item.visits + 1
				item.update({
					visits: count
				}).then((status) => {
					req.session.visits.push(req.body.id)
					res.json(req.body.id)
				})
			}
			else {
				res.sendStatus(404)
			}
		})
	}
	else {
		res.sendStatus(403)
	}
})
router.post('/addComment', function (req, res, next) {
    comment.create({
        name: req.body.name,
        text: req.body.text,
        postId: req.body.postId,
        parent_id: req.body.parent_id
    }).then((comment) => {
        res.json(comment)
    }).catch((err) => {
        res.sendStatus(403)
    })
})
router.get('/sidebar', function (req, res, next) {
  post.findAll({
		order: [['rating', 'DESC']],
		limit: 3,
    include: [
      {
          model: category
      }
    ]
  }).then(posts => {
      comment.findAll({
				order: [['createdAt', 'DESC']],
				limit: 5,
        include: [
          {
              model: post,
            include: [ {
                  model: category
            }]
          },
        ]
      }).then(com => {
        res.json({
          posts: posts,
          comments: com
        })
      })
  })
})
router.post('/ask', askMail)
export default router