<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Svelte](#svelte)
- [Conceptos importantes](#conceptos-importantes)
  - [Componente](#componente)
  - [props](#props)
  - [¿Se utilizan hooks?](#%C2%BFse-utilizan-hooks)
- [Cómo crear un proyecto de Svelte](#c%C3%B3mo-crear-un-proyecto-de-svelte)
- [Crear nuestro primer componente](#crear-nuestro-primer-componente)
- [Etiqueta script](#etiqueta-script)
- [main.js](#mainjs)
- [Componentes anidados](#componentes-anidados)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Svelte

Svelte es un marco de trabajo reactivo para realizar aplicaciones web con JavaScript. No utiliza un DOM Virtual como React o Vue, por lo que es más rápido ya que no se necesita descargar el entorno de ejecución de React o Vue que transformará el DOM virtual en html. En el caso de Svelte se traduce directamente en JavaScript Vanilla (eso de crear el elemento, agregarle las propiedades, agregarlo al dom).

# Conceptos importantes

## Componente

Un componente es una parte modular y reutilizable de una aplicación que encapsula una funcionalidad específica y puede tener su propio estado, propiedades y métodos. Se utiliza en el desarrollo de aplicaciones web para construir interfaces de usuario interactivas y dinámicas.

## props

Las props, o propiedades en español, son un mecanismo que se utiliza en el desarrollo de aplicaciones web para pasar datos de un componente a otro. Las props son valores que se pasan como argumentos a un componente y se utilizan para configurar su comportamiento y apariencia.

## ¿Se utilizan hooks?

A diferencia de otros frameworks de JavaScript como React o Vue, Svelte no utiliza hooks en el sentido tradicional. En su lugar, Svelte ofrece una sintaxis de **"reactive declarations"** y **"reactive assignments"** que permiten a los desarrolladores declarar variables reactivas y efectos secundarios de manera más simple y directa.

Las declaraciones reactivas de Svelte son similares a los hooks de React en el sentido de que permiten que el componente reaccione a los cambios en los datos y actualice la interfaz de usuario en consecuencia. Sin embargo, la sintaxis es diferente y más simple que la de los hooks de React.

En lugar de tener que escribir funciones específicas de ciclo de vida como useEffect o useMemo, Svelte permite a los desarrolladores escribir declaraciones reactivas de una manera más simple y natural. Por ejemplo, en lugar de usar un hook de useEffect para suscribirse a una fuente de datos externa, se puede utilizar una declaración reactiva que actualiza automáticamente el componente cuando cambian los datos.



# Cómo crear un proyecto de Svelte

Para utilizar Svelte necesitamos node.js.

En la terminal escribiremos el siguiente código para utilizar su plantilla.

Seguiremos los pasos que queramos con las flechitas y el enter. Y nos creará la plantilla del proyecto. 

```
npm init vite my-app -- --template svelte
cd my-app
npm install
npm run dev
````

npm init vite my-app -- --template svelte -> crea la plantilla.

cd myapp -> nos mueve de directorio.

npm install -> nos instala las dependencias.

npm run dev -> ejecuta la app.


Cuando creemos componentes los pondremos dentro de src.
Dentro de src y dentro de assets para importar las imágenes por ejemplo.

Existe un estándar de como estructurar nuestros archivos.

El archivo vite.config.js contiene un plugin de vite.
Será el encargado de hacer la transformación de .svelte a .js y .css por lo que no tocaremos nada de aquí.


Borraremos lo que se encuentre en app.sevlte, y lo demás que no usaremos.

A mi me apareció un error que decía que no encontraba el plugin vite, tan solo fui al vite.config y le agregué el ;

<img src="Imagenes-markdown\img_introducción\error.png">

Entonces una vez lograda la limpieza comenzaremos.

<img src="Imagenes-markdown\img_introducción\limpieza.png">

# Crear nuestro primer componente

Dentro de app.svelte pondremos el código html que queremos que sea renderizado.

Renderizado es transformar lo que se encuentre en el componente sea html, css y js independientes en un navegador web. Al pintar un componenente por pantalla lo estamos renderizando. A mi me gusta decir "que aparezca en pantalla".

Puedo dividir la pantalla para ver los cambios en tiempo real.

Puedo poner html, css y js dentro de nuestro componente de svelte.

Cuando el svelte sea transformado por js estandar el proceso de compilacion se ocupará de extraer los estilos que le hayamos puestos y de transformarlo para asegurarse de que si existen mas componentes con las mismas etiquetas nunca coincidan y no haya ningun tipo de conflicto.

Cuando hagamos un componente de svelte no será siempre necesario crear clases para a la etiquetas &lt;h1&gt; &lt;p&gt; en nuestro ejemplo.

A lo que me refiero, &lt;h1 class="titulo"&gt;


```html
<h1>Hola mundo</h1>
<p>Este será nuestro primer componente</p>

<style>
    h1{
        font-size:2rem;
        text-align center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>
```

Como resultado:

<img src="Imagenes-markdown\img_introducción\primer-componente.png">

Al inspeccionar el elemento veremos lo que dije anteriormente, eso de no preocuparnos en crear las clases.

En la plantilla de proyecto por default viene un stylesheet app.css donde ahí le da color a toda la página. Habría que ver que es mas recomendable. Pero al menos sabemos que es lo que hace svelte por detras al agregar estilos a nuestras etiquetas HTML.

También podremos crear clase tipo .title, de todas formas hará ese cambio y se asegurará de que no haya nombre de clases superpuestas.

<img src="Imagenes-markdown\img_introducción\primer-componente-class.png">

En un componente de svelte se suele tener la siguiente estructura

```html
<!--Javascript-->
<script>
</script>

<!--Html-->
<h1 class="title"> Hola mundo!</h1>

<!--Css-->
<style>
    .title{
        font-color:blue;
    }
</style>
```

Pues en la etiqueta script pondremos nuestro código js y para declarar los datos dinámicos y los atributos de entrada. Los datos dinámicos están asociados al concepto de Binding.

# Etiqueta script

Svelte nos permite interpolar las variables en nuestro html {variable}. Como si fuese un innerHTML = ''.

Lo transforma a string el {}, todo lo que está dentro es .js.



```html
<script>
  let momento = 'bonita tarde';
</script>

<h1>Hola mundo</h1>
<p>Que tenga una {momento}</p>
<p>{new Date()}</p>
<p>{[1, 2, 3]}</p>
<p>{2+2}</p>


<style>
    h1{
        font-size:2rem;
        text-align: center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>


```


<img src="Imagenes-markdown\img_introducción\script.png">

Cuando fabriquemos un componente podremos introducir desde fuera valores mediante las props.

Mediante export diremos que es un prop, en nuestro main.js le tendremos que decir que nuestra componente app tiene un prop llamado nombre que tendrá el valor 'Laureano' por ejemplo.


```html
<script>
  export let nombre;
  let momento = 'bonita tarde';
</script>

<h1>Hola mundo</h1>
<p>Que tenga una {momento}</p>
<p>{new Date()}</p>
<p>{[1, 2, 3]}</p>
<p>{2+2}</p>


<style>
    h1{
        font-size:2rem;
        text-align: center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>
```

# main.js

Veremos que se importa /App.svelte con el nombre de App. Aquí en main.js se imprimen en pantalla los componentes.

Los componentes lo utilizaremos tal cual como un **elemento de javascript** que puede ser instanciado como una clase más con new App.

**new App({})** creará un nuevo componente app y como parámetro le pasaremos un objeto con toda la información que queremos que tenga con el mundo exterior.

Al componente principal le pondremos el parámetro target para decirle donde queremos que se 'pinte'.

En este caso es desde document.body, pero podría ser dentro de un div más.

Y otro elemento que podemos pasar como parametros son las **prop**iedades que queremos que tenga. 

Son los pares clave-valor que queremos introducir desde afuera.

Este es nuestro main.js

```js

import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props:{
    nombre:"Laureano",
  }
})

export default app

```

Este es nuestro App.svelte

```html
<script>
  export let nombre;
  let momento = 'bonita tarde';
</script>

<h1>Hola {nombre}</h1>
<p>Que tenga una {momento}</p>
<p>{new Date()}</p>
<p>{[1, 2, 3]}</p>
<p>{2+2}</p>


<style>
    h1{
        font-size:2rem;
        text-align: center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>
```

Da como resultado que se muestre en nuestro titulo Hola Laureano.

<img src="Imagenes-markdown\img_introducción\props.png">

# Componentes anidados

Veremos ahora como anidar los componentes.

Cuando hagamos una aplicación orientada a componentes existirán componentes que tienen componente más pequeñitos para lograr una gran aplicación.

Por ejemplo crearemos un componente llamado Interior.

Dentro de la carpeta **src** crearemos nuestro nuevo componente.

Interior.svelte contendrá lo siguiente:

```html
<script>
export let apellido; //prop externo esperado
</script>

<h2>Componente Interior</h2>
<p>Aquí pondremos valor del prop apellido: {apellido}</p>

<style>
    p{
        color:brown;
    }
</style>
```

Para imprimir el componente por pantalla debemos ponerlo dentro de nuestro App.svelte por lo que tendremos que importarlo.

Lo importaremos y le llamaremos Interior. Si ponemos &lt;Interior/&gt; significará que el componente no tendrá más descendencia.

Recordemos que Interior tiene declarado un **export let apellido** asi que estará esperando que le asignemos un valor, sino nos dará error.

```html
<script>
  import Interior from "./Interior.svelte";
  export let nombre;
  let momento = 'bonita tarde';
</script>

<h1>Hola {nombre}</h1>
<p>Que tenga una {momento}</p>
<Interior apellido="Chaves"/> 


<style>
    h1{
        font-size:2rem;
        text-align: center;
        color:#5F9EA0;
    }

    p{
        font-family:sans-serif;
    }
</style>
```

Aquí podremos ver mejor aun que cada etiqueta tendrá su propia clase creada por su componente svelte. Vemos que H1 tiene un estilo completamente diferente y que el parrafo también (sin mezclas).

<img src="Imagenes-markdown\img_introducción\componente-interior.png">

En &lt;Interior/ apellido="Chaves"&gt; también podríamos poner algo tipo &lt;Interior apellido={param}/&gt;

**Escribiremos los nombres de las etiquetas de los componentes en con la primera letra en mayúsculas para diferenciar de las etiquetas HTML.**





