import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";    
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Arreglo from '../simbolo/Arreglo'
import Nativo from '../expresiones/Nativo'

export default class DeclaracionArreglo extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string;
    private valor: Instruccion[]|any
    private tamano: Instruccion
    private bandera= false


    constructor(tipo: Tipo, linea: number, col: number, id: string , valor: Instruccion[]|any,tamano: Instruccion,bandera: boolean) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.tamano = tamano
        this.bandera = bandera
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null) {
            let tamano = parseInt(this.tamano.interpretar(arbol, tabla))
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    /*
                    case tipo_dato.ENTERO:
                    let arreglo: Nativo[] = new Array<Nativo>(tamano1Num);
                    for (let i = 0; i < arreglo.length; i++) {
                        arreglo[i] = new Nativo(this.tipo_dato, "0", 0, 0);
                    }
                    if (!tabla.setArreglo(new Arreglo(this.tipo_dato,this.fila,this.columna,this.identificador, arreglo))){
                        let error = new Errores("Semántico", "La Variable Ya Existe.", this.fila, this.columna);
                        arbol.agregarError(error);
                        arbol.setConsola("Semántico: La Variable Ya Existe.\n")
                        return error
                    }
                    break
                    */

                    let arregloVacio: Nativo[] = new Array<Nativo>(tamano);
                    console.log("=============Tamano de Arreglo================")
                    for (let i = 0; i < arregloVacio.length; i++) {
                        arregloVacio[i] = new Nativo(this.tipoDato, "0", 0, 0);
                    }
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio, 0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
                case tipoDato.CADENA:
                    ///pasa algo
                    let tamano2=this.tamano.interpretar(arbol,tabla)
                    let arregloVacio2: Nativo[] = new Array<Nativo>(tamano);
                    console.log("=============Tamano de Arreglo================")
                    for (let i = 0; i < arregloVacio2.length; i++) {
                        arregloVacio2[i] = new Nativo(this.tipoDato, "0", 0, 0);
                    }
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio2,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
                case tipoDato.CARACTER:
                    ///pasa algo
                    let tamano3=this.tamano.interpretar(arbol,tabla)
                    let arreglo5: Nativo[] = new Array<Nativo>(tamano);
                    for (let i = 0; i < arreglo5.length; i++) {
                        arreglo5[i] = new Nativo(this.tipoDato, '', 0, 0);
                    }

                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arreglo5, 0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }
                default:
                    console.log("Tipo de dato no soportado")
                    return new Errores("SEMANTICO", "Tipo de dato no soportado", this.linea, this.col)
             }
        } else {
            if(this.bandera){
                //Arreglo llenado con la funcion del CTR
                this.valor=this.valor.interpretar(arbol,tabla)
                console.log("Desde Bandera")
                console.log(this.valor)
                console.log("Imprimiendo pisicon 3: "+this.valor[2])
                if(!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0,true))){
                    return new Errores("SEMANTICO", "No se realizar la funcon CSTR", this.linea, this.col)
                }

            }
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:

                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                                    
                case tipoDato.CADENA:
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 

                case tipoDato.CARACTER:
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                    
                default:
                    console.log("Tipo de dato no soportado")
                    return new Errores("SEMANTICO", "Tipo de dato no soportado", this.linea, this.col)

        }

    }
}}