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



