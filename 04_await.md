<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Directiva await](#directiva-await)
- [Conceptos importantes](#conceptos-importantes)
  - [Promesas](#promesas)
  - [Función async en js](#funci%C3%B3n-async-en-js)
  - [fetch() en js](#fetch-en-js)
  - [Payloads](#payloads)
  - [Resumen](#resumen)
- [await en Svelte](#await-en-svelte)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Directiva await

await es una interesante directiva que podemos insertar en el marcado de un componente de Svelte para que se resuelva una promesa sobre la marcha, renderizando un marcado u otro en función de en qué etapa de la promesa se encuentra: resolviendo, completada o fallida.

# Conceptos importantes

## Promesas

Una promesa (Promise en inglés) es un objeto de JavaScript que representa un valor que puede estar disponible ahora, en el futuro, o nunca. Una promesa es un mecanismo para trabajar con operaciones asincrónicas en JavaScript.

Cuando se realiza una operación asincrónica, en lugar de esperar a que se complete para continuar con la ejecución del código, se puede devolver una promesa que representa el resultado de la operación. La promesa puede estar en uno de tres estados: pendiente (pending), resuelta (fulfilled) o rechazada (rejected).

Si la promesa se resuelve, se devuelve un valor que puede ser utilizado por el código que la llamó. Si la promesa es rechazada, se devuelve un objeto de error que puede ser manejado por el código que la llamó. Las promesas permiten un manejo más claro y estructurado de operaciones asincrónicas en JavaScript, evitando el anidamiento excesivo de callbacks y mejorando la legibilidad del código.

## Función async en js

Una función async es una función de JavaScript que se utiliza para trabajar con operaciones asincrónicas de manera más legible y estructurada. Las funciones async son funciones que devuelven una promesa, lo que significa que pueden ser usadas con la palabra clave "await" para esperar a que se complete una operación asincrónica antes de continuar con la ejecución del código.

```js
async function miFuncion() {
  // Hacer algo asincrónico
  return resultado;
```

En este ejemplo, se declara una función llamada "miFuncion" como async. Esta función realiza alguna operación asincrónica y devuelve un resultado. La función devuelve una promesa, que puede ser manejada utilizando los métodos "then" y "catch" como cualquier otra promesa.

**Al usar la palabra clave "await" dentro de una función async, se espera a que se complete una operación asincrónica antes de continuar con la ejecución del código.**

Por ejemplo, supongamos que tenemos una función asincrónica que realiza una operación de solicitud HTTP. Podemos usar "await" para esperar a que se complete la solicitud antes de continuar con el código que depende del resultado de la solicitud:
```js
async function miFuncion() {
  const respuesta = await fetch('https://ejemplo.com/api/datos');
  const datos = await respuesta.json();
  return datos;
}
```
En este ejemplo, la función "miFuncion" utiliza "fetch" para realizar una solicitud HTTP asincrónica y espera a que la solicitud se complete con "await". Luego, se utiliza "await" para esperar a que se convierta la respuesta en formato JSON. Finalmente, se devuelve el resultado como un objeto JSON.

## fetch() en js

"fetch" es una función de JavaScript que permite realizar peticiones HTTP asincrónicas a un servidor y obtener datos en formato JSON, texto, blob, ArrayBuffer, entre otros. Se utiliza principalmente para consumir servicios web y actualizar dinámicamente la información en una página web sin tener que recargarla.

Un ejemplo básico de cómo usar "fetch" en JavaScript para obtener datos en formato JSON desde un servidor podría ser el siguiente:

```js
fetch('https://ejemplo.com/api/datos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

En este ejemplo, la función "fetch" se utiliza para obtener los datos de la API ubicada en https://ejemplo.com/api/datos. El método "then" se utiliza para manejar la respuesta y transformar los datos a formato JSON utilizando el método "json()". Luego, los datos se imprimen en la consola mediante el método "console.log". Finalmente, se utiliza el método "catch" para manejar cualquier error que pueda surgir durante el proceso.

## Payloads

El término "payload" se refiere a los datos que se transportan en una comunicación, como una solicitud HTTP o un paquete de red. En general, se trata de los datos "útiles" que se transmiten, excluyendo la información adicional necesaria para la transmisión en sí.

En el contexto de las solicitudes HTTP, el payload se refiere a los datos que se envían en el cuerpo de la solicitud. Por ejemplo, en una solicitud POST, los datos del formulario que se envían en el cuerpo de la solicitud se consideran el payload. En una solicitud GET, no hay payload ya que los datos se transmiten en la URL.

En el contexto de la seguridad informática, el término "payload" se refiere a los datos maliciosos que se envían como parte de un ataque informático. Por ejemplo, en un ataque de inyección SQL, el payload podría ser un comando SQL malicioso que se envía al servidor con la intención de comprometer la seguridad del sistema.

En resumen, el término "payload" se utiliza para referirse a los datos transportados en una comunicación, que pueden ser útiles o maliciosos dependiendo del contexto.

## Resumen

Las promesas, fetch, las funciones asíncronas y el await son herramientas de JavaScript que se utilizan para trabajar con operaciones asincrónicas y hacer el código más legible y estructurado.

Las **promesas** son objetos que representan un valor que puede estar disponible ahora, en el futuro o nunca, y se utilizan para manejar operaciones asincrónicas. Las promesas pueden estar en **tres estados**: pendiente, resuelta o rechazada, y se pueden manejar con los métodos then y catch.

**Fetch** es una API de JavaScript que se utiliza para realizar solicitudes HTTP asincrónicas. Fetch devuelve una promesa que se puede manejar para obtener la respuesta de la solicitud y procesarla de acuerdo a las necesidades.

Las funciones asincrónicas son funciones que se utilizan para manejar operaciones asincrónicas de manera más legible y estructurada. Las **funciones asincrónicas devuelven una promesa** que se puede manejar con los métodos then y catch, y se pueden utilizar con la palabra clave await para esperar a que se complete una operación asincrónica antes de continuar con la ejecución del código.

La palabra clave **await** se utiliza dentro de funciones asincrónicas para esperar a que se complete una operación asincrónica antes de continuar con la ejecución del código. Cuando se utiliza await, el código se detiene hasta que se resuelve la promesa asociada a la operación asincrónica, lo que permite un manejo más claro y estructurado de operaciones asincrónicas en JavaScript.

El término **"payload"** se refiere a los datos que se transportan en una comunicación, como una solicitud HTTP o un paquete de red. En general, se trata de los datos "útiles" que se transmiten, excluyendo la información adicional necesaria para la transmisión en sí.

# await en Svelte

Haremos un petición fetch 'falsa'. Recordemos que fetch devolverá una promesa y luego con el "then" podremos acceder a los datos de la promesa.

```html
<script>
  function fetch(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          nombre: "Rita la autora",
          edad: 41,
          ocupacion: "Autora de libros de comedia"
        })*/
      }, 3000)
    })
  }
</script>
```

En otros frameworks es posible que gestionar las promesas sea un poquito mas complicado asignando una variable local un valor y una vez que se resuelva la promesa cambiar ese valor y pintar el componente en el DOM.

En el caso de Svelte tiene una estructura propia de gestión de promesas -> el **await -> {# await funcion()}**


Pondremos en el await una función de una promesa que queremos esperar que se resuelva y entre medias pondremos el código que se pinte/renderice en pantalla mientras se esté resolviendo la función asincrona.

Si se resuelve la promesa entrará por then y se actualizará en pantalla los datos obtenidos.

También podría poner un catch si fuese rechazada.

Y acordarse de cerrar el await.

```html
{#await fetch()} 
<p>Un segundo que estamos resolviendos cosas . . .</p>
{:then payload}
<p>Nombre: {payload.nombre}</p>
<p>Edad: {payload.edad}</p>
<p>ocupacion: {payload.ocupacion}</p>
{/await}
```
Durante los primeros 3 segundos vemos el mensaje mientras se está resolviendo la petición. Y luego nos aparece el resultado dentro del .then

<img src="Imagenes-markdown\img_await\03.gif">

Y si queremos que también maneje el error primero lo forzamos comentando el codigo del resolve y poniendo el del reject

```html
<script>
  function fetch(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        /*resolve({
          nombre: "Rita la autora",
          edad: 41,
          ocupacion: "Autora de libros de comedia"
        })*/
        reject("Tenemos un problema para sacar los datos")
      }, 3000)
    })
  }
</script>
```
Luego en el html

```html
{#await fetch()} 
<p>Un segundo que estamos resolviendos cosas . . .</p>
{:then payload}
<p>Nombre: {payload.nombre}</p>
<p>Edad: {payload.edad}</p>
<p>ocupacion: {payload.ocupacion}</p>
{:catch e}
  <strong>Error: {e}</strong>
{/await}
```

Luego de 3 segundos el mensaje de error aparecerá

<img src="Imagenes-markdown\img_await\05.gif">


