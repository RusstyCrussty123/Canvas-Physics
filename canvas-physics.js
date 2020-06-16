// SOURCE CODE FOR CANVAS PHYSICS JS
// CODE WAS MADE BY RUSSTYCRUSSTY
// DISCORD: RusstyCrussty#0093
// DISCORD SERVER: https://discord.gg/SefNTcM
// READ README.md TOO KNOW HOW TOO USE

var objects = []
var canvasColor = "black"

function fall(index, index2){
    var part = objects[index]
    var collide = objects[index2]
    var top = collide.y - collide.h
    if (part.y != top){
        remove(part)
        update(part.x, part.y + 1, part.h, part.w, part.static, part.color, index)
    }else if(part.x - part.w/2 > collide.x + collide.w/2 || part.x + part.w/2 < collide.x - collide.w/2 ) {
        remove(part)
        update(part.x, part.y + 1, part.h, part.w, part.static, part.color, index)
    }
}
function remove(part){
    ctx.fillStyle = canvasColor
    ctx.fillRect(part.x, part.y, part.h, part.w)
}
function create(x,y,w,h,col,stat){ // a=x, b=y, c=w, d=h
    ctx.fillStyle = col
    ctx.fillRect(x, y, w, h)
    objects.push({x:x, y:y, w:w, h:h, static:stat, color:col})
}

function update(a,b,c,d,col,stat, index){
    ctx.fillStyle = col
    ctx.fillRect(a, b, c, d)
    objects[index] = {x:a, y:b, h:c, w:d, static:stat, color:col}
}

function makeCanvas(h, w, color, id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");

    canvasColor = color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, h, w);
}
