$(function()
{
	var left = 0;
	var x = 0;
	var interval = setInterval(function()
	{	
		left = ++left%4210;
		$("html").css("background-position", left + "px 0px")	
	}, 50);
});
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
var BirdsDrawer = (function ()
{
	var $c, ctx, h, w
		, birdSpawnerLoop = 0
		, birdSpawnerCycle = 1000
		, nextBird = getRandomInt(0, birdSpawnerCycle);

	console.log(nextBird);
	var birds = [];

	function frame(){
      requestAnimationFrame(frame);

      if (birdSpawnerLoop == nextBird || birdSpawnerLoop == 0)
      {
      	var size = getRandomInt(20, 100)
          ,x = getRandomInt(0, w / 2)
          ,y = getRandomInt(0, h/ 2)
      		//, arch = size + getRandomInt(size / 2, size)
      		//, minArch = size - getRandomInt(size / 2, size),
          , arch = y + (y / 2) + getRandomInt(size / 2, size / 4)
          , minArch = y - (y / 2) - getRandomInt(size / 4, size * 1.5);
      		

      	var bird = {
      		arch: arch,
      		minArch: minArch,
      		size: size,
      		frame: minArch - 1,
      		inc: true, 
      		x:  x,
      		y: y
      	};

      	birds.push(bird);

      	console.log("spawn!", bird);

      	nextBird = getRandomInt(0, birdSpawnerCycle);
      }

      
      drawBirds();
      birdSpawnerLoop = ++birdSpawnerLoop % birdSpawnerCycle;
    }

    function drawBirds()
    {
      var markForDeletion = [];
		  ctx.clearRect(0,0,w,h);
    	for (var i = 0, l = birds.length; i < l;i++) {
    		updateBirdState(birds[i]);
        if (birds[i].size > 0)
    		  drawBird(birds[i]);
        else 
          delete birds[i];
    	}
      
      birds.clean(undefined);

    }

    function updateBirdState(bird)
    {
    	if (bird.frame >= bird.arch || bird.frame <= bird.minArch) 
    	{ 
    		bird.inc = !bird.inc;
    	}
    	bird.x = bird.x - 0.05;
      bird.y = bird.y - 0.01;
      bird.size = bird.size - 0.01;

      bird.arch = bird.y+ (bird.y / 2) + getRandomInt(bird.size / 2, bird.size / 4)
      bird.minArch = bird.y - (bird.y / 2) - getRandomInt(bird.size, bird.size * 2.5);

    	var f = bird.inc ? (bird.frame + 2) : bird.frame - 0.5;
		
		  bird.frame = Math.max(bird.minArch, Math.min(bird.arch, f));
    }
    function drawBird(bird)
    {
    	var xx = bird.x + (bird.size / 2), xxx = bird.x + bird.size;

      var arch = Math.min(Math.max(bird.frame, bird.y - bird.size / 2), bird.y + bird.size / 2);

      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(-10 * Math.PI / 180); 
    	ctx.beginPath();  
		  ctx.moveTo(bird.x,bird.y);
    	ctx.bezierCurveTo(bird.x,bird.y,xx,arch,xx,bird.y);
    	ctx.stroke(); 
    	ctx.beginPath();  
    	ctx.moveTo(xx,bird.y);
    	ctx.bezierCurveTo(xx,bird.y,xx,arch, xxx,bird.y);
    	ctx.stroke(); 
      ctx.restore();
    }


	function init()
	{
		$c = $("canvas#birds");
		ctx = $c[0].getContext('2d');
		w = $c.width();
		h = $c.height();
		frame();
	};

	return {
		init : init
	};
})().init();
