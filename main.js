$(document).ready(function(){
    canvasArea.start();
});

//Holds all bubbles
var bubbles = [];

//Typical canvas variables
var canvasArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = $(document).width();
        this.canvas.height = $(document).height();
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.update();
    },
    update: function(){
        requestAnimationFrame(this.update.bind(this));
        updateCanvasArea();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//On mouse move, add more bubbles
$(document).mousemove(function(event){
    bubbles.push(new bubble(event.pageX,event.pageY));
});

//Constructor to add more bubbles
//Width, speed, and color are randomized.
function bubble(x,y,color){
    this.w = (Math.random()*40)+5;
    this.x = x;
    this.y = y;
    this.color = Math.floor(Math.random()*16777215).toString(16);
    this.speed = (Math.random()*5)+1;
}

//This is where all the magic happens
function updateCanvasArea() {
    canvasArea.clear();
    ctx = canvasArea.context;
    
    //Displays Instructions behind the bubbles
    var output = "Move your mouse here!";
    ctx.fillStyle="#ccc";
    ctx.font="bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(output, canvasArea.canvas.width / 2, canvasArea.canvas.height / 2);
    
    //The only thing this program does is draw bubbles.
    for(var i = 0; i < bubbles.length; i++){
        //Selects color from bubble object.
        ctx.fillStyle="#"+bubbles[i].color;
        //This draws circles where the bubble is positioned
        ctx.beginPath();
        ctx.arc(bubbles[i].x,bubbles[i].y,bubbles[i].w,0,Math.PI*2,true);
        ctx.fill();
        //This moves the bubble.
        bubbles[i].y -= bubbles[i].speed;
    }
    for(var i = 0; i < bubbles.length; i++){
        //This deletes bubbles when they move off screen.
        if(bubbles[i].y < (bubbles[i].w*-1)){
            bubbles.splice(i,1);
        }
    }
}

//This was added so when the screen moves, the bubbles still fill the whole space.
$(window).resize(function(){
    canvasArea.canvas.width = $(document).width();
    canvasArea.canvas.height = $(document).height();
});