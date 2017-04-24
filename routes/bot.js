'use strict';
const snoowrap = require('snoowrap');
const Promise = require('bluebird');
const co = require('co');
const Pageres = require('pageres');
const webshot = require('webshot');


exports.page = (req, res) => {
	let coWrap = co.wrap(function *gen() {
		let post = yield fetchRedisPost();
		let elements = yield generateTemplate(post)

		;
		console.log(elements);
		return elements;
	});

	coWrap()
		.then((elements)=>{
			return res.render('template.ejs', elements);
		}).catch((err)=>{
			return res.send(err);
		});

}


function fetchRedisPost() {
	return new Promise((resolve, reject)=>{
		const r = new snoowrap({
		  	userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.138 Safari/537.36 Vivaldi/1.8.770.54',
		  	clientId: 'eYKmBBX7YNrQ8g',
		  	clientSecret: 'z18PfnESHscIEN1UAvX3Z5_BlhI',
		  	refreshToken: '44344098-Kjt3tPuzKR3TWNImtwqV_b55L54'
		});

		let postArr = [];
		r.getSubreddit('ShowerThoughts').getTop({time: 'day'}).then((dataArr)=>{
			postArr = dataArr.map((obj)=>{
				console.log(obj.title);
				return obj.title;
			});
			resolve(postArr[0]);
		});
	});
}

function generateTemplate(post) {
	return new Promise((resolve, reject) => {
		resolve({
			gradient_one : '#ffc3a0',
			gradient_two :  ' #FFAFBD',
			post : post
		});
	});
}


exports.screenshot = (req, res) => {
	
	let directory = __dirname + '/../public/';
	const pageres = new Pageres({delay: 2})
						.src('http://localhost:8080/api/page', ['1280x1024'])
						.dest(directory)
						.run()
						.then(() => res.send('Saved to ' + directory));


	// webshot('http://localhost:8080/api/page', __dirname + '../public/sample.png', function(err) {
	//   	if (err) {
	//   		return res.send(err);
	//   	}
	//   	res.send('saved');
	// });
}

