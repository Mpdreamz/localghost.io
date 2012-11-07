all:
	wintersmith build 
	git commit -am "releasing"
	git push origin master
	git push heroku master
