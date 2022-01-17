let mic;
let fft;

var defVolume;

let prevDuration, duration;

var shapes = [];
var init = 0;

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
}

var shape;
let created = false;

function download() {
  var link = document.createElement('a');
  link.download = 'Synesthesia.png';
  link.href = document.getElementById('defaultCanvas0').toDataURL()
  link.click();
}

function draw() {

  /*
   * shape es la variable por defecto que vamos a inicializar a un círculo y que
   * vamos a ir retocando según los parámetros de sonido, mientras se detecte
   * entrada en el micrófono
   */

  var volume = map(mic.getLevel(), 0, 1, 0, 100) - defVolume;

  if (volume >= 2) {
    background("#222222");

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

    shape.show();
    created = true;
  } else {
    //Cuando no hay señal de micrófono asignamos una nueva posición rnd
    if (!created) {
      maxColor = 0;
      shape = new Circle();
      shape.x = Math.floor(Math.random() * windowWidth*0.7 + 1); //random de 0 a 500
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
  for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
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
    newshape.color = color(hue, sat, val, 1);
  }
  return newshape;
}

function decideShape(shape) {
  if (shape instanceof Circle) {
    if (shape.size > 60) {
      let prevSize = shape.size;
      let prevX = shape.x;
      let prevY = shape.y;
      let prevColor = shape.color;
      let prevDirection = shape.spinDirection;
      shape = new Oval();
      shape.x = prevX;
      shape.y = prevY;
      shape.color = prevColor;
      shape.height = prevSize * 2;
      shape.width = prevSize * 2;
      shape.spinDirection = prevDirection;
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
  newshape.size = 1;
  return newshape;
}

function createOval(shape) {
  let prevshape = createCircle(shape);
  let newshape = new Oval();
  newshape.blue = shape.blue;
  newshape.red = shape.red;
  newshape.green = shape.green;
  newshape.color = prevshape.color;
  newshape.x = prevshape.x;
  newshape.y = prevshape.y;
  newshape.width = prevshape.size * 2;
  newshape.height = prevshape.size * 2;

  return newshape;
}

function mutateFigure(shape) {
  if (shape instanceof Circle) {
    shape.size = shape.size + duration / 100000;
  } else if (shape instanceof Oval) {
    let widthIncrement = duration / 50000;

    shape.width = shape.width + widthIncrement;
    if (shape.height > 300) {
      shape.stillOval = false;
    }

    if (shape.stillOval == true) {
      shape.height = shape.height + 0.25 * widthIncrement;

      //shape = tilt(shape, computeFrequency())
    } else {
      if (shape.height / shape.width < 0.001) {
        //Es línea
        rotationStart = Date.now();
        //Rota y se ensancha
        shape.height = shape.height + widthIncrement * 0.5;
      } else {
        shape.height = shape.height - 0.1 * widthIncrement;
      }
    }
  }

  shape = rotateShape(shape);

  return shape;
}

function rotateShape(shape) {
  shape.spin = (duration / 20000) * shape.spinDirection;
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
