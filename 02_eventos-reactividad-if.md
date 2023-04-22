<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Eventos](#eventos)
  - [Definición](#definici%C3%B3n)
  - [Ejemplo de eventos](#ejemplo-de-eventos)
- [DOM y Svelte](#dom-y-svelte)
- [Reactividad](#reactividad)
- [Meta-datos del propio evento](#meta-datos-del-propio-evento)
- [Directiva if](#directiva-if)
  - [IF - ELSE](#if---else)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Eventos

## Definición 

En JavaScript, un evento es una acción que ocurre en un elemento HTML, como un clic del mouse, una pulsación de tecla o una carga de página. Los eventos en JavaScript permiten que una página web responda dinámicamente a las acciones del usuario y realice tareas en consecuencia.

JavaScript tiene una serie de eventos integrados, como el evento "click" para hacer clic en un elemento, el evento "keydown" para presionar una tecla y el evento "load" para cargar una página. También es posible crear eventos personalizados utilizando JavaScript para que una página web pueda responder a acciones específicas del usuario.

Para manejar un evento en JavaScript, se utiliza un "escuchador de eventos" o "event listener". Un escuchador de eventos es una función que se ejecuta cuando ocurre un evento específico. 

**El escuchador se agrega al elemento HTML que se está monitoreando y se activa cuando ocurre el evento especificado.**

## Ejemplo de eventos

Estos son algunos de los eventos que se permiten en js.

El prefijo **on** se utiliza para indicar que es un evento.

on+evento por ejemplo, onclick.

- click: Se activa cuando el usuario hace clic en un elemento HTML.

- mouseover: Se activa cuando el cursor del mouse pasa por encima de un elemento HTML.

- mouseout: Se activa cuando el cursor del mouse sale de un elemento HTML.

- keydown: Se activa cuando el usuario presiona una tecla del teclado.

- keyup: Se activa cuando el usuario suelta una tecla del teclado.

- submit: Se activa cuando el usuario envía un formulario HTML.

- load: Se activa cuando se carga completamente una página web.

- resize: Se activa cuando el tamaño de la ventana del navegador cambia.

- scroll: Se activa cuando el usuario desplaza la página web hacia arriba o hacia abajo.

- focus: Se activa cuando el usuario selecciona un elemento HTML, como un cuadro de texto.

- blur: Se activa cuando el usuario deselecciona un elemento HTML.

# DOM y Svelte

Por suerte yo habia aprendido a hacer 'todo a mano' creando los div, agregarle las clases, y las propiedades correspondientes mediante javascript puro para luego agregarlos también en el DOM.

Svelte no reinventa la rueda y tiene una api parecida a la tradicional.

Una diferencia con js tradicional es que se pone on:click={} por ejemplo y no onclick=

En este caso cada vez que se haga click en el botón se imprimirá por consola "Me han pulsado".

Recordemos que dentro de los { } es cualquier código js.



```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }
</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>
```

O también se podría poner todo adentro de los { } pero es más lindo y limpio separarlo.

Aquí veremos como es en linea

```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }
</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<!--Ejemplo en linea con doble click -->
<button 
on:dblclick={()=>console.log("Haz hecho doble click")}>
    Otro botón
</button>
```
Así se mostrarán por HTML

<img src="Imagenes-markdown\img_eventos\01.png">

Así actuará el escuchador de eventos llamando a las funciones respectivas de cada evento.

<img src="Imagenes-markdown\img_eventos\02.png">

# Reactividad

Con la reactividad se puede hacer que automáticamente los componentes actualicen su presentación en el momento en el que se producen modificaciones, por ejemplo, cuando un evento de teclado o de ratón se dispara.

Por ejemplo al estar introduciendo texto en un input un contador de caracteres se irá aumentando o disminuyendo según lo que vaya introduciendo por teclado.

Al pulsar y soltar una tecla haré que imprima por consola algo

```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }
    //Manejador del evento keyup de input
    function handle (){
        console.log("Me imprimo cada vez que sueltas una tecla dentro del input")
    }
</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<!--Input-->
<input type="text" placeholder="Introducir nombre" class="texto"
on:keyup={handle}/>

<style>
    .texto{
        margin: 1rem;
        font-size: 1.5rem;
        color:burlywood;
    }
</style>
```

Como resultado al interactuar obtenemos el siguiente mensaje por consola cada vez que soltamos una tecla

<img src="Imagenes-markdown\img_eventos\03.png">

# Meta-datos del propio evento

El event listener puede obtener un parametro, ese parametro tendrá información sobre el evento.

Modificamos la función handle. 

```js
 function handle (e){
        console.log(e);
    }
```
Y al soltar una tecla dentro del input nos mostrará la siguiente información.

Como veremos al imprimir el párametro e nos brinda la información del objeto KeyBoardEvent que tiene un montón de atributos que se puede utilizar.

Por ejemplo información sobre el propio elemento html en el que se ha disparado el evento. Para ello tenemos el atributo **target**

<img src="Imagenes-markdown\img_eventos\04.png">

Por si no lo encontraste se ve así.

<img src="Imagenes-markdown\img_eventos\05.png">

Podemos sacarle el valor del input con el atributo **.target.value**

<img src="Imagenes-markdown\img_eventos\06.png">

Y para qué no?

Pues podemos hacer que las cosas que querramos se muevan dinámicamente.

Por ejemplo si tengo un parrafo que diga Hola {nombre} se podrá ir actualizando a medida que voy tecleando si es que le voy asignando a nombre el valor del target.value.

Ejemplo

```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }

    // Creo una variable local nombre
    let nombre = "";
    //Modifico el valor de nombre por teclado
    function handle (e){
        nombre = e.target.value;
    }
</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<input type="text" placeholder="Introducir nombre" class="texto"
on:keyup={handle}/>

<!--Se asigna nombre reactivamente-->
<p>Hola {nombre}</p>

<style>
    .texto{
        margin: 1rem;
        font-size: 1.5rem;
        color:burlywood;
    }
</style>
```

En pantalla a medida que modifico el input se modifica el parrafo.

<img src="Imagenes-markdown\img_eventos\07.png">

Otro ejemplo, contar caracteres a medida que se escribe dentro del input.

```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }

    let nombre = "";
    let cant = 0;
    //Modifico los valores de nombre por teclado
    function handle (e){
        nombre = e.target.value;
        cant = nombre.length;
    }
</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<input type="text" placeholder="Introducir nombre" class="texto"
on:keyup={handle}/>

<!--Se asigna nombre y cant reactivamente-->
<p>Hola {nombre}, tienes {cant} caracteres en tu nombre</p>

<style>
    .texto{
        margin: 1rem;
        font-size: 1.5rem;
        color:burlywood;
    }
</style>
```
Como resultado al interaccionar

<img src="Imagenes-markdown\img_eventos\08.png">


# Directiva if

Supongamos que tengamos un botón que solo aparezca si se ha escrito en el input. Es conveniente porsupuesto utilizar una buena estructura semantica de formulario pero para aprender esto no lo vamos a hacer.

Bloquearemos y desbloquearemos el botón de envio con un if toggleando el disabled de forma dinamica.ç

Puedo alterar el comportamiento del atributo disabled asignadole código js.

```html
<button disabled={nombre == ""}>Enviar Mensaje</button>
```
<img src="Imagenes-markdown\img_eventos\09.png">

<img src="Imagenes-markdown\img_eventos\10.png">


Si escribo algo el disabled desaparece del DOM

<img src="Imagenes-markdown\img_eventos\11.png">

En caso de svelte se pueden crear if(condicion) en el html tiene una sintaxis propia

Comienza con {#if condicion} y para cerrar el bloque del código algo similar {/if}

En el ejemplo

```html
{#if nombre==""}
<p>No me has dicho como te llamas!</p>
{/if}
```
App.svelte completo hasta ahora
```html
<script>
    let quehago = () => {
        console.log("Me han pulsado")
    }

    let nombre = "";
    let cant = 0;
    //Modifico los valores de nombre por teclado
    function handle (e){
        nombre = e.target.value;
        cant = nombre.length;
    }

</script>

<button on:click={quehago}>
    Hazme click si te atreves
</button>

<input type="text" placeholder="Introducir nombre" class="texto"
on:keyup={handle}/>

<!--Se asigna nombre y cant reactivamente-->
<p>Hola {nombre}, tienes {cant} caracteres en tu nombre</p>

<button disabled={nombre == ""}>Enviar Mensaje</button>

{#if nombre==""}
<p>No me has dicho como te llamas!</p>
{/if}

<style>
    .texto{
        margin: 1rem;
        font-size: 1.5rem;
        color:burlywood;
    }
</style>
```

Si se cumple el if sucede que aparece el parrafo
<img src="Imagenes-markdown\img_eventos\12.png">

Si no se cumple, desaparece
<img src="Imagenes-markdown\img_eventos\13.png">

## IF - ELSE

Bueno si bien ya con la sintaxis del if es raro si le agregamos el else aún mas jajajajaja. RAAAAAAAAARO pero está bueno.

```html
{#if nombre==""}
<p>No me has dicho como te llamas!</p>
{:else}
<strong>Cuando sea falsa: Hola {nombre}</strong>
{/if}
```

<img src="Imagenes-markdown\img_eventos\14.png">
