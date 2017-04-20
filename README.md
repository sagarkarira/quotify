# instared
A bot to convert top threads of reddit to instagram photos


### TODO 

The task is to make a bot that would fetch the top thread of /r/ShowerThoughts and convert it to image. Post it to instagram. 

This is the basic MVP idea. More things can be done. But lets build this first. 


#### Fetching Data (Reddit API) `Easy `

* Fetching top thread of the day. 
* Official Documentation: [Documentation here.](https://www.reddit.com/dev/api#GET_top])
* Using most popular JS Wrapper : [Snoowrap](https://github.com/not-an-aardvark/snoowrap)

### Text to Image   `Challenging`

So this the is the [RDS](https://en.wg/wiki/Rate-determining_step) of the app. 

The idea is to convert the text to an image. I have found various libraries and methods which can help with this task. But the goal is to find the most flexible method, which provide

* **Using [JIMP](https://github.com/oliver-moran/jimp) :** 

	* Jimp does not have any dependencies. Written in pure JS it can write text over an image. It also provides various image filtering and editing functionalities. 

* **Using Canvas :**

	* Using `node-canvas` to generate a canvas at the server side. Convert it to the image. 
	
	* Canvas has tonnes of methods to generate anything you want. 
	
	* I tried to hack this : [https://codepen.io/sagark/pen/Njxmvj](https://codepen.io/sagark/pen/Njxmvj)

* **Server Side Rendering :**  

	* Using a template engine (preferably [EJS](http://embeddedjs.com/)) rendering a dynamic page, by passing text, background parameters like gradient colors, user name and other variables. 

	* Using [Pageras](https://github.com/sindresorhus/pageres) to take the screen shot of the dynamic generated page.  

	* Provides huge flexibility with html and css as passing variables to ejs file and changing the to create dynamic pages. 
	
	Made this [template](https://codepen.io/sagark/pen/aWNzxg?editors=1100) `Disclaimer : I suck at CSS`
	

**How to choose background ?**

* **Gradient Images :**

	* List of gradients can be found [here](https://github.com/Ghosh/uiGradients/blob/master/gradients.json) 

	* Preview here : [https://uigradients.com/](https://uigradients.com/#Meridian)

* **Intelligent Images :** 
	
	* Find keywords from the text using [natural](https://githu	b.com/NaturalNode/natural)
	
	* Search keywords in unsplash to find an image. Using it as a background. 

* **How to choose text colors?** 
	
	* Using [VibrantJS](http://jariz.github.io/vibrant.js/)
	 


### Posting Image (Instagram API) `Easy`

	*  Will update later. 



### Other Resources : 

* [Correct way to Text over image styling](https://graphicdesign.stackexchange.com/questions/29256/text-not-very-readable-on-different-image-backgrounds)

* **Production Quality / Inspiration :** [Official instagram of r/ST](https://www.instagram.com/rshowerthoughts/?hl=en)
