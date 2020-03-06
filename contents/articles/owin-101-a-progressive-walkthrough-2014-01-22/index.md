---
title: Owin 101 a progressive walkthrough
author: Mpdreamz
date: 2014-01-22 20:39
template: article.pug
commentid: 8
---

TLDR: [Play with my repository if you want to get to grips with OWIN](https://github.com/Mpdreamz/owin-101)

Last week I did a presentation at work on a .NET website we put into production last december completely built on OSX just because … hipsterism is suppose.


![hipster cat](http://media.giphy.com/media/UNgpSaZNi9YcM/giphy.gif)

On a more serious note: this was a great exercise in evaluating what it means to completely develop in C# outside off the microsoft realm.

* Xamarin Studio as IDE
* Vim works pretty well too with OmniSharp but you really miss csproj/sln file manipulation.
* NanxyFx as web framework
* Elasticsearch as datastore 
* OWIN as the glue to host the damn thing. 

I'll save all of the challenges, lessons learned for another blog post and focus on the glue, OWIN. 

## Precursor to what us .NET web dev's have had to deal with

Historically .NET web development happened inside the ASP.NET pipeline that was hosted inside IIS, end of story. Now whats particularly bad is that this pipeline was designed to accommodate for the ASP.NET WebForms paradigm, where clicks on the client would result in posts that would run server code. This to unify WinForms and WebForms sort off. This caused the entire pipeline to be way to complex, feast your eyes on this.

![asp.net web-forms pipeline](http://www.eggheadcafe.com/articles/o_aspNet_Page_LifeCycle.jpg)

This was back in 2002, somewhere around 2009 ASP.NET MVC was released. This did away with the notion of postbacks and let us program the web as it was meant to: stateless. However MVC was still shoehorned into the existing pipeline even if it does a great job of hiding it, you still need a global.asax `Application_Startup` `Application_OnError` still are the ways to initialise and catch errors for instance. Granted it did do away with 90% of the cruft in the previous diagram.

If you're interested read about the whole pipeline [here](http://msdn.microsoft.com/en-us/library/ms178473.aspx)

To add fault to injury historically aspx pages worked much like php or other interpreted languages as they were compiled as they were hit so they came with a first hist performance problem. Precompilation of these pages has been added as far back as 2005 but this never mitigated the problem of the first request being particularly hard to tame. I blame this on `FirstRequestInit()` still trying to scan for aspx pages, theres a mysterious call to `System.Web.Compilation.CompilationLock`, files get copied to `%\Framework\[FRAMEWORK]\Temporary ASP.NET Files` ARGH do I need to go on? So much cruft! Get rid of it!

I didn't even get into the split that is now introduced with ASP.NET MVC/ ASP.NET Web Api/ ASP.NET WebPages all introducing slightly different pipelines that makes it impossible to take a request filter written for mvc and reuse it in web api. I feel like screaming.

![rage quit](http://media.giphy.com/media/ZKZiW6GSx8eSA/giphy.gif)

## Owin to the rescue!

[OWIN](http://owin.org/#about) is a specification that decouples the pipeline from frameworks and servers. Inspired by Rack in ruby, Connect in node, WSGI in python, the list goes on and now .NET has finally followed suit. 

It defines a minimal interface for middleware to implement without needing to take ANY dependencies and promises to finally bring a lightweight composable pipeline to us .NET web developers. 

The spec pretty much states, if your lib has a `Startup` class with a public
`Configuration` method that returns a `Func<Dictionary<string, env>, Task>` you are writing a web application. 

    public class Startup
    {
        public Func<IDictionary<string, object>, Task> Configuration()
        {
            return async env =>
            {
                object responseStream;
                if (!env.TryGetValue("owin.ResponseBody", out responseStream))
                    throw new Exception("Expecting a valid owin dictionary");

                using (var s = (Stream) responseStream)
                using (var sr = new StreamWriter(s))
                {
                   await sr.WriteAsync("Hello world");
                }
            };
        }
    }

The [OWIN specification](http://owin.org/#about) states that whatever server runs this should make the response stream available under the key `owin.ResponseBody`.

Now much to Microsoft credit they have an awesome team working hard to make the OWIN ecosystem happening and much of it is under the codename `Katana` but with all the examples online being implemented with the `Microsoft.Owin.*` packages it's hard to distinguish whats OWIN and whats Katana. In fact even the Owin.dll inside the Owin package on nuget is NOT part of OWIN.

For last tuesday's talk I created a demo which progressively goes from vanilla OWIN into the world of KATANA in 6 steps

### 01 - Barebones

No dlls, just a simple owin handler.
[Owin101.BareBones's Readme](https://github.com/Mpdreamz/owin-101/tree/master/Owin101.BareBones)

### 02 - Barebones Middleware

Still no dlls, combining owin middleware by ourselves.
[Owin101.BareBonesMiddleware's Readme](https://github.com/Mpdreamz/owin-101/tree/master/Owin101.BareBonesMiddleware)

### 03 - Introducing IAppBuilder

We take a dependency on owin.dll and see what that gives us in return. 
[Owin101.IntroducingIAppBuilder's Readme](https://github.com/Mpdreamz/tree/master/owin-101/Owin101.IntroducingIAppBuilder)

### 04 - Helper assemblies

We take on additional dependencies on Owin.Extensions and Owin.Types and again look into how these
help us write terser/better typed owin middleware. 
[Owin101.HelperAssemblies's Readme](https://github.com/Mpdreamz/owin-101/tree/master/Owin101.HelperAssemblies)

### 05 - Branching the builder

We take a dependency on Microsoft.Owin.Mapping to see how we can get a very simple routing going on. Up until now our handlers were 
completely sequential. This shows how to branch off and have different endpoints doing different things.
[Owin101.BranchingBuilder's Readme](https://github.com/Mpdreamz/owin-101/tree/master/Owin101.BranchingBuilder)

### 06 - Hosting

This example shows how katana handles the hosting be it self host in a console/service or in IIS.
[Owin101.Hosting's Readme](https://github.com/Mpdreamz/owin-101/tree/master/Owin101.Hosting)


Checkout the repos [here](https://github.com/Mpdreamz/owin-101) the root readme also goes into how to run the examples.

Hopefully this is of some use to someone out there!















