// Canvas physics but based on chunked for knowing which block to interact with the player or any physics object
// Canvas Physics Beta v2
// Please report issues

var objects = [];
var canvasColor = "black";
var slowMode = false;
var speed = 10
var operators = {
    "+": function(a, b){return a + b},
    "-": function(a, b){return a - b},
}
// Chunk Vars:
var chunk = 1;
var lastChunk = 1;
var chunkloc = 50;

function render(){
    for (var i = 0; i < objects.length; i++){
        var obj = objects[i]
        update(obj.x, obj.y, obj.w, obj.h, obj.color, obj.static, i);
    }
}

function getChunk(index){
    document.getElementById("chunk").innerHTML = "Chunk: "+chunk
    var player = objects[0]
    if (objects[chunk]){
        lastChunk = chunk
        if (chunkloc >= objects[chunk].w){
            chunkloc = 0
            chunk = chunk + 1
            remove(player)
            if (player.y > objects[chunk].y - objects[chunk].h) { update(player.x, objects[chunk].y - objects[chunk].h, player.w, player.h, "blue", false, 0); }
        }else if(chunkloc < 0){
            if(objects[chunk - 1]){
                chunkloc = objects[chunk - 1].w
                chunk = chunk - 1
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
        update(operators[op](part.x, increment), part.y, part.w, part.h, part.color, part.static, index)
    }else if (axis == "y"){
        update(part.x, operators[op](part.y, increment), part.w, part.h, part.color, part.static, index)
    }
}

function fall(index, index2){
    var part = objects[index]
    var collide = objects[index2]
    var top = collide.y - collide.h

    if (part.y != top){
        remove(part)
        update(part.x, part.y + 1, part.w, part.h, part.static, part.color, index)
    }else if(part.x > collide.x + collide.w || part.x + part.h < collide.x) {
        remove(part)
        update(part.x, part.y + 1, part.w, part.h, part.static, part.color, index)
    }
}
function remove(part){
    ctx.fillStyle = canvasColor
    ctx.fillRect(part.x, part.y, part.w, part.h)
}
function create(x,y,w,h,col,stat){ // a=x, b=y, c=w, d=h
    ctx.fillStyle = col
    ctx.fillRect(x, y, w, h)
    objects.push({x:x, y:y, w:w, h:h, static:stat, color:col})
}

function update(x,y,w,h,col,stat, index){
    ctx.fillStyle = col
    ctx.fillRect(x, y, w, h)
    objects[index] = {x:x, y:y, w:w, h:h, static:stat, color:col}
}

function makeCanvas(h, w, color, id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");

    canvasColor = color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, h, w);
}
