/* 
Current bugs:
Makes you go to space if you go to -10 or "0" in chunklocation,
Sometimes it will clip you through the floor,
Please report bugs to issues!

Version: BETA 1.1
Stable: False
*/

// {x, y, w, h, col}

var objects = [];
var canvasColor = "black";
var slowMode = false;
var speed = 5
var operators = {
    "+": function(a, b){return a + b},
    "-": function(a, b){return a - b},
}
// Chunk Vars:
var chunk = 1;
var lastChunk = 1;
var chunkloc = 10;

window.onload = function(){
    makeCanvas(600, 600, "#0066ff", "canvas");
    
    fetch("map.json").then(response => response.json()).then(data => {
      for (var i = 0; i <= data.length - 1; i++){
        var child = data[i]
        create(child.x, child.y, child.w, child.h, child.color);
        console.log(child)
      }  
    });
  
    /*
    create(0, 200, 50, 50, "blue");
    // GROUND
    create(0, 300, 100, 50, "green");
    create(100, 350, 100, 50, "green");
    create(200, 300, 100, 50, "green");
    create(300, 250, 100, 50, "green");
    */
}

setInterval(function(){
    getChunk(0)
    if (!objects[chunk]){
        fall(0, lastChunk)
    }else{
        fall(0, chunk)
        console.log(chunkloc)
    }
    if (slowMode == false) {
        render();
    }
}, speed)

function render(){
    for (var i = 0; i < objects.length; i++){
        var obj = objects[i]
        update(obj.x, obj.y, obj.w, obj.h, obj.color, i);
    }
}

console.log(0 - 1)

function getChunk(index){
    document.getElementById("chunk").innerHTML = "Chunk: "+chunk
    console.log(chunkloc)
    var player = objects[0]
    if (objects[chunk]){
        lastChunk = chunk
        if (chunkloc >= objects[chunk].w){
            chunkloc = 0
            lastChunk = chunk - 1
            chunk = chunk + 1
            remove(player)
            if (player.y > objects[chunk].y - objects[chunk].h) { update(player.x, objects[chunk].y - objects[chunk].h, player.w, player.h, "blue", 0); }
        }else if(chunkloc <= 0){
            if(objects[chunk - 1]){
                lastChunk = chunk + 1
                chunkloc = objects[chunk - 1].w
                chunk = chunk - 1
                remove(player)
                if (player.y > objects[chunk].y - objects[chunk].h) { update(player.x, objects[chunk].y - objects[chunk].h, player.w, player.h, "blue", 0); }
            }
        }
    }
}

function isOdd(num){ return num % 2; } // 1 = odd, 0 = even

function move(index, axis, increment, op){
    var part = objects[index]
    remove(part)
    if (axis == "x"){
        chunkloc = operators[op](chunkloc, increment)
        update(operators[op](part.x, increment), part.y, part.w, part.h, part.color, index)
    }else if (axis == "y"){
        update(part.x, operators[op](part.y, increment), part.w, part.h, part.color, index)
    }
}

function fall(index, index2){
    var part = objects[index]
    var collide = objects[index2]
    var top = collide.y

    if (part.y + part.h != top){
        remove(part)
        update(part.x, part.y + 1, part.w, part.h, part.color, index)
    }else if(part.x > collide.x + collide.w || part.x + part.w < collide.x) {
        remove(part)
        update(part.x, part.y + 1, part.w, part.h, part.color, index)
    }
}
function remove(part){
    ctx.fillStyle = canvasColor
    ctx.fillRect(part.x, part.y, part.w, part.h)
}
function create(x,y,w,h,col){ // a=x, b=y, c=w, d=h
    ctx.fillStyle = col
    ctx.fillRect(x, y, w, h)
    objects.push({x:x, y:y, w:w, h:h, color:col})
}

function update(x,y,w,h,col, index){
    ctx.fillStyle = col
    ctx.fillRect(x, y, w, h)
    objects[index] = {x:x, y:y, w:w, h:h, color:col}
}

function makeCanvas(h, w, color, id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");

    canvasColor = color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, h, w);
}
