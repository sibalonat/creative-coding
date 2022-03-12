const container =  document.querySelector('section');

console.log(container);

const params = {
    width: 500, 
    height: 500
};

const two = new Two(params);

two.appendTo(container);

const shape = two.makeRectangle(250, 250, 100, 100);
shape.fill = '#f9bc31';
shape.noStroke();
shape.rotation = Math.PI * 0.25;

two.bind('update', function ()  {
     shape.rotation += 0.05;
})

two.play();