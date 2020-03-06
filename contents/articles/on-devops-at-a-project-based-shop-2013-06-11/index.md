---
title: On devops at a project based shop
author: Mpdreamz
date: 2013-06-11 08:57
template: article.pug
commentid: 6
----

The term `DevOps` has many overloaded meanings so let me first state what I think encompasses the term `DevOps`: everything related to development but not directly to implementing the core product/project's functionality. 

More concretely:

* Automating the build
* Continuous Builds
* Continuous Integration
* Unit Testing
* Integration Tests
* Continuous Testing
* Automating the deploy procedure
* Package the deploy
* Continuous Deploy
* Centralized error monitoring
* Centralized log inspection
* Centralized machine monitoring
* Custom event monitoring (think statsd)
* Machine provisioning
* Machine configuration automation
* Automating data backups
* Automating data synchronization
* Automating data-store upgrades

As you can imagine checking every item on this list of quality providing measurements is a massive undertaking. This is usually not scoped in product development let alone in project development. Yet each and everyone of this steps is a huge quality assurance indicator with massive value and if we are to take our trade seriously is something we should all be doing. 

I tend to view this check list as `shadow work`: work that is implicitly implied but never explicitly mentioned.

From what I've seen it's the shops who develop products or maintain a single website tend to do better then project based shops who inherently have shorter development cycles. 

A product shop has a continuous life-cycle which rather non-surprisingly makes way for continuous `<anything>` to creep it's way high on the agenda as they start to form obstacles. 

A project shop has a very limited life-cycle, getting something out the door often trumps all and often rightfully so. The rather cruel catch 22 here is that especially these short life-cycle projects benefit the most from the devops checklist. Knowledge of the ins and outs of the moving parts of such a project are lost quickly. All the items on the devops serve as documentation as code and provide a warm welcome back for any developer picking up the project back up after a year or when doing SLA maintenance work.

Limited life-cycle is only one factor hindering project shops checking items off the devops check list. Having multiple projects means that each project comes with its own set of challenges further complicating the matter.

At my previous job at a project shop I helped standardize some of the devops check list and there I had the added benefit that all development happened in .NET on windows machines, the websites were hosted on in house windows servers and development happened rather linearly in SVN. This means that solutions for items on the checklist are reusable and learnings from one project can be transfered to the next. As a developer this meant that introducing new moving parts, say an exotic tech-stack is not something you can easily do. Even in this homogeneous development environment getting to check *ALL* the items off the list is quite an investment both financially and personally convincing everyone involved of the necessity.

At my current job at a bigger project shop, that prides itself on using whatever tech stack is best for the project and has quite an agile mindset, development happens on Windows, Linux, OSX machines and projects are hosted on the cloud with Google, Amazon and Microsoft or on private dedicated servers behind weird VPN arrangements and project spans range from 6 weeks to three years. On top of that some releases follow a strict sign off procedure by clients others can be released when we deem necessary. Some development is linear and is easily continuously integrated, some follow a heavy branching model. 	

This means that the knowledge on how to implement each item on the devops check list becomes very fragmented based on environment, language and framework choices, development model and release strategies. For an aspect of our profession already not high on the radar for many developers and managers this quickly becomes too much too handle. 

The __little dirty secret__ in our industry that in a lot of cases devops turns into shadow work at best, done in the spare hours of a project. 

The **`big dirty secret`** is that in a lot of cases this shadow work is simply ignored. This can have many causes

* Developers are simply unaware of this work
* Developers ignore it because they are time-constraint because this `shadow work` is not budgeted for.
* Developers are aware but managers/project leads do not know how to sell this work to the client.
* A client simply refuses to acknowledge the necessity of this `shadow work` 

I think the `devops` movement is great and more than just the new hip buzzword as it forces a flashlight onto the `shadow work` and gets it on everybody's agenda. 

At [@q42](http://www.q42.nl) colleague [Mark van Straten](https://twitter.com/markvanstraten) was given 6 hours a week to improve our devops story and although Mark did an absolutely stellar job getting all the current and past projects to build and deploy automatically we really found that this is not a one man project and 6 hours a week is really not sufficient to take care of ALL the shadow work on the `devops checklist`. 

Having fulfilled a similar role in my previous job Mark and I often debate to `How's and Why's` of devops and even-though we disagree sometimes on details we share the greater vision of the importance of this `shadow work`. So we recently called a meeting, `<insert meeting bashing comment here>` with fellow colleagues who also take an interest and came to the following conclusions:

* Devops is **NOT** a one man operation.
* That said a dedicated `devop'er` might be a very good idea, not every developer has the time to learn puppet/chef and all the other aspects of the `ops` side of things.
* A project technical lead is responsible for getting `shadow work` on a project's agenda.
* This can mean that he/she decides not to something on the `checklist` for pragmatic reasons.
* Everybody in a team is responsible for actually doing devops work.
* Devops is not just a back-ender's job there's a lot to automate on the front-end too.
	* i.e a JS front-end guy writes scripts and makes sure they can report results in a xunit format so TC knows what it means.
	* The CSS guru automates the styleguide generation i.e rendering all the button permutations.
	* Writing integration tests in phantomjs
	* [GruntJS](http://www.gruntjs.com) all the things!
	* etcetera..


One thing is for sure `Devops` work is a constant battle but as long it's a battle we are fighting we're on the right track. 

Do you work for a project shop and are also fighting the `shadow work` let me know how you are coping in the comments!
