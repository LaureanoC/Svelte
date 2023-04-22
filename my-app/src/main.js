import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props:{
    nombre:"Laureano",
  }
})

export default app
