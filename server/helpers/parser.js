import needle from 'needle'
import { slugify } from 'transliteration'
import mkdirp from 'mkdirp'
import cheerio from 'cheerio'
import {post, category} from '../model'
import request from 'request'
import {resolve} from 'url'
import fs from 'fs'
const url = 'http://tabula-rasa24.ru/'
const parser = () => needle.get(url, function (err, res) {
    if (err) throw err
    const $ = cheerio.load(res.body);
    var text = $('.sidebar-1 .itemsList .moduleItemIntro').contents()
    var title = text.find('.moduleItemTitle').contents().text(function (i, el) {
        var itemParse = $(this)
        var itemTitle = $(this).text()
        post.findOne(
            {
                where:
                    {
                        title: itemTitle
                    }
            }
        ).then(postItem => {
            if (postItem == null) {
                var link = itemParse.parent().attr('href')
                const fullLink = resolve(url, link)
                needle.get(fullLink, {json: true} , function (err, res) {
                    if (err) throw err
                    parsePage(res)
                })
            }
        })

    })
})

function parsePage(res) {

    const $ = cheerio.load(res.body, { decodeEntities: false });
    const title = $('head title').text()
    const description = $('meta[property="og:description"]').attr('content')
    const text = $('.itemFullText').html()
    category.findOne({where: {title : $('.itemCategory a').text()}}).then(cat => {
        if (cat) {
            const content = {}
            content.catId = cat.id
            content.title = title
            content.thumbnail = getThumbnail(text)
            content.text = parseText(text)
            content.alias = slugify(title)
            content.description = description

            post.create(content).then(console.log('Пост успешно добавлен')).catch((e) => {
                console.log(e)
            })
        }
    })
}
function parseText(text) {
    const $ = cheerio.load(text)
    const img = $('img').each(function (index, el) {
        const path = $(this).attr('src')
        const pathArr = path.split('/')
        const nameFile = pathArr.pop()
        pathArr.splice(0,1)
        const image = download(resolve(url, path), pathArr, nameFile, function(){
        })
    })
    return text
}
function download(uri, filepath, name, callback){
    const path = 'static/'+ filepath.join('/')
    mkdirp(path, function (err) {
        if (err) throw err
    })
    const filename = path + '/' + name

    request.head(uri, function(err, res, body){
        needle.get(uri, {multipart: true}).pipe(
            fs.createWriteStream(filename)
                .on('open', (path) => {
                    console.log(path)
                }).on('error', (err) => {
                console.log(err)
            })
        ).on('finish', (err) => {
            if (err) console.log('An error ocurred: ' + err.message)
            else console.log('Изображение загруженно')
        }).on('error', (err) => {
            console.log(err)
        })
    });
}
function getThumbnail(text) {
    const $ = cheerio.load(text)
    const path = $('img').eq(0).attr('src')
    return path
}
export default parser