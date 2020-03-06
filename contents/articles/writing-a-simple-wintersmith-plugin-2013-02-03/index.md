---
title: Writing a simple wintersmith plugin
author: Mpdreamz
date: 2013-02-03 19:57
template: article.pug
commentid: 1
---

I wanted to hook in to how `<img>` are outputted by giving them a wrapper element. 
The reason I want to do this is so that i can give the wrapper a full page width background while centering and constraining the img's `max-width` to different sizes on different screen sizes. 

Enter `wintersmith-markdownhacks`:

```coffee
fs = require 'fs'
path = require 'path'
url = require 'url'
	
module.exports = (wintersmith, callback) ->
		
class LocalGhostPage extends wintersmith.defaultPlugins.MarkdownPage
	
	getHtml: (base) ->
		super base
		@_html = @_html.replace(/(<img[^>]+>)/g, '<div class="image-wrapper">$1</div>')
		return @_html
 
	   
	wintersmith.registerContentPlugin 'pages', '**/*.*(markdown|mkd|md)', LocalGhostPage

	callback()
```
Registered in wintersmith's `config.json`:

	"plugins": [
		"wintersmith-sass",
	    "./node_modules/wintersmith-markdownhacks/plugin.coffee"
	]

It's dirty but I love it&#153;. Here's an obligatory cat gif showing the end result.

![obligatory cat gif](https://lh3.googleusercontent.com/-LRMOoQYIynY/UNH4iMul_gI/AAAAAAAAGoY/eJHrtOsd2QI/s275/137.gif)

