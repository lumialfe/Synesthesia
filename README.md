# Synesthesia

Synesthesia es una aplicación web escrita por Daniel Barrientos (Dani_BAIG7) y Luis Miguel Alonso (lumialfe) como proyecto final para la asignatura de Informática Audiovisual del
Grado en Ingeniería Informática del Software de la Universidad de Oviedo.

## ¿Qué es Synesthesia?

Synesthesia es un intento de combinación de _arte digital_, _arte generativo_ y _creative coding_. Utilizando estas tres definiciones vistas en la asignatura de Informática Audiovisual hemos intentado
hacer una aplicación que genere cuadros únicos (pero no del todo aleatorios) de una forma poco común: A partir del sonido en tiempo real.

## Formas geométricas

La idea de crear cuadros a partir de sonidos implica asociar los sonidos a diferentes formas. Para escoger las formas que compondrán los resultadosde Synesthesia, hemos
encontrado inspiración en los cuadros abstractos minimalistas del artista **Auguste Herbin**. Debido a temas técnicos, y para poder asegurar una progresión natural de figuras
mientras se va generando el resultado, hemos decidio usar 4 formas: *Círculos*, *óvalos*, *rectas* y *triángulos*.

## Procesamiento de audio

Una parte clave de Synesthesia son los parámetros de sonido utilizados y a qué los asociamos. Los parámetros utilizados son:
* Duración: El programa detecta el flujo de audio. Mientras se siga recibiendo señal de audio las figuras mutarán, cambiarán y rotarán.
  1. Mutación: Con el paso del tiempo y mientras se esté recibiendo flujo de audio, cambiará el tipo de figura que se está creando. La secuencia de cambio es Círculo-Óvalo-Recta-Triángulo.
  Cuando se detecte audio, la primera figura en apareceer será un círculo, que tras alcanzar cierto tamaño se convertirá en óvalo. El óvalo se estirará posteriormente hasta convertirse en
  una línea. Finalmente la línea se irá replegando hasta convertirse en triángulo.
  2. Cambio: Antes de transformarse en otra figura, las figuras existentes crecen hasta alcanzar determinado valor de tamaño o relación entre sus partes.
  3. Rotación: La rotación afectará a una figura durante todo su ciclo de creación y mutaación y aumentará su velocidad exponencialmente con el tiempo.
* Frecuencia y volumen: La combinación de estos dos valores de audio conseguirá diferentes composiciones de color HSB (Hue, Saturation, Brightness; Tonalidad, Saturación, Brillo en español)
para las diferentes formas. La frecuencia alterará la _tonalidad_, mientras que el volumen alterará la _saturación_ y el _brillo_.

## Sensibilidad

La sensibilidad es un parámetro manual que se regula con un slider. Determina un valor mapeado del volumen del micrófono, a partir del cual la aplicación procesa el sonido.

## Descarga

Una vez generado el cuadro, la aplicacón web permite descargar el resultado en un archivo .png.

## Librerías y contenidos externos

Se han usado diferentes librerías y contenidos externos para el desarrollo de Synesthesia. Entre ellas:
* [Shape5.js](https://github.com/pfe1223/Shape5js): Es una librería directamente asociada con **p5.js** que facilita el trabajo con figuras. Esta librería es esencial para el funcionamiento de la aplicación.
* [p5.gui.js](https://github.com/bitcraftlab/p5.gui): Es la librería que permite mostrar el slider para controlar la sensibilidad.
* [p5.sound](): Es una librería central de *p5.js* esencial para Synesthesia ya que permite el procesamiento de audio en tiempo real.

## Glosario

- Arte digital: Es aquel en el que la tecnología digital es explotada no como herramienta sino como medio; es decir, es una 
característica fundamental para la apreciación de la obra de arte.
- Arte generativo: "Cualquier práctica artística en la que se utiliza un sistema, como un conjunto de reglas de lenguaje natural, 
un programa de ordenador, una máquina u otro procedimiento que se pone en marcha con cierto grado de autonomía contribuyendo a o resultando en una obra de arte completa."
_(Galanter, 2003)_
- Creative coding: uso de un lenguaje de programación como herramienta para producir resultados estéticos más que funcionales. Una variante es el live coding en el que se 
programa en directo una obra de arte improvisada _(McLean & Wiggins, 2011)_.
