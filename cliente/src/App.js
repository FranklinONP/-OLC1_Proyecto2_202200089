import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";

function App() {
  const editorRef = useRef(null);
  const consolaRef = useRef(null);
  const [arreglo, setArreglo] = useState([]);
  const [tablaSimbolos, setTablaSimbolos] = useState([]);
  const [ast, setAST] = useState([]);
  const [showArregloModal, setShowArregloModal] = useState(false);
  const [showTablaSimbolosModal, setShowTablaSimbolosModal] = useState(false);
  const [showASTModal, setShowASTModal] = useState(false);

  function handleEditorDidMount(editor, id) {
    if (id === "editor") {
      editorRef.current = editor;
    } else if (id === "consola") {
      consolaRef.current = editor;
    }
  }

  function interpretar() {
    var entrada = editorRef.current.getValue();
    fetch("http://localhost:4000/interpretar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entrada: entrada }),
    })
      .then((response) => response.json())
      .then((data) => {
        consolaRef.current.setValue(data.Respuesta);
      })
      .catch((error) => {
        alert("Error al compilar la entrada.");
        console.error("Error:", error);
      });
  } 

    function reporteErrores() {
    fetch("http://localhost:4000/errores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
      .then(response => response.json())
      .then(data => {
       setArreglo(data.listaErrores);

       console.log(data.listaErrores)
       console.log("Arreglo de errores")
       console.log(arreglo);
      })
      .catch((error) => {
        alert("Error al generar el reporte de errores.");
        console.error("Error:", error);
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
  };
///==============================================================

  const mostrarArregloModal = () => {
    reporteErrores();
    setShowArregloModal(true);
  };

  const mostrarTablaSimbolosModal = () => {
    setShowTablaSimbolosModal(true);
  };

  const mostrarASTModal = () => {
    setShowASTModal(true);
  };

  const handleCloseArregloModal = () => {
    setShowArregloModal(false);
  };

  const handleCloseTablaSimbolosModal = () => {
    setShowTablaSimbolosModal(false);
  };

  const handleCloseASTModal = () => {
    setShowASTModal(false);
  };

  return (
    <div className="App">
      <div className="text-center">
        <h1>|====Organizacion de Lenguajes y Compiladores 1====|</h1>
      </div>
      <br></br>
      <div className="text-center">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col">
              <label htmlFor="file" className="btn btn-primary btn-lg">
                Seleccionar Archivo
                <input
                  type="file"
                  id="file"
                  className="d-none"
                  onChange={CargarArchivo}
                />
              </label>
            </div>
            <div className="col">
              <input
                type="button"
                value="Ejecutar"
                id="btnCargar"
                className="btn btn-primary btn-lg"
                onClick={interpretar}
              />
            </div>
            <div className="col">
              <input
                type="button"
                value="Reporte de Errores"
                className="btn btn-primary btn-lg"
                onClick={mostrarArregloModal}

              />
            </div>
            <div className="col">
              <input
                type="button"
                value="Tabla de Símbolos"
                className="btn btn-primary btn-lg"
                onClick={mostrarTablaSimbolosModal}
              />
            </div>
            <div className="col">
              <input
                type="button"
                value="AST"
                className="btn btn-primary btn-lg"
                onClick={mostrarASTModal}
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="text-center style={{ height: '80%', width: '80%' }} ">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Entrada</h1>
              <Editor
                height="90vh"
                defaultLanguage="java"
                defaultValue=""
                theme="vs-dark"
                onMount={(editor) => handleEditorDidMount(editor, "editor")}
              />
            </div>
            <div className="col">
              <h1>Consola</h1>
              <Editor
                height="90vh"
                defaultLanguage="cpp"
                defaultValue=""
                theme="vs-dark"
                options={{ readOnly: true }}
                onMount={(editor) => handleEditorDidMount(editor, "consola")}
              />
            </div>
          </div>
        </div>
      </div>

      {showArregloModal && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={handleCloseArregloModal}>
              &times;
            </span>
            <h2>Reporte de Errores</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Fila</th>
                  <th>Columna</th>
                  {/* Agrega más encabezados de columna según tus datos */}
                </tr>
              </thead>
              <tbody>
                {arreglo.map((element, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{element.tipoError}</td>
                    <td>{element.desc}</td>
                    <td>{element.fila}</td>
                    <td>{element.col}</td>
                    {/* Ajusta las celdas según la estructura de tu arreglo */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTablaSimbolosModal && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={handleCloseTablaSimbolosModal}>
              &times;
            </span>
            <h2>Tabla de Símbolos</h2>
            {/* Aquí puedes mostrar la tabla de símbolos */}
          </div>
        </div>
      )}

      {showASTModal && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={handleCloseASTModal}>
              &times;
            </span>
            <h2>AST</h2>
            {/* Aquí puedes mostrar el AST */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
