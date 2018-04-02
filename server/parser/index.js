import needle from 'needle'
import tress from 'tress'
import cheerio from 'cheerio'
import {resolve} from 'url'
import fs from 'fs'
var results = []
const url = 'http://tabula-rasa24.ru/'
const parser = tress(function(url, callback) {
	needle.get(url, function (err,res) {
		if (err) throw err
		const $ = cheerio.load(res.body);
		var text = $('.sidebar-1 .moduleItemTitle').contents()
		console.log(text)
		result.push()
		callback();
	})
})
parser.drain = function(){
	require('fs').writeFileSync('./data.json', JSON.stringify(results, null, 4));
}
parser.push(url)

export default parser