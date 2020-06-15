# Canvas-Physics
A really simple physics engine for canvas's

This is super simple and have too admit really bad but it works so yeah

# How to use
first add the script in with a <script src="canvas-physics.js"></script> and then create another script below it: <script src="index.js"></script>

create a canvas in html with an id: <canvas id="canvas" width="600" height="600" \>

and too start off I reccomend doing this:

    window.onload = function(){
        makeCanvas(600, 600, "blue", "canvas") <--- put the size in the first 2 parameters (height, width) and the 3rd is the color of the canvas and the fourth is the id of the canvas

        create(300, 400, 50, 50, "black", false) <-- first 2 paremeters are the position of the block and the 3rd and fourth are height and width, the 5th is the color and the 6th is if it is static or not (static has no use yet so forget about that)
        create(300, 0, 50, 50, "green", false)
    }

    setInterval(function(){ -- A loop to keep the green block falling
        fall(1, 0) -- fall function
    }, 5);

all functions: 

fall(index1, index2)

remove(blockobject) <-- ex: objects[0]

create(x, y, h, w, color, static)

update(x, y, h, w, color, static, index) <-- updates a block

makeCanvas(h, w, color, id) <-- makes the canvas (required)
