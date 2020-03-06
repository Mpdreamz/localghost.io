---
title: Introducing assembly-differ
author: Mpdreamz
date: 2020-03-06 22:44
template: article.pug
commentid: 11
---

Hi! ever wanted created a dll and nuget package and wanted to get a report of all of the assembly changes? Well now there is a dotnet tool for that!

To install globally:
```
dotnet tool install -g assembly-differ
```

But installing globally is not very repeatable build friendly so lets use [local tools]() that were introduced with .NET core 3.0. Andrew Lock did [a fantastic blog post introducing these](https://andrewlock.net/new-in-net-core-3-local-tools/)

Create a manifest file locally if one does not exist already:

```
dotnet new tool-manifest
```

```
dotnet tool install assembly-differ
```

Now you can run e.g:

```
dotnet assembly-differ "nuget|Elasticsearch.Net|7.3.0|netstandard2.0" "nuget|Elasticsearch.Net|7.4.1|netstandard2.0"
dotnet assembly-differ "nuget|Newtonsoft.Json|10.0.1|netstandard2.0" "nuget|Newtonsoft.Json|12.0.1|netstandard2.0"
```

To get the differences between two nuget packages. 


Differ builds on the amazing work done by [JustAssembly, licensed under Apache 2.0](https://github.com/telerik/JustAssembly). We currently run on a fork that we know works on linux/osx as well. 

We hope this tool in the future will be able to:

* emit standard out errors if breaking changes exists so this could be easy leveraged in CI,
* Pass the tool with the version you intend to release and have the tool report the version it thinks it should be based on the differences between the assemblies
* Wrap all of this in Github Actions

Trying to blog on the eve before a vacation does not leave me much time to fully do all its capabilites justice so expect more blog posts in the future!

