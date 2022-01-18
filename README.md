# [Synesthesia](https://lumialfe.github.io/Synesthesia/)

[Synesthesia](https://lumialfe.github.io/Synesthesia/) es una aplicación web escrita por Daniel Barrientos (Dani_BAIG7) y Luis Miguel Alonso (lumialfe) como proyecto final para la asignatura de Informática Audiovisual del
Grado en Ingeniería Informática del Software de la Universidad de Oviedo.

## ¿Qué es Synesthesia?

[Synesthesia](https://lumialfe.github.io/Synesthesia/) es un intento de combinación de _arte digital_, _arte generativo_ y _creative coding_. Utilizando estas tres definiciones vistas en la asignatura de Informática Audiovisual hemos intentado
hacer una aplicación que genere cuadros únicos (pero no del todo aleatorios) de una forma poco común: A partir del sonido en tiempo real.

## Formas geométricas

La idea de crear cuadros a partir de sonidos implica asociar los sonidos a diferentes formas. Para escoger las formas que compondrán los resultados de Synesthesia, así como los colores vivos de los cuadros resultado, hemos encontrado inspiración en el estilo abstracto minimalista del artista **Auguste Herbin**.

![Auguste Herbin](http://2.bp.blogspot.com/_qvBEJ4oypDM/S3fc5V1je6I/AAAAAAAAA24/MRtBP01suME/s400/auguste-herbin-en-1959.jpg) 
![Cuadro de Auguste](https://image.over-blog.com/56W5cu-ezpt9RVEbdNcrvM8tUS8=/fit-in/1020x765/filters:no_upscale()/image%2F1273690%2F20150129%2Fob_a81d4d_herbin-parfumii-1954-galerie-lahumier.jpg)

Debido a temas técnicos, y para poder asegurar una progresión natural de figuras
mientras se va generando el resultado, hemos decidio usar 4 formas: *Círculos*, *óvalos*, *rectas* y *triángulos*.

## Procesamiento de audio

Una parte clave de [Synesthesia](https://lumialfe.github.io/Synesthesia/) son los parámetros de sonido utilizados y a qué los asociamos. Los parámetros utilizados son:
* Duración: El programa detecta el flujo de audio. Mientras se siga recibiendo señal de audio las figuras mutarán, cambiarán y rotarán.
  1. Mutación: Con el paso del tiempo y mientras se esté recibiendo flujo de audio, cambiará el tipo de figura que se está creando. La secuencia de cambio es Círculo-Óvalo-Recta-Triángulo.
  Cuando se detecte audio, la primera figura en aparecer será un círculo, que tras alcanzar cierto tamaño se convertirá en óvalo. El óvalo se estirará posteriormente hasta convertirse en
  una recta. Finalmente la recta se irá replegando hasta convertirse en triángulo.
  2. Cambio: Antes de transformarse en otra figura, las figuras existentes crecen hasta alcanzar determinado valor de tamaño o relación entre sus partes.
  3. Rotación: La rotación afectará a una figura durante todo su ciclo de creación y mutación y aumentará su velocidad exponencialmente con el tiempo.
* Frecuencia y volumen: La combinación de estos dos valores de audio conseguirá diferentes composiciones de color HSB (Hue, Saturation, Brightness; Tonalidad, Saturación, Brillo en español)
para las diferentes formas. La frecuencia alterará la _tonalidad_, mientras que el volumen alterará la _saturación_ y el _brillo_.

## Aleatoriedad

Algunas partes de [Synesthesia](https://lumialfe.github.io/Synesthesia/) utilizan valores aleatorios. Estos son:
- La posición de generación de las figuras. Cuando se detecta audio, se escoge un valor aleatorio de X e Y donde la figura se va a generar.
- La dirección de rotación de las figuras. Cuando se crea una figura, se determina aleatoriamente si va a girar en sentido horario o antihorario.


## Cómo se usa

### Inicio
Una vez se accede a https://lumialfe.github.io/Synesthesia/, podemos ver una página web muy simple donde se pueden hacer dos cosas: Navegar al _about us_ y comenzar a usar la aplicación.

![imagen - inicio](https://user-images.githubusercontent.com/60442791/149931425-52cf9687-1129-4ea9-a72e-f377dcc64281.png)

### Aplicación principal

Una vez accedemos a la pantalla donde se ejecutará la aplicación, el navegador nos pedirá permiso para utilizar el micrófono. Cuando se den los permisos, la aplicación comenzará
a recoger el audio y a procesarlo transformándolo en las formas geométricas vistas anteriormente.

![imagen - app](https://user-images.githubusercontent.com/60442791/149931651-4ce2e819-aad6-4227-9e71-318f3fe67307.png)


### Sensibilidad

La sensibilidad es un parámetro manual que se regula con un slider en la parte superior izquierda de la pantalla (se puede mover). Determina un valor reescalado de 0.5 a 2 del volumen del micrófono, a partir del cual la aplicación procesa el sonido. Se puede considerar como un valor mínimo de intensidad de audio a partir del cual la aplicación comenzará a leer valores.

![imagen - sensibilidad](https://user-images.githubusercontent.com/60442791/149932454-f0876066-3a6e-4f7e-a7a4-63069aab4ca0.png)

### Descarga

La aplicación web permite descargar el resultado en un archivo _.png_ cuando se haga click en el botón _download_.

![imagen - descarga](https://user-images.githubusercontent.com/60442791/149932723-d81da4ba-71a3-497d-82ee-abacf9301e04.png)


## Librerías y contenidos externos

Se han usado diferentes librerías y contenidos externos para el desarrollo de [Synesthesia](https://lumialfe.github.io/Synesthesia/) con **p5.js**. Entre ellas:
* [Shape5.js](https://github.com/pfe1223/Shape5js): Es una librería directamente asociada con **p5.js** que facilita el trabajo con figuras. Esta librería es esencial para el funcionamiento de la aplicación.
* [p5.gui.js](https://github.com/bitcraftlab/p5.gui): Es la librería que permite mostrar el slider para controlar la sensibilidad.
* [p5.sound](https://p5js.org/reference/#/libraries/p5.sound): Es una librería central de **p5.js** esencial para Synesthesia ya que permite el procesamiento de audio en tiempo real.

## Glosario

- Arte digital: Es aquel en el que la tecnología digital es explotada no como herramienta sino como medio; es decir, es una 
característica fundamental para la apreciación de la obra de arte.
- Arte generativo: "Cualquier práctica artística en la que se utiliza un sistema, como un conjunto de reglas de lenguaje natural, 
un programa de ordenador, una máquina u otro procedimiento que se pone en marcha con cierto grado de autonomía contribuyendo a o resultando en una obra de arte completa."
_(Galanter, 2003)_
- Creative coding: uso de un lenguaje de programación como herramienta para producir resultados estéticos más que funcionales. Una variante es el live coding en el que se 
programa en directo una obra de arte improvisada _(McLean & Wiggins, 2011)_.
- Tonalidad: Una de las propiedades o cualidades fundamentales en la propiedad de un color, definido técnicamente (en el modelo CIECAM02), como «el grado en el cual un estímulo puede ser descrito como similar o diferente de los estímulos como rojo, amarillo y azul». Se refiere a la propiedad en los aspectos cualitativamente diferentes de la experiencia de color que tienen relación con diferencias de longitudes de onda o con mezclas de diferentes longitudes de onda. Es el estado puro del color, sin mezcla de blanco o negro y, junto a la luminosidad y la saturación, una de las tres características psicofísicas del color. _[https://martinezayala.com/que-es-el-tono-en-el-color] visitado por última vez el 18/01/2021_
- Saturación: La saturación indica el nivel de intensidad de un cierto matiz de un color. Dependiendo de la pureza del color (que estará determinada por la intensidad de la luz y de la longitud de las ondas en el espectro de color), la saturación será mayor (el color se verá más intenso) o menor (el color se verá en un tono grisáceo). _[https://sirope.es/glosario-branding/que-es-la-saturacion/] visitado por última vez el 18/01/2021_
- Brillo: También conocido como valor, luminosidad o intensidad, hace referencia a la cantidad de luz presente en el color con relación al blanco o al negro. Como diríamos de manera coloquial, si es más claro o es más oscuro. _[https://www.enverodeco.es/blog/propiedades-del-color-tono-brillo-y-saturacion] visitado por última vez el 18/01/2021_
- About us: Parte de una aplicación (normalmente web) que aporta contexto y significado al producto.
- .png: Portable Network Graphic es una extensión de archivos de imagen que no implica pérdidas en la compresión.
