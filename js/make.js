	function make(){
		makeSBP(display)
	}


	function makeSBP(g){

			sf = document.getElementById("size").value
			

			hershey = hershey.replace('hershey/','')
			hershey = hershey.replace('.jhf','')
	
			SBP = ""

			if(mode==0){

			lineX += parseFloat(((Math.abs(g[0][0].L))*0.0394*sf).toFixed(4))

				SBP+="MS," + 0.4 + "," + 0.2 + "\n"
				SBP+="JZ,0.5\n"
				SBP+="JX," + (lineX) + "\n"
				SBP+="SO,1,1\n"
				SBP+="PAUSE 1\n" 

				for(i=0;i<g.length;i++){
					SBP+="J2," + ((lineX+(g[i][0].X*0.0394*sf)).toFixed(4)) + "," + (((-lineY)+(0-(g[i][0].Y*0.0394*sf))).toFixed(4)) + "\n"
					SBP+="MZ,"+cutDepth+"\n"
					for(j=1;j<g[i].length;j++){
						SBP+="M2," + ((lineX+(g[i][j].X*0.0394*sf)).toFixed(4)) + "," + (((-lineY)+(0-(g[i][j].Y*0.0394*sf))).toFixed(4)) + "\n"
					}
					SBP+="JZ,0.05\n"
				}

			SBP+="JZ,0.5\n"
			SBP+="SO,1,0\n"
			lineX += parseFloat(((Math.abs(g[0][0].R))*0.0394*sf).toFixed(4))
			SBP+="J2," + (lineX) + "," + ((parseFloat(sf)).toFixed(4)) + "\n"
			fabmo.runSBP(SBP)

			}
			else if(mode == 1){

				SBP+="MS," + 0.4 + "," + 0.2 + "\n"
				SBP+="JZ,0.5\n"
				SBP+="SO,1,1\n"
				SBP+="PAUSE 1\n" 
				lineY = 0


	for(i=0;i<display.length;i++){

		lineX+=(Math.abs(display[i][0][0].L*0.0394*sf))

		if(display[i][0][0].N==true){
			lineY-=sf
			lineX=0
		}

		for(j=0;j<display[i].length;j++){

		if(display[i][0][0].N!=true){
			SBP+= "J2," + (((lineX)+(display[i][j][0].X*0.0394*sf)).toFixed(4)) + "," + ((lineY-(display[i][j][0].Y*0.0394*sf)).toFixed(4)) + "\n"
			SBP+="MZ,"+cutDepth+"\n"
		}

			
			for(l=1;l<display[i][j].length;l++){
				SBP+= "M2," + (((lineX)+(display[i][j][l].X*0.0394*sf)).toFixed(4)) + "," + ((lineY-(display[i][j][l].Y*0.0394*sf)).toFixed(4)) + "\n"
			}

			SBP+="JZ,0.05\n"
		}

			lineX+=(display[i][0][0].R*0.0394*sf)
			
	}

				SBP+="JZ,0.5\n"
				SBP+="SO,1,0\n"
				SBP+="JY," + parseFloat(0.5*sf) + "\n"
				//console.log(SBP)
	
				fabmo.submitJob({
	   			file : SBP,
	   			filename : hershey + '.sbp',
	   			name : 'Hershey Text',
					description : 'cut depth = ' + cutDepth + '\"'   
				})
			}
}

function space(){
	if(mode==1){

	var S = [[{L:-8,R:8}]]
	displayTxt(S)

	}
	else{
		SBP = ""
		SBP +="JZ,0.5\n"
		lineX += parseFloat(0.5*sf)
		SBP +="JX," + ((lineX).toFixed(4)) + "\n"
		fabmo.runSBP(SBP)
	}
}

function enter(){
	if(mode==1){
		screenY+=(70*displayScale)
		//sf = document.getElementById("size").value
		var R = [[{L:0,R:0,N:true}]]
		displayTxt(R)

	}
	else{
		SBP = ""
		SBP +="JZ,0.5\n"
		lineY += parseFloat(sf) 
		SBP +="J2," + (0) + "," + ((0-lineY).toFixed(4)) + "\n"
		fabmo.runSBP(SBP)
		lineX = 0
	}
}

function backspace(){
	if(mode==1){
		display.pop()
		draw()
	}

}

