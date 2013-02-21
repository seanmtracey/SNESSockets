//var row1Keys, row2Keys, row3Keys, row4Keys;

var theRows; 
//Little cheat here - Grab a Facebook OAuth token and put it in here
var postIt = "https://graph.facebook.com/me/feed?access_token= INSERT ACCESS TOKEN HERE &message=";

//This is the SNESSockets file
var socket = io.connect('http://localhost:8080');
	socket.on('news', function (data) {
	console.log(data.button);
	
	theRows = document.querySelectorAll('.row');
	socket.emit('my other event', { my: 'data' });
	
	socket.on('button', function(data){
		action(data.button);
	})
});

var currentColumn = 0;
var currentRow = 0;
var currentLetter = "q";

var theString = "";

function action(button){
	console.log(button);
		
	switch(button){
		
		case "UP\r":
			if(currentRow > 0){
				currentRow -= 1;
				
			}
			currentLetter = theRows[currentRow].children[currentColumn].children[0].innerHTML;
			for(var w = 0; w<theRows.length;w++){
				for(var x = 0;x<theRows[w].children.length;x++){
					theRows[w].children[x].children[0].className = "";
				}
			}
			
			theRows[currentRow].children[currentColumn].children[0].className = "active";
			break;
		
		case "DOWN\r":
			if(currentRow < 3){
				currentRow += 1;
				if(currentColumn > theRows[currentRow + 1].childNodes.length){
					currentColumn = theRows[currentRow + 1].childNodes.length - 1;
				}
				currentLetter = theRows[currentRow].children[currentColumn].children[0].innerHTML;
				
				for(var w = 0; w<theRows.length;w++){
					for(var x = 0;x<theRows[w].children.length;x++){
						theRows[w].children[x].children[0].className = "";
					}
				}
				
				theRows[currentRow].children[currentColumn].children[0].className = "active";
			}
			break;
		
		case "255\r":
			if(currentRow < 3){
				currentRow += 1;
				if(currentColumn > theRows[currentRow + 1].childNodes.length){
					currentColumn = theRows[currentRow + 1].childNodes.length -1;
				}
				currentLetter = theRows[currentRow].children[currentColumn].children[0].innerHTML;
				
				for(var w = 0; w<theRows.length;w++){
					for(var x = 0;x<theRows[w].children.length;x++){
						theRows[w].children[x].children[0].className = "";
					}
				}
				
				theRows[currentRow].children[currentColumn].children[0].className = "active";
			}	
			break;
		
		case "LEFT\r":
			if(currentColumn > 0){
				currentColumn--;
			}
			currentLetter = theRows[currentRow].children[currentColumn].children[0].innerHTML;
			
			for(var w = 0; w<theRows.length;w++){
				for(var x = 0;x<theRows[w].children.length;x++){
					theRows[w].children[x].children[0].className = "";
				}
			}
			
			theRows[currentRow].children[currentColumn].children[0].className = "active";
			break;
			
		case "RIGHT\r":
			if(currentColumn < theRows[currentRow].childNodes.length){
				currentColumn++;
				
				if(currentColumn > theRows[currentRow].childNodes.length){
					currentColumn = theRows[currentRow].childNodes.length - 1;
				}
				
			}
			currentLetter = theRows[currentRow].children[currentColumn].children[0].innerHTML;
			
			for(var w = 0; w<theRows.length;w++){
				for(var x = 0;x<theRows[w].children.length;x++){
					theRows[w].children[x].children[0].className = "";
				}
			}
			
			theRows[currentRow].children[currentColumn].children[0].className = "active";
			break;
		
		case "B BUTTON\r":
				if(currentLetter == "space") currentLetter = " "
				theString = theString + currentLetter;
				document.getElementById('message').value = theString;
			break;
		
		case "START\r":
			
			function requestObject(){
				if(window.XMLHttpRequest){
					return new XMLHttpRequest();
				} else {
					throw "NOT POSSIBLE";
				}
			}
			
			var request = requestObject();
			request.open('POST', postIt + theString, false);
			request.send(null);
			
			console.log(request.responseTest);
			
			break;
		
		default:
			console.log("DEFAULT");
			break;
	}
}