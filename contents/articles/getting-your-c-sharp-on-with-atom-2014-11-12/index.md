---
title: Getting your C# on with Atom
author: Mpdreamz
date: 2014-11-12 15:15
template: article.jade
commentid: 9
---

## A precursor

One of the last web projects I did before starting my current gig at [Elasticsearch](http://www.elasticsearch.org) was every developers' dream, 3 week POCO search interface, no fixed scope, have fun. 

One of my internal goals of the project was to proof that developing C# on a mac did not have to suck. The team concisted of me and a frontend developer who also worked on OSX and was happiest if all he had to open was Sublime and a terminal. 

- nancyfx application
- hosted in OWIN self host (Helios in production)
- Octopus deploy
- grunt to build everything
- grunt watch to build on the fly
- OmniSharp to develop C# using VIM

The project was a ton of fun but setting all the moving pieces up was a major pain. Grunt builds were tedious and prone to `KILL` itself. [ASP vNEXT](http://www.github.com/aspnet/Home) simplifies everything soo much and having been through the pain of doing it manually having a framework that solves running, watching, building is something that has me super super excited. 

Another big take away of the project was how simply awesome [OmniSharp](https://github.com/OmniSharp/omnisharp-vim) was. Developing in my vim with autocompletion and live error feedback? `HECK TO THE YES`!

Whenever I needed to debug I moved to [Xamarin](http://www.xamarin.com) which is awesome as an IDE and debugger but as an editor still lacks behind. This was before all the recent awesome additions should as being able to dock windows next to eachother.

## OmniSharp

Some months ago an intern at Microsoft started a [Sublime plugin Kulture](https://github.com/ligershark/Kulture) using `Roslyn` to get intellissense and aspvnext commands directly in sublime.

In one [of the issues](https://github.com/ligershark/Kulture/issues/12#issuecomment-51368208) on Kulture the general concensus however quickly became editors need to standardize on [OmniSharp](http://www.omnisharp.net)  and a Skype session was started with everyone involved. 

I joined but did not commit to anything, however the weekend after I started hacking in Atom and was pleasanlty suprised.

First of all Atom's plugin development is a joy. Being able to leverage all my web development smarts to extend my editor? `HECK YES!` Move over VIMScript! After that [Omnisharp-atom](https://github.com/OmniSharp/omnisharp-atom) was born!

Shortly after [Stephen James](http://stephenjamescode.blogspot.co.uk/) hopped aboard and implemented several features and did a awesome job abstracting implementing new features.

![OmniSharp-atom](https://github.com/Omnisharp/omnisharp-atom/raw/master/omnisharp-atom.gif)

Right now the feature scope is still very limited:

* ctrl-F12 Go to definition
* shift-F12 Find usages
* Completions appear as you type. To select an item, press the TAB key.
* Editor addornments (squigglies) appear for errors and code hints as you type. 

Although in `master` [Stephen James](http://stephenjamescode.blogspot.co.uk/) also pushed support for `Format Code` and `Fix Usings` which will be released very soon!

As an OmniSharp editor feature wise we lack behind on the [sublime plugin](https://github.com/OmniSharp/omnisharp-sublime) (honestly [Jonathan Channon](http://jonathanchannon.com/) is a beast!) the atom omnisharp plugin has a very sound fundation!

If you use Atom and C# we urge you to play with [Omnisharp-atom](https://github.com/OmniSharp/omnisharp-atom), use it anger, help us build out more and more features but most importantly have fun!

Too much has been said about opensource and microsoft: with crossplatform and multi editor support for our beloved language my biggest hope for the future is that we as a community put the `fun` back into C# development!

## Further reading:
- [Scott Hanselman's blog post](hnsl.mn/dotnet2015)
- [Jonathan Channon on omnisharp-sublime](http://mat-mcloughlin.net/2014/11/12/time-to-cast-away-visual-studio-and-use-a-text-editor/)
- [Matthew McLoughlin on omnisharp-brackets](http://mat-mcloughlin.net/2014/11/12/time-to-cast-away-visual-studio-and-use-a-text-editor/) 




