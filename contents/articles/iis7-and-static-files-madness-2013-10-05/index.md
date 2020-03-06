---
title: IIS7 and static files madness
author: Mpdreamz
date: 2013-10-05 12:23
template: article.pug
commentid: 7
---

While doing some performance monitoring with [wrk](https://github.com/wg/wrk) I noticed something perculiar about the throughput of my static files.

I have an MVC4 website where all the static live in a folder called `WebStatic` and that folder has the following in its web.config:

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <clear />
      <add name="StaticFile" path="*" verb="*" modules="StaticFileModule" resourceType="File" requireAccess="None" />
    </handlers>
    <staticContent>
      <clientCache cacheControlCustom="public" cacheControlMaxAge="12:00:00" cacheControlMode="UseMaxAge" />
      <remove fileExtension=".ttf" />
      <remove fileExtension=".otf" />
      <remove fileExtension=".eot" />
      <mimeMap fileExtension=".ttf" mimeType="font/ttf" />
      <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />
      <mimeMap fileExtension=".otf" mimeType="font/otf" />
    </staticContent>
  </system.webServer>
</configuration>
```

This removes all `httphandlers` and makes sure only the StaticFile handler is registered.

I place a manually gzipped file here and it hit with `wrk`.

```
Running 10s test @ http://mymvcsite/webstatic/gzipped.css
  2 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.55ms  697.96us   8.61ms   81.95%
    Req/Sec     1.97k   171.44     2.00k    96.99%
  43000 requests in 10.00s, 835.99MB read
Requests/sec:   4299.89
Transfer/sec:     83.60MB
```

Hmm `4k/s` does not seem like a whole lot for Microsofts flag ship web server. 
Lets try that again this time placing the `gzipped.css` file outside my mvc application in a new IIS website hosting nothing but that css file.

```
Running 10s test @ http://myplainsite/gzipped.css
  2 threads and 20 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.96ms  127.15us   2.77ms   90.70%
    Req/Sec     4.56k   528.96     5.00k    57.36%
  100446 requests in 10.00s, 1.91GB read
Requests/sec:  10044.50
Transfer/sec:    195.41MB
```

Woah `10k/s` now, thats loads better. 


Now I realise benchmarking is hard and correlation does not imply causation and so I do not entirely place IIS at fault for the low throughput of my static files in my MVC site. I do however blame IIS for having an overly complex pipeline of machine.configs > parent web.config's all creeping into my final `/webstatic` folder's performance.

**This is why we need OWIN.**

Disclaimer: I ran the `wrk` tests a couple of times and picked one that best represented the mean request/s ratio.

