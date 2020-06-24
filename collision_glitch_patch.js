// Collision Glitch patch (replace the old fall function with this one)

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
