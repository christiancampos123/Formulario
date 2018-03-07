# Formulario

Enlace a mi Formulario:https://rawgit.com/christiancampos123/Formulario/master/Index.html


Este Formulario es un trabajo de clase de Lenguaje de Marcas

Consiste en:

-Un formulario con 10 preguntas. De esas 10 preguntas hay 2 de escribir en una caja, 2 de tipo selección, 2 de tipo
selección múltiple, 2 de tipo checkbox y 2 de radio.

-El formulario tiene la capacidad de autocorregirse con un botón de enviar.

-El formulario con el javascript suma una puntuación por preguntas acertadas y resta por preguntas falladas en los casos
ajenos a los de escribir. (Además es posible sacar una nota negativa, para que las medias sean correctas y no se haga al azar)

-Al compartirlo en facebook tiene un diseño establecido.

-Está implementado para móviles con un diseño ergonómico y una letra decentemente grande. Además puedes clicar o marcar
las casillas mediante clicar el texto, lo cual facilita el contestar.

-Este test en concreto esta basado en la temática de Fallout 3, por lo cual pese a que muchas preguntas sean de libre
contestación, solo dará por válidas las que te permiten ser el tatuador de el refugio 101.

Dispone de:

-Una página principal con las instrucciones y un botón para iniciar el test.

-La página del test.

-Un desplegable con tu nota y dos botones. (repetir test y volver al inicio).


JavaScript:

-Hace un recorrido asegurando que has contestado todo. En caso de que no se haya contestado todo sale un alert.

-Guarda todas las respuestas en una array.

-Implementa una corrección de cada uno de los tipos de preguntas. Lo hace mediante comparar los valores guardados en la array
con los que son correctos del xml.

-Hace un sumatorio de los valores de cada pregunta y restas.

-Hace un display none de toda la página mostrando solo el valor de tu nota y dos botones.
