let mic;
let fft;

var defVolume;

let prevDuration, duration;

var shapes = [];
var init = 0;

var canvas = document.getElementById("defaultCanvas0");

//Variables de creación de gui
var sensitivity = 1.5;
var gui;

function setup() {
  background("#222222");
  frameRate(120);
  colorMode(HSB);
  let cnv = createCanvas(windowWidth * 0.7, windowHeight * 0.7);
  cnv.mousePressed(userStartAudio);
  textAlign(LEFT);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 8192);
  fft.setInput(mic);
  defVolume = map(mic.getLevel(), 0, 1, 0, 100);
  duration = 0;
  init = Date.now();
  document.getElementById("download").onclick = download;

  //Aquí se crea la gui
  gui = createGui();
  sliderRange(0.5, 2, 0.1); //Valores de gui, de 0.5 a 1 con step de 0.1
  gui.addGlobals("sensitivity");
}

var shape;
let created = false;

function download() {
  var link = document.createElement('a');
  link.download = 'Synesthesia.png';
  link.href = document.getElementById('defaultCanvas0').toDataURL()
  link.click();
}

function windowResized() {
  resizeCanvas(windowWidth * 0.7, windowHeight * 0.7);
}



function draw() {

  /*
   * shape es la variable por defecto que vamos a inicializar a un círculo y que
   * vamos a ir retocando según los parámetros de sonido, mientras se detecte
   * entrada en el micrófono
   */

  var volume = map(mic.getLevel(), 0, 1, 0, 100) - defVolume;

  

  if (volume >= sensitivity) {

    background("#222222");
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
    }
    

    prevFrequency = computeFrequency();
    /*
    * text('Volumen', 10, 20);
      text('Frecuencia', 10, 40);
      text('Duración', 10, 60);
      text(map(mic.getLevel(), 0, 1, 0, 100), 70, 20);
      text(computeFrequency(), 70, 40);
      text(duration.toString(), 70, 60);
    */

    duration += Date.now() - prevDuration;

    shape = decideShape(shape);
    shape = mutateFigure(shape);
    shape = decideColor(shape);

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
    }
    shape.show();
    created = true;
  } else {
    //Cuando no hay señal de micrófono asignamos una nueva posición rnd
    if (!created) {
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].show();
      }
      maxColor = 0;
      shape = new Circle();
      shape.x = Math.floor(Math.random() * windowWidth * 0.7 + 1); //random de 0 a 500
      //shape.x = map(Date.now(), init, init + 30000, 0, windowWidth * 0.7);
      shape.y = Math.floor(Math.random() * windowHeight * 0.7 + 1); //random de 0 a 500
      if (Math.random() < 0.5) {
        shape.spinDirection = -1;
      }
      minBlue = 0;
      rotationDuration = 0;
    } else {
      shapes.push(shape);
      created = false;
    }

    prevDuration = Date.now();
    duration = 0;
  }
  
}

var maxColor = 0;

function decideColor(shape) {
  let newshape = shape;
  let hue = map(computeFrequency(), 0, 1800, 0, 360);
  let sat = map(mic.getLevel(), 0, 1, 60, 100);
  let val = map(mic.getLevel(), 0, 1, 80, 100);
  if (hue + sat + val > maxColor) {
    maxColor = hue + sat + val;
    newshape.color = color(hue, sat, val, 0.8);
  }
  return newshape;
}

function decideShape(shape) {
  if (shape instanceof Circle) {
    if (shape.size > 60) {
      shape = createOval(shape);
      return shape;
    } else {
      return shape;
    }
  } else if (shape instanceof Oval) {
    if(shape.readytriangle != undefined) {
      shape = createTriangle(shape);
      return shape;
    } else {
      return shape;
    }
  } else {
    return shape;
  }

  /**
   if(frequency < 180) { //More or less C
    return createCircle(shape);
  } else  { //More or less A
    return createOval(shape);
  } 
  **/
}

function createCircle(shape) {
  let newshape = new Circle();
  newshape.blue = shape.blue;
  newshape.red = shape.red;
  newshape.green = shape.green;
  newshape.color = shape.color;
  newshape.x = shape.x;
  newshape.y = shape.y;
  newshape.spin = shape.spin;
  newshape.size = 1;
  return newshape;
}

function createOval(shape) {
  let newshape = new Oval();
  newshape.blue = shape.blue;
  newshape.red = shape.red;
  newshape.green = shape.green;
  newshape.color = shape.color;
  newshape.x = shape.x;
  newshape.y = shape.y;
  newshape.width = shape.size * 2;
  newshape.height = shape.size * 2;
  newshape.spin = shape.spin
  newshape.spinDirection = shape.spinDirection;

  return newshape;
}

function createTriangle(shape) {
  let newshape = new Triangle();
  newshape.blue = shape.blue;
  newshape.red = shape.red;
  newshape.green = shape.green;
  newshape.color = shape.color;
  newshape.x = shape.x;
  newshape.y = shape.y;
  newshape.spin = shape.spin;
  newshape.width = shape.width;
  newshape.height = shape.height;
  newshape.spinDirection = shape.spinDirection;

  return newshape;
}

function mutateFigure(shape) {
  let widthIncrement = duration / 50000;

  if (shape instanceof Circle) {
    shape.size = shape.size + widthIncrement;
  } else if (shape instanceof Oval) {

    shape.width = shape.width + widthIncrement;
    if (shape.height > 300) {
      shape.stillOval = false;
    }

    if (shape.stillOval == true) {
      shape.height = shape.height + 0.25 * widthIncrement;

      //shape = tilt(shape, computeFrequency())
    } else {
      if (shape.height < 0) { //Línea se encoge tanto que crece de forma negativa
        if (shape.height < -0.005) {
          //Es línea
          shape.readytriangle = true;
        }
      }

      shape.height = shape.height - 0.1 * widthIncrement;
    }
  } else if (shape instanceof Triangle) {
    shape.width = shape.width - 2 * widthIncrement/duration;

    if (shape.height < 0.75 * height)
      shape.height = shape.height + 0.01 * widthIncrement;
    else 
      shape.height = shape.height - 0.05 * widthIncrement;
  }

  shape = rotateShape(shape);

  return shape;
}

function rotateShape(shape) {
  shape.spin = (duration / 15000) * shape.spinDirection;
  return shape;
}

/**
var prevFrequency;
function tilt(shape, frequency) {
  shape.spin = map(Math.abs(frequency - prevFrequency), 0, 100, 0, 27);
  print(shape.spin)
  if(Math.random() < 0.5) {
    shape.spin = shape.spin * (-1);
  }
  return shape;
}
**/

function computeFrequency() {
  let nyquist = sampleRate() / 2;
  let values = fft.analyze();
  let greatest = 0;
  let largestValue = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > greatest) {
      greatest = values[i];
      largestValue = i;
    }
  }

  let finalValue = largestValue * (nyquist / values.length);
  //finalValue += 66.5;
  return finalValue;
}
