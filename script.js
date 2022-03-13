const container = document.querySelector('section');

// console.log(container);

const params = {
    width: 500,
    height: 500
};

const two = new Two(params);

two.appendTo(container);

const numberOfShapes = 12;
const plotRadius = 150;

const shapes = [];

for (let i = 0; i < numberOfShapes; i++) {
    const fullRotation = Math.PI * 2;
    const halfRotation = Math.PI;

    const angle = fullRotation * i / numberOfShapes;  

    // const x = 250;
    const x = 250 + plotRadius * Math.cos(angle);
    // const x = i * 30 + 30;
    // const y = 250;
    const y = 250 + plotRadius * Math.sin(angle);

    // const shape = two.makeRectangle(x, y, 100, 100);
    const shape = two.makeRectangle(x, y, 50, 50);
    shape.fill = '#f9bc31';
    shape.noStroke();

    shape.rotation = angle;

    shapes.push(shape);

}


two.bind('update', function() {
    shapes.forEach(shape => {
        shape.rotation += 0.025;
    })
})

// shape.fill = '#f9bc31';
// shape.noStroke();
// shape.rotation = Math.PI * 0.25;

// two.bind('update', function ()  {
//      shape.rotation += 0.05;
// })

two.play();