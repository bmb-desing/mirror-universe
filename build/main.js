require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return sequelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return comment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_striptags__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_striptags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_striptags__);



var sequelize = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(process.env.DB_NAME || 'mirror', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
	host: process.env.DB_HOST || 'localhost',
	dialect: 'mysql',
	timezone: "+03:00"
});
var category = sequelize.define('cats', {
	title: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING,
	description: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.TEXT,
	alias: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING, unique: true
	},
	thumbnail: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
});
var post = sequelize.define('posts', {
	title: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING,
	description: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.TEXT,
	alias: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING, unique: true
	},
	thumbnail: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING,
	text: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.TEXT, allowNull: false
	},
	shortText: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.TEXT
	},
	rating: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.INTEGER, defaultValue: 0
	},
	ratingCount: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.INTEGER, defaultValue: 0
	},
	visits: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.INTEGER, defaultValue: 0
	},
	telegramSend: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.BOOLEAN, defaultValue: 0
	}
}, {
	hooks: {
		beforeCreate: function beforeCreate(post) {
			var shortText = __WEBPACK_IMPORTED_MODULE_1_striptags___default()(post.text);
			return post.shortText = shortText.substr(0, 250);
		},
		beforeUpdate: function beforeUpdate(post) {
			var shortText = __WEBPACK_IMPORTED_MODULE_1_striptags___default()(post.text);
			return post.shortText = shortText.substr(0, 250);
		}
	}
});
var comment = sequelize.define('comments', {
	name: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING, allowNull: false
	},
	text: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.TEXT, allowNull: false
	},
	parent_id: {
		type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.INTEGER, defaultValue: 0
	}
});
category.hasMany(post);
post.belongsTo(category);
post.hasMany(comment);
comment.belongsTo(post);
/* harmony default export */ __webpack_exports__["c"] = (sequelize);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_schedule__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_schedule___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_schedule__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_session__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api__ = __webpack_require__(17);








//import bot, {telPost} from './telegram'
var SequelizeStore = __webpack_require__(23)(__WEBPACK_IMPORTED_MODULE_6_express_session___default.a.Store);
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var port = process.env.PORT || 5000;
var sessionStore = new SequelizeStore({
    db: __WEBPACK_IMPORTED_MODULE_2__model_index__["c" /* default */],
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
});
app.set('port', port);
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_6_express_session___default()({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_7__api__["a" /* default */]);

// Import and Set Nuxt.js options
var config = __webpack_require__(24);
config.dev = !("development" === 'production');
__WEBPACK_IMPORTED_MODULE_3_node_schedule___default.a.scheduleJob({ minute: '0' }, function () {
    Object(__WEBPACK_IMPORTED_MODULE_4__parser__["a" /* default */])();
    //telPost()
});
// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);
// Build only in dev mode
if (config.dev) {
    var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
    builder.build();
}
// Give nuxt middleware to express
app.use(nuxt.render);
// Listen the server
app.listen(port, function () {
    console.log("Listening on " + port);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("striptags");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("node-schedule");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_needle__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_needle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_needle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_transliteration__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_transliteration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_transliteration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mkdirp__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mkdirp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mkdirp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cheerio__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_url__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_fs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_fs__);








var url = 'http://tabula-rasa24.ru/';
var parser = function parser() {
    return __WEBPACK_IMPORTED_MODULE_0_needle___default.a.get(url, function (err, res) {
        if (err) throw err;
        var $ = __WEBPACK_IMPORTED_MODULE_3_cheerio___default.a.load(res.body);
        var text = $('.sidebar-1 .itemsList .moduleItemIntro').contents();
        var title = text.find('.moduleItemTitle').contents().text(function (i, el) {
            var itemParse = $(this);
            var itemTitle = $(this).text();
            __WEBPACK_IMPORTED_MODULE_4__model__["d" /* post */].findOne({
                where: {
                    title: itemTitle
                }
            }).then(function (postItem) {
                if (postItem == null) {
                    var link = itemParse.parent().attr('href');
                    var fullLink = Object(__WEBPACK_IMPORTED_MODULE_6_url__["resolve"])(url, link);
                    __WEBPACK_IMPORTED_MODULE_0_needle___default.a.get(fullLink, { json: true }, function (err, res) {
                        if (err) throw err;
                        parsePage(res);
                    });
                }
            });
        });
    });
};

function parsePage(res) {

    var $ = __WEBPACK_IMPORTED_MODULE_3_cheerio___default.a.load(res.body, { decodeEntities: false });
    var title = $('head title').text();
    var description = $('meta[property="og:description"]').attr('content');
    var text = $('.itemFullText').html();
    __WEBPACK_IMPORTED_MODULE_4__model__["a" /* category */].findOne({ where: { title: $('.itemCategory a').text() } }).then(function (cat) {
        if (cat) {
            var content = {};
            content.catId = cat.id;
            content.title = title;
            content.thumbnail = getThumbnail(text);
            content.text = parseText(text);
            content.alias = Object(__WEBPACK_IMPORTED_MODULE_1_transliteration__["slugify"])(title);
            content.description = description;

            __WEBPACK_IMPORTED_MODULE_4__model__["d" /* post */].create(content).then(console.log('Пост успешно добавлен')).catch(function (e) {
                console.log(e);
            });
        }
    });
}
function parseText(text) {
    var $ = __WEBPACK_IMPORTED_MODULE_3_cheerio___default.a.load(text);
    var img = $('img').each(function (index, el) {
        var path = $(this).attr('src');
        var pathArr = path.split('/');
        var nameFile = pathArr.pop();
        pathArr.splice(0, 1);
        var image = download(Object(__WEBPACK_IMPORTED_MODULE_6_url__["resolve"])(url, path), pathArr, nameFile, function () {});
    });
    return text;
}
function download(uri, filepath, name, callback) {
    var path = 'static/' + filepath.join('/');
    __WEBPACK_IMPORTED_MODULE_2_mkdirp___default()(path, function (err) {
        if (err) throw err;
    });
    var filename = path + '/' + name;

    __WEBPACK_IMPORTED_MODULE_5_request___default.a.head(uri, function (err, res, body) {
        __WEBPACK_IMPORTED_MODULE_0_needle___default.a.get(uri, { multipart: true }).pipe(__WEBPACK_IMPORTED_MODULE_7_fs___default.a.createWriteStream(filename).on('open', function (path) {
            console.log(path);
        }).on('error', function (err) {
            console.log(err);
        })).on('finish', function (err) {
            if (err) console.log('An error ocurred: ' + err.message);else console.log('Изображение загруженно');
        }).on('error', function (err) {
            console.log(err);
        });
    });
}
function getThumbnail(text) {
    var $ = __WEBPACK_IMPORTED_MODULE_3_cheerio___default.a.load(text);
    var path = $('img').eq(0).attr('src');
    return path;
}
/* harmony default export */ __webpack_exports__["a"] = (parser);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("needle");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("transliteration");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__posts__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(1);






var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_3__posts__["a" /* default */]);
router.get('/sitemap', function (req, res, next) {
    var pages = [];
    __WEBPACK_IMPORTED_MODULE_4__model__["a" /* category */].findAll({ include: [{ model: __WEBPACK_IMPORTED_MODULE_4__model__["d" /* post */] }] }).then(function (cats) {
        cats.map(function (cat) {
            cat.posts.map(function (post) {
                return pages.push('/' + cat.alias + '/' + post.alias);
            });
            return pages.push('/' + cat.alias);
        });
        res.json(pages);
    });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Mock Users
var users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(1);



var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/categories', function (req, res, next) {
	__WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */].findAll().then(function (categories) {
		res.json(categories);
	});
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mails_askMail__ = __webpack_require__(21);



var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/post-index', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findAll({ limit: 7, order: [['createdAt', 'DESC']], include: [{ model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */] }, { model: __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */], attributes: ['id'] }] }).then(function (posts) {
        res.json(posts);
    });
});
router.get('/posts', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findAndCountAll({ limit: 7, offset: 7 * (req.query.page - 1 || 0), include: [{ model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */] }, { model: __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */], attributes: ['id'] }], order: [['createdAt', 'DESC']] }).then(function (posts) {
        if (req.query.page <= parseInt(posts.count / 7)) {
            res.json({ posts: posts.rows, count: parseInt(posts.count / 7) });
        } else {
            res.sendStatus(404);
        }
    });
});
router.get('/post/:category', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */].findOne({
        where: {
            alias: req.params.category
        }
    }).then(function (cat) {
        if (cat) {
            __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findAndCountAll({ where: { catId: cat.id }, include: [{ model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */] }, { model: __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */], attributes: ['id'] }], limit: 7, offset: 7 * (req.query.page - 1 || 0), order: [['createdAt', 'DESC']] }).then(function (posts) {
                var count = parseInt(posts.count / 7);
                res.json({ posts: posts.rows, count: count, cat: cat });
            });
        } else {
            res.sendStatus(404);
        }
    });
});
router.get('/post/:category/:post', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findOne({
        where: {
            alias: req.params.post
        },
        include: [{
            model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */],
            where: {
                alias: req.params.category
            }
        }]
    }).then(function (item) {
        if (item) {
            __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */].findAll({
                where: {
                    postId: item.id
                }
            }).then(function (comments) {
                __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findAll({ where: { catId: item.catId }, order: [[__WEBPACK_IMPORTED_MODULE_1__model__["e" /* sequelize */].fn('RAND')]], limit: 2 }).then(function (rand) {
                    res.json({ post: item, rand: rand, comments: comments });
                });
            });
        } else {
            res.sendStatus(404);
        }
    });
});
router.post('/addRating', function (req, res, next) {
    if (!req.session.rating) {
        req.session.rating = [];
    }
    if (req.session.rating.indexOf(req.body.id) == -1) {
        __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findOne({ where: { id: req.body.id } }).then(function (item) {
            if (item) {
                var count = item.ratingCount + 1;
                var rating = req.body.rating + item.rating;
                item.update({
                    rating: rating,
                    ratingCount: count
                }).then(function (status) {
                    req.session.rating.push(req.body.id);
                    res.json(req.body.id);
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(403);
    }
});
router.post('/addVisit', function (req, res, next) {
    if (!req.session.visits) {
        req.session.visits = [];
    }
    if (req.session.visits.indexOf(req.body.id) == -1) {
        __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findOne({ where: { id: req.body.id } }).then(function (item) {
            if (item) {
                var count = item.visits + 1;
                item.update({
                    visits: count
                }).then(function (status) {
                    req.session.visits.push(req.body.id);
                    res.json(req.body.id);
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(403);
    }
});
router.post('/addComment', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */].create({
        name: req.body.name,
        text: req.body.text,
        postId: req.body.postId,
        parent_id: req.body.parent_id
    }).then(function (comment) {
        res.json(comment);
    }).catch(function (err) {
        res.sendStatus(403);
    });
});
router.get('/sidebar', function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */].findAll({
        order: [['rating', 'DESC']],
        limit: 3,
        include: [{
            model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */]
        }]
    }).then(function (posts) {
        __WEBPACK_IMPORTED_MODULE_1__model__["b" /* comment */].findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [{
                model: __WEBPACK_IMPORTED_MODULE_1__model__["d" /* post */],
                include: [{
                    model: __WEBPACK_IMPORTED_MODULE_1__model__["a" /* category */]
                }]
            }]
        }).then(function (com) {
            res.json({
                posts: posts,
                comments: com
            });
        });
    });
});
router.post('/ask', __WEBPACK_IMPORTED_MODULE_2__mails_askMail__["a" /* askMail */]);
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return askMail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nodemailer__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nodemailer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nodemailer__);

var mail = __WEBPACK_IMPORTED_MODULE_0_nodemailer___default.a.createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	secure: 'ssl',
	auth: {
		user: 'xolms@bmb-design.ru',
		pass: '657216as'
	}
});
var askMail = function askMail(req, res, next) {
	mail.sendMail({
		from: 'xolms@bmb-desing.ru',
		to: 'xolms@bmb-desing.ru',
		subject: 'Новый вопрос с сайта',
		html: '<p>С сайта пришел новый вопрос<br/>На тему ' + req.body.theme + '<br/> Имя отправителя: ' + req.body.name + '<br/>E-mail для обратной связи: ' + req.body.email + 'Вопрос: ' + req.body.message + '</p>'
	}, function (error, response) {
		if (error) {
			console.log(error);
			res.json({ status: false, message: 'Ошибка при отправке' });
		} else {
			res.json({ status: true, message: 'Сообщение успешно отправленно' });
		}
	});
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("connect-session-sequelize");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var axios = __webpack_require__(25);
__webpack_require__(26).config();
module.exports = {
  cache: true,
  /*
  ** Headers of the page
  */
  modules: ['@nuxtjs/sitemap'],
  plugins: ['~/plugins/period.js'],
  router: {
    linkActiveClass: 'active'
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'http://' + (process.env.HOST || 'localhost'),
    cacheTime: 1000 * 60 * 15,
    generate: false, // Enable me when using nuxt generate

    routes: function routes() {
      {
        return axios.get('http://' + (process.env.HOST || 'localhost') + '/api/sitemap').then(function (res) {
          return res.data.map(function (pages) {
            return pages;
          });
        });
      }
    }
  },
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', { src: '~/assets/sass/main.sass', lang: 'sass' }],
  /*
  ** Add axios globally
  */
  build: {
    extractCSS: true,
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      /*if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }*/
    }
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map