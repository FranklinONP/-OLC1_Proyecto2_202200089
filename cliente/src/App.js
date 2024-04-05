import { useEffect, useState, useRef } from "react"
import './App.css';
import Editor from '@monaco-editor/react';

function App() {
  const editorRef = useRef(null);
  const consolaRef = useRef(null);

  function handleEditorDidMount(editor, id) {
    if (id === "editor") {
      editorRef.current = editor;
    } else if (id === "consola") {
      consolaRef.current = editor;
    }
  }


  function interpretar() {
    var entrada = editorRef.current.getValue();
    fetch('http://localhost:4000/interpretar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entrada: entrada }),
    })
      .then(response => response.json())
      .then(data => {
        consolaRef.current.setValue(data.Respuesta);
      })
      .catch((error) => {
        alert("Error al compilar la entrada.")
        console.error('Error:', error);
      });
  }

  const CargarArchivo = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var contents = event.target.result;
      editorRef.current.setValue(contents);
    };
    reader.readAsText(file);
  }


  return (
    <div className="App">
      <div class='text-center'>
        <h1>|====Organizacion de Lenguajes y Compiladores 1====|</h1>
      </div>
      <br></br>
      <div class='text-center'>
        

      <div class="container">
        <div class="row d-flex justify-content-between">
          <div class="col">
            <label for="file" class="btn btn-primary btn-lg">
              Seleccionar Archivo
              <input type="file" id="file" class="d-none" onChange={CargarArchivo} />
            </label>
          </div>
          <div class="col">
            <input type="button" value="Ejecutar" id="btnCargar"  class="btn btn-primary btn-lg" onClick={interpretar} />
          </div>
        </div>
      </div>


        
      </div>
      <br></br>
      <div class='text-center style={{ height: "80%", width: "80%" }} '>
        <div class="container" >
          <div class="row">
            <div class="col">
              <h1>Entrada</h1>
              <Editor height="90vh" defaultLanguage="java" defaultValue="" theme="vs-dark" onMount={(editor) => handleEditorDidMount(editor, "editor")} />
            </div>
            <div class="col">
              <h1>Consola</h1>
              <Editor height="90vh" defaultLanguage="cpp" defaultValue="" theme="vs-dark" options={{ readOnly: true }} onMount={(editor) => handleEditorDidMount(editor, "consola")} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
