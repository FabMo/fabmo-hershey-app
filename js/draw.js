var char = []
var glyph = []
var jhf = []
var path = []
var vhf = []
var fileString
var hershey = "star"
var mouseDown = false
var mouseX = 0
var mouseY = 0
var k = 0
var count = 0
var selected = -1 
var xmax = 0
var xmin = 0
var SBP
var lineX = 0 
var lineY = 0
var display = []
var displayScale = 1.2
var screenY = 70*displayScale

var cutDepth = "-0.005"
var sf
var line = 0

var char = String.raw` 12JZRIPOJOOSMYRUWYUSZOTORI`

var mode = 1 //0=type, 1=submit



function draw(){

	$('.trash-icon').blur()

	if (mode==1){
		screen()
	}

	c = document.getElementById("myCanvas")
	ctx = c.getContext("2d")

	ctx.canvas.width = $(window).innerWidth()-70

	var ymax = Math.round((Math.ceil((path.length*70)/ctx.canvas.width )*70))

	if( ($(window).innerHeight()-140) < (ymax)   ){
		ctx.canvas.height = ymax+screenY+140
	}
	else{
		ctx.canvas.height = $(window).innerHeight()-70
	}
	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
	//ctx.lineJoin="round"
	//ctx.lineCap="round"
	ctx.lineWidth=1
	ctx.strokeStyle="#444"
	ctx.fillStyle="#ddd"

	var glyphNum = 96
	var row = 1

	var x = 20
	var y = 50

	if (mode==1){
		y+=screenY+10
	}

	for(i=0;i<path.length;i++){
		ctx.beginPath()

		if((mouseX<x+50)&&(mouseX>=x-10)&&(mouseY<y+50)&&(mouseY>=y-10)){
			if(mouseDown==true){
				ctx.fillStyle="#ccc"
				selected = i
			}
			else{
				ctx.fillStyle="#fff"
			}
		}
		else{
			ctx.fillStyle="#ddd"
		}

		ctx.fillRect(x-10,y,60,40)
		ctx.fill()

		ctx.beginPath()
		ctx.fillRect(x,y-10,40,60)
		ctx.fill()	
	
		ctx.beginPath()
		ctx.arc(x,y,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x+40,y,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x+40,y+40,10,0,(Math.PI*2))
		ctx.fill()

		ctx.beginPath()
		ctx.arc(x,y+40,10,0,(Math.PI*2))			
		ctx.fill()
	
		if(x>=ctx.canvas.width-130){
			x=20
			y+=70
		}
		else{
			x+=70
		}
	}


	x = 40
	y = 70
	if (mode==1){
		y+=screenY+10
	}

	for(i=0;i<path.length;i++){		
		for(j=0;j<path[i].length;j++){
			ctx.beginPath()
			for(l=0;l<path[i][j].length;l++){
				ctx.lineTo( parseFloat(x+(path[i][j][l].X)), parseFloat(y+(path[i][j][l].Y)) )
			}
			ctx.stroke()
		}
		if(x>=ctx.canvas.width-110){
			x=40
			y+=70
		}
		else{
			x+=70
		}
	}

}


function screen(){

	c2 = document.getElementById("paper")
	ctx2 = c2.getContext("2d")

	ctx2.canvas.width = (($(window).innerWidth()-40)-110)
	ctx2.canvas.height = screenY

	ctx2.lineJoin="round"
	ctx2.lineCap="round"
	//console.log(ctx2.canvas.width)
	x=10
	y=34*displayScale
	ctx2.lineWidth=displayScale

	for(i=0;i<display.length;i++){

		x+=(Math.abs(display[i][0][0].L*(displayScale+2)))

		if(display[i][0][0].N==true){
			y+=(70*displayScale)
			x=10
		}
		
		for(j=0;j<display[i].length;j++){
			ctx2.beginPath()
			for(l=0;l<display[i][j].length;l++){
				ctx2.lineTo( parseFloat((x)+(display[i][j][l].X*(displayScale+2))), parseFloat(y+(display[i][j][l].Y*(displayScale+2))) )
			}
			ctx2.stroke()
		}

			x+=(display[i][0][0].R*(displayScale+2))
	}

	ctx2.fillStyle = "#eee" 
	
	ctx2.beginPath()
	ctx2.fillRect(x,10+(screenY-(70*displayScale)),3,(50*displayScale))
	ctx2.fill()
}

function displayTxt(g){

	display.push(g)
	//console.log(display)
	//ctx2.clearRect(0,0,ctx2.canvas.width,ctx2.canvas.height)
	draw()
}





$(window).resize(function(){
	draw()
})

