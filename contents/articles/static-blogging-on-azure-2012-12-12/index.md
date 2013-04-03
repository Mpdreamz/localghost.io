---
title: Static blogging on Azure
author: Mpdreamz
date: 2012-12-12 19:54
template: article.jade
commentid: 2
---

I've been playing with static blog sites way more then I ought to have especially considering this right here constitutes as my first blog post.

I find blogging scary enough, I make a lot of grammar mistakes even in my own native tongue and always mix up sayings at the amusal of my colleagues, friends and relatives. 
Mark Twain has been quoted as saying that he respected a person who could spell a word more than one way. Me thinks Mark Twain and I would have gotten along.

So to get me started on blogging I need to be able to write and push from the command line where I feel comfortable and safe with little time to get cold feet thinking about all the horrible grammar mistakes I've made. 

So I've settled on [wintersmith](http://jnordberg.github.com/wintersmith/) mostly because it's nodejs based and nodejs is really easy to set up on any machine whether its windows, linux or mac. [wintersmith](http://jnordberg.github.com/wintersmith/) stood out to me because it has just enough to please without feeling crippled. 

	$ wintersmith preview

and

	$ wintersmith build

bring home the cake.

I added a small `Makefile` to ease with adding new articles as I really want to have a date in my slug


	NAME = "new-article"
	FULLDATE=`date +'%y-%m-%d %H:%M'`
	DATE=`date +'%Y-%m-%d'`
	FOLDER = "./contents/articles/`echo $(NAME) | tr A-Z a-z | tr " " -`-$(DATE)"
	MSG = ""

	all:
		wintersmith build 
        git add .
		git commit -am "releasing $(MSG)"
		git push origin master

	new:
		mkdir "$(FOLDER)"
		echo "title: $(NAME)\nauthor: Mpdreamz\ndate: 20$(FULLDATE)\ntemplate: article.jade\n\n" >> "$(FOLDER)/index.md"

now 

	$ make new NAME="My New Article"

and 

	$ make MSG="Commit message" 

brings home the cake. `make new` takes care of figuring out what day it is and slugifying my desired blog title.
`MAKE MSG=""` will commit my changes and push it to github. Github then notifies Azure to deploy my latest changes. This all happens within a few seconds!


For hosting I ended up with Azure git based hosting because it has a little gem I could not get on Heroku
the `.deployment` file where I can point to an alternative root. 

```ini
[config]
project=build
```

This little feature is a huge advantage to the other platforms I looked at, Heroku needs a small server to serve from a subfolder and github pages need a separate branch.

For now I'm pleased with this setup

Sidenote: I just ran a `:set spell` and I'm certain I'm a respectable person by Mark Twain standards. 
