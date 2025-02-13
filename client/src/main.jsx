// Importación de React y ReactDOM/client para renderizar la aplicación
import React from 'react'
import ReactDOM from 'react-dom/client'

// Importación del componente principal de la aplicación
import App from './App.jsx'

// Importación de estilos para la aplicación
import './index.css'

// Utilización de ReactDOM.createRoot para crear un "root" de renderización
ReactDOM.createRoot(document.getElementById('root')).render(
  // Uso de React.StrictMode para detectar posibles problemas en el código durante el desarrollo
  <React.StrictMode>
    {/* Renderización del componente principal de la aplicación (App) */}
    <App />
  </React.StrictMode>,
)



/*Importación de Bibliotecas:

React y ReactDOM: Importación de las bibliotecas principales de React para la creación de componentes y manipulación del DOM.
App: Importación del componente principal de la aplicación desde el archivo App.jsx.
index.css: Importación de estilos para la aplicación.
Creación de "Root" y Renderización:

ReactDOM.createRoot(document.getElementById('root')).render(...): Utilización de createRoot de ReactDOM 
para crear un punto de entrada ("root") en el DOM, generalmente identificado por el elemento con el ID 'root'.
 Luego, se renderiza el componente principal de la aplicación (<App />) dentro de React.StrictMode.
React.StrictMode:

<React.StrictMode>: Componente que activa un modo estricto de React. Ayuda a detectar posibles problemas en el código 
durante el desarrollo, como deprecaciones y efectos secundarios no deseados.
En resumen, este código configura el punto de entrada en el DOM, utiliza el modo estricto de React (StrictMode),
 e inicia la renderización del componente principal de la aplicación (App).*/