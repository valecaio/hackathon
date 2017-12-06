var sfondo;
var mic;
var snow = [];
var smoke = [];

function preload () {
    sfondo = loadImage("assets/sfondo.png");
   
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES); 
    mic = new p5.AudioIn();
	mic.start(); 
 

}

function draw () {    
    
	vol = mic.getLevel() * 100;
	//print(vol);
	background(158,178,162);
    
    
    
    
    //red ball
    fill(135,35,35);
    noStroke();
    if (width>height) {
        arc(width/2, height/5*2.9, width/1.8, width/1.8, 0,180, OPEN);
    } else {
       arc(width/2, height/5*2.9, height/2.4, height/2.4, 0,180, OPEN);
    }

    
    
     //smoke from the houses
   if (vol > 2) {
		var newSmoke = {
			xpos: random(width/7*4.9,width/7*5),
			ypos: height/8*3,
			size: vol*random(0.2,1.8),
			
		};
		smoke.push(newSmoke);
	}

	for (i = 0; i < smoke.length; i++) {
		var currentObj = smoke[i];
		smokeCloud(currentObj.xpos, currentObj.ypos, currentObj.size);
		currentObj.ypos += -0.6;
		if (smoke[i].ypos < height/3) {
			smoke.splice(i, 1);
		}
	}
    
    
     //snow over the mountains
    //image(sfondo, width/2, height/2, 0,0);
    if (width>height) {
        image(sfondo, width/2, height/2, width/3*2,width/3*2)
    } else {
       image(sfondo, width/2, height/2, height/3*2, height/3*2)
    }
   
	
    if (vol > 2) {
		var newSnowflakes = {
			xpos: random(width/7*2,width/7*5),
			ypos: height/5.2,
			size: random(2,10),
			snowColor: random(100, 255)
		};
		snow.push(newSnowflakes);
	}

	for (i = 0; i < snow.length; i++) {
		var currentObj = snow[i];
		snowflakes(currentObj.xpos, currentObj.ypos, currentObj.size, currentObj.snowColor);
		currentObj.ypos += vol/4 + 0.8;
		if (snow[i].ypos > height/6*3.5) {
			snow.splice(i, 1);
		} 
	}
    
    
    
   
}
   
//snow customization
function snowflakes(xpos, ypos, size, snowColor) {
	noStroke();
	fill(255, 255, 255, snowColor);
	ellipse(xpos, ypos, size, size);
}

//smoke customization
function smokeCloud(xpos, ypos, size) {
	noStroke();
	fill(0, 0, 0, 8);
	ellipse(xpos, ypos, size, size);
}



//responsive window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}