// SOURCE CODE FOR CANVAS PHYSICS JS
// CODE WAS MADE BY RUSSTYCRUSSTY
// DISCORD: RusstyCrussty#0093
// DISCORD SERVER: https://discord.gg/SefNTcM
// READ README.md TOO KNOW HOW TOO USE
// V1

var objects = []
var canvasColor = "black"

function fall(index, index2){
    var part = objects[index]
    var collide = objects[index2]
    var top = collide.y - collide.h
    var quotient1
    var quotient2

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

function makeCanvas(w, h, color, id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");

    canvasColor = color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
}
