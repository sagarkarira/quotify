'use strict';
const snoowrap = require('snoowrap');
const Promise = require('bluebird');
const co = require('co');
const Pageres = require('pageres');
const webshot = require('webshot');
const config = require('config');
const randomGradient = require('../utils/helpers');

exports.list = (req, res) => {

	fetchRedditPostInternal('ShowerThoughts', 'day')
		.then((postArr)=>{
			let posts = postArr.map((post, i)=>{
				return i + '.' + post;
			});
			res.send({
				status : 200,
				data : posts
			});
		})
		.catch((err)=>{
		res.send({
			status : 100,
			error : err
		})
	});

}

exports.convert = (req, res) => {

	let number = req.params.number;
	let coWrap = co.wrap(function *gen() {
		let postArr = yield fetchRedditPostInternal('ShowerThoughts', 'day');
		let elements = yield generateTemplate(postArr[number]);
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



function fetchRedditPostInternal(subReddit, time) {
	return new Promise((resolve, reject) => {
		const r = new snoowrap({
		  	"userAgent" : config.get('redditConfig').userAgent,
		 	"clientId" : config.get('redditConfig').clientId,
			 "clientSecret" : config.get('redditConfig').clientSecret,
		 	"refreshToken" : config.get('redditConfig').refreshToken
		});
		let postArr = [];
		r.getSubreddit(subReddit).getTop({time: time}).then((dataArr)=>{
			postArr = dataArr.map((obj)=>{
				console.log(obj.title);
				return obj.title;
			});
			resolve(postArr);
		});
	})
}

function generateTemplate(post) {
	return new Promise((resolve, reject) => {
		const gradientCollection = randomGradient();
		let gradientOne = gradientCollection['colors'][0];
		let gradientTwo = gradientCollection['colors'][1];

		resolve({
			gradient_one : gradientOne,
			gradient_two :  gradientTwo,
			post : post
		});
	});
}


exports.screenshot = (req, res) => {

	let number = req.params.number || 1;
	let directory = __dirname + '/../public/';
	let options = {
		delay: 2,
		filename : 'st-<%= date %>-<%= size %>'
	}

	const pageres = new Pageres(options)
						.src(`http://localhost:8080/api/convert/${number}`, ['1280x1024'])
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
