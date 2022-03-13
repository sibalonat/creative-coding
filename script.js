const container = document.querySelector('section');


function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

const fullRotation = Math.PI * 2;
const halfRotation = Math.PI;

function clamp(input, min, max) {
    return Math.max(min, Math.min(input, max));
}

function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function mapAndClamp(value, low1, high1, low2, high2) {
    return clamp(
        map(value, low1, high1, low2, high2),
        Math.min(low2, high2),
        Math.max(low2, high2)
    )
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const params = {
    width: 500,
    height: 500
};

const two = new Two(params);

two.appendTo(container);

const loopDuration = 60 * 4;
const numberOfShapes = 40;
const shapeIncr = 20;
const aDelay = 1 / 120;
const plotRadius = 150;

const shapes = [];


//bezier animation and shapes
for (let i = 0; i < numberOfShapes; i++) {

    const size = (numberOfShapes - i) * shapeIncr;

    const shape = two.makeRectangle(250, 250, size, size);

    if (i % 2 === 0) {
        shape.fill = '#f9d2cd';
    } else {
        shape.fill = '#f55745';
    }
    shape.noStroke();

    shapes.push(shape);

}


//bezier animation and shapes
two.bind('update', function (frameCount) {
    const currentFrame = frameCount % loopDuration;

    const t = currentFrame / loopDuration;
    shapes.forEach((shape, i) => {
 
        const aStart =  aDelay * i;
        const aEnd = aDelay * (numberOfShapes - i);

        const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1);

        if (i % 2 === 0) {
            shape.rotation = easeInOutCubic(u) * halfRotation;
        } else {
            shape.rotation = -1 * easeInOutCubic(u) * halfRotation;
        }
    })
})

two.play();

// project2
// const loopDuration = 60 * 4;
// const numberOfShapes = 40;
// const shapeIncr = 20;
// const aDelay = 1 / 120;
// const plotRadius = 150;

// const shapes = [];


// //bezier animation and shapes
// for (let i = 0; i < numberOfShapes; i++) {

//     const size = (numberOfShapes - i) * shapeIncr;

//     const shape = two.makeRectangle(250, 250, size, size);

//     if (i % 2 === 0) {
//         shape.fill = '#f9d2cd';
//     } else {
//         shape.fill = '#f55745';
//     }
//     shape.noStroke();

//     shapes.push(shape);

// }


// //bezier animation and shapes
// two.bind('update', function (frameCount) {
//     const currentFrame = frameCount % loopDuration;

//     const t = currentFrame / loopDuration;
//     shapes.forEach((shape, i) => {
//         // para
//         // const aStart = aDelay * (numberOfShapes - i);
//         //mbrapsht
//         const aStart = aDelay * i;
//         // const aStart = 0.1;
//         // para
//         // const aEnd = aDelay * i;
//         //mbrapsht
//         const aEnd = aDelay * (numberOfShapes - i);

//         const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1);
//         //varianti3
//         if (i % 2 === 0) {
//             shape.rotation = easeInOutCubic(u) * halfRotation;
//         } else {
//             shape.rotation = -1 * easeInOutCubic(u) * halfRotation;
//         }
//         //varianti2
//         // if (i % 2 === 0) {
//         //     shape.rotation = easeInOutCubic(u) * halfRotation;
//         // }
//         //varianti1
//         // shape.rotation = easeInOutCubic(u) * halfRotation;
//         // shape.rotation += 0.005;
//     })
// })

// two.play();


// simple rectangles or lines

// for (let i = 0; i < numberOfShapes; i++) {


//     const angle = fullRotation * i / numberOfShapes;  

//     // const x = 250;
//     const x = plotRadius * Math.cos(angle);
//     // const x = i * 30 + 30;
//     // const y = 250;
//     const y = plotRadius * Math.sin(angle);

//     // const shape = two.makeRectangle(x, y, 100, 100);
//     // these used to be just rectangles before being turned into rectangles that have more the apperance of the lines;
//     // const shape = two.makeRectangle(x, y, 50, 50);
//     // these now lookes like lines
//     // const shape = two.makeRectangle(x, y, 150, 10);
//     // bigger rectangles
//     const shape = two.makeRectangle(x, y, 50, 50);
//     shape.fill = '#f9bc31';
//     shape.noStroke();

//     shape.rotation = angle;

//     shapes.push(shape);

// }

// const group = two.makeGroup(shapes);

// group.translation.set(250, 250);

// let scaler = 1;

// let scaling = 'grow';

// simple rectangles and animation
// two.bind('update', function() {

//     group.rotation += 0.005;

//     if (scaling === 'grow') {
//         scaler += 0.005;
//     }
//     if (scaling === 'shrink') {
//         scaler -= 0.005;
//     }

//     if (scaler > 3) {
//         scaling = 'shrink';
//     }

//     if (scaler < 0.5) {
//         scaling = 'grow';
//     }


//     shapes.forEach(shape => {
//         shape.rotation += 0.006125;
//         shape.scale = scaler;
//     })
// })



// shape.fill = '#f9bc31';
// shape.noStroke();
// shape.rotation = Math.PI * 0.25;

// two.bind('update', function ()  {
//      shape.rotation += 0.05;
// })

// two.play();