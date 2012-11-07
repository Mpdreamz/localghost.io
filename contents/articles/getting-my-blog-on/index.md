title: Getting my blog on
author: Mpdreamz
date: 2012-11-07 15:00
template: article.jade

So I started to blog, lets see how long I keep this up.

Like most developers getting my blog up and running started to become the end goal instead of an ends to a means to get my so called words of wisdom on the internet.
So I'm putting this up, wards and all, frankly who gives a damn (yet).

Last time I tried to set up a blog I checked out Octopress and fell into the same trap: playing with code is alot easier then to actually blog. "Oh hey this is made with ruby, let's redo [ruby-koans](http://rubykoans.com/) and get reacquainted with the language". So this time I started looking for node based static site generators. as I know that ecosystem a whole lot better. Only to get sidetracked with the intricacies of the static site generator I ended up choosing: [wintersmith](http://jnordberg.github.com/wintersmith/). 

The next thing to lure me away from actually writing a damn blog post was where to host it. 

My first thought was github pages but that would mean generating the site and copying it to `gh-pages` branch commit/push and switch back. 
This didn't sound like an ideal work flow.

My second thought was hosting it on Azure, I've recently used it to deploy [a site for a friend](http://www.studioquestionmark.nl) and was suprised with how painless that was to setup. I'd just run the blog programmatically, tad wasteful but again who gives a damn wheter this blog is static or served from `server.js`.

I then found [this excellent blog post](http://tlvince.com/wintersmith-on-heroku) by [Tom Vincent](http://tlvince.com/about) detailing how to do it on heroku,
the right way... static. 

Sadly I couldn't quite get his build on heroku itself to work and just check in my build output, but overall I'm happy with the current setup.

Some quick first observations on heroku itself

- feels slower then azure,
- the command line is incredible but also confusing, the help mentions `run:console [Command]` but the actual command is `run console [Command]`
- stuff like `heroku logs` is awesome, 
- error messages like 'Error H14 (No web processes running)` are not idiot (read: me) proof. In hindsight issueing 'heroku ps:scale web=1' seems totally obvious.

Based on the ease of getting a node app online Azure felt alot easier. I'm not drawing any conclusion from my 30 minute exposure to heroku though.

Next up on my blog procastination list: fix the VIM markdown highlighter which barfs on quotes.

 





