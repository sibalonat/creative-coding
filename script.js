// const container = document.querySelector('section');
const container = document.querySelector('.drawing-area');


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

function randomRoundNumber(min, max) {
    return Math.round(randomNumber(min, max));    
}

const params = {
    width: 500,
    height: 500
};

const two = new Two(params);

two.appendTo(container);

const numberOfShapes = 25;

const loopDuration = 6 * 60;

const shapes = [];

aDelay = 0.0025;


//bezier animation and shapes
for (let i = 0; i < numberOfShapes; i++) {

    const size = 20;
    const sx = size * i + 10;
    const sy = 250;
    const sr = 0;
    // const ss = 1;

    //with plotRadius
    // const plotRadius = 200;
    // const angle = fullRotation * i / numberOfShapes;
    // const ex = 250 + plotRadius * Math.cos(angle); 
    // const ey = 250 + plotRadius * Math.sin(angle);
    // before plotRadius change
    const ex = randomNumber(50, 450);
    const ey = randomNumber(50, 450);
    const er = randomNumber(-2 * fullRotation, 2 * fullRotation);
    // const es = randomNumber(0.5, 1.4);


    // const size = (numberOfShapes - i) * shapeIncr;

    const shape = two.makeRectangle(sx, sy, size, size);
    shape.fill = '#004f73';
    shape.data = {
        sx: sx,
        sy: sy,
        sr: sr,
        // ss: ss,
        ex: ex,
        ey: ey,
        er: er,
        // es: es
    }
    shape.noStroke();

    shapes.push(shape);

}



//bezier animation and shapes
two.bind('update', function (frameCount) {
    const currentFrame = frameCount % loopDuration;
    const t = currentFrame / loopDuration;
    shapes.forEach((shape, i) => {

        if (currentFrame === 0) {
            //change this this properties on reload of the page
            shape.data.ex = randomNumber(50, 450);
            shape.data.ey = randomNumber(50, 450);
            shape.data.er = randomNumber(-2 * fullRotation, 2 * fullRotation);
        }
        const aStart = aDelay * (numberOfShapes - i);
        const aEnd = aDelay * i; 

        let u = 0;

        if (t < 0.5) {
            u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1);            
        } else {
            u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0);
        }

        const cu = easeInOutCubic(u);

        const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex);
        const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey);
        const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er);
        // const s = mapAndClamp(cu, 0, 1, shape.data.ss, shape.data.es);
        shape.translation.x = x;
        shape.translation.y = y;
        shape.rotation = r;
        // shape.scale = s;
    })
})

let currentColor = 0;

const bgColors = [
    '#45d3c5',
    '#ffe8b4',
    '#f9d2cd',
    '#bcdffd'
];

const shapeColors = [
    '#004f73',
    '#f8bc30',
    '#f45745',
    '#5745d3'
];

document.addEventListener('click', () => {
    currentColor += 1;
    currentColor = currentColor % bgColors.length;

    const bodyTag = document.querySelector('body');
    bodyTag.style.backgroundColor = bgColors[currentColor];

    shapes.forEach((shape, i) => {
        shape.fill = shapeColors[currentColor];
    })
})



two.play();

// mouse interaction animation and pivot looks animation
// const numberOfShapes = 25;
// const shapeMin = 0;
// const shapeMax = 500;
// shapeDif = shapeMax - shapeMin;

// const loopDuration = 4 * 60;

// const shapes = [];


// //bezier animation and shapes
// for (let i = 0; i < numberOfShapes; i++) {
//     const x = 250;
//     const y = 20 * i + 5;

//     // const size = (numberOfShapes - i) * shapeIncr;

//     const shape = two.makeRectangle(x, y, shapeMax, 10);
//     shape.fill = '#5645d3';
//     shape.noStroke();

//     shapes.push(shape);

// }

// let t = 0;

// //bezier animation and shapes
// two.bind('update', function (frameCount) {
//     // const currentFrame = frameCount % loopDuration;
//     // const t = currentFrame / loopDuration;
//     shapes.forEach((shape, i) => {
//         const aStart =  0.01 * (numberOfShapes - i);

//         const aEnd = 0.01 * i;

//         let u = 0;
//         if (t < 0.5) {
//             u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1);
//         } else {
//             u = mapAndClamp(t,0.5 + aStart, 1 - aEnd, 1, 0);
//         }
//         shape.width = shapeMin + shapeDif * easeInOutCubic(u);

//         shape.translation.x = 750 * easeInOutCubic(u);
//     })
// })


// // change animation on mouse move
// // document.addEventListener('mousemove', (event) => {
// //     t = mapAndClamp(event.pageX, 0, window.innerWidth, 0, 1);
// // })

// //change animation on scroll
// document.addEventListener('scroll', (event) => {
//     const scrollY = window.pageYOffset;
//     const scrollMax = 3000 - window.innerHeight;

//     t = mapAndClamp(scrollY, 0, scrollMax, 0, 1)
// })

// two.play();

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