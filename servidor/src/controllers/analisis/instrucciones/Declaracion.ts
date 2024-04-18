import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Declaracion extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string[];
    private valor: Instruccion
    private funcion: string
    private tipo2: string

    constructor(tipo: Tipo, linea: number, col: number, id: string [], valor: Instruccion,funcion:string,tipo2:string) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.funcion = funcion
        this.tipo2=tipo2
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //Valor por default
        if (this.valor == null) {
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, 0))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.DECIMAL:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, 0.0))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.BOOL:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, true))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.CARACTER:
                    ///pasa 
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                        //Para mientras un 0
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, "0"))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.CADENA:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, ""))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.VOID:
                    ///pasa algo
                    console.log("No se puede declarar una variable de tipo void")
             }
        }
        //Casteo
        else if(this.tipo2){
            //Trabajo el valor
            let valorFinal = this.valor.interpretar(arbol, tabla)
            if (valorFinal instanceof Errores) return valorFinal
            /*
            Como estoy casteando no seria error semantico a exepcion de los casteos que no son posibles
            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                return new Errores("SEMANTICO", "No se puede declarar variable", this.linea, this.col)
            }
            */ 
            
            //en un for debo recorrer

            let tipoPrimario=this.tipoDato.getTipo()
            
                 switch (tipoPrimario) {
                    case tipoDato.ENTERO:
                            if(this.tipo2=="double"){
                                console.log("Casteo de int a double")
                                this.identificador.forEach(elemento => {
                                console.log(Math.round(valorFinal))
                                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, parseInt(valorFinal)))){
                                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                                    } 
                                }); 
                            }else if(this.tipo2=="string"){
                                let str = valorFinal
                                    try {
                                        let numero = parseInt(str);
                                        if (isNaN(numero)) {
                                            throw new Error("El string no se puede convertir a un número");
                                        }
                                        console.log(numero); // Imprime: el numero casteado
                                            this.identificador.forEach(elemento => {
                                                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, parseInt(valorFinal)))){
                                                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                                                    } 
                                                }); 
                                    } catch (error) {
                                        console.log("Erro no se pudo hacer el casteo")
                                    }
                            }
                    case tipoDato.DECIMAL:
                        if(this.tipo2=="int"){
                            console.log("Casteo de double a int")
                                this.identificador.forEach(elemento => {
                                console.log(Math.round(valorFinal))
                                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, parseFloat(valorFinal)))){
                                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                                    } 
                                }); 
                        }
                    case tipoDato.CADENA:
                        if(this.tipo2=="double"){
                            console.log("Casteo de double a string")
                                this.identificador.forEach(elemento => {
                                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal.toString()))){
                                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                                    } 
                                }); 
                        }
                        
                               
                }
                  
               
                
                
        }
        //Asignacion normal
        else {
            let valorFinal = this.valor.interpretar(arbol, tabla)
            console.log("Valor final: "+valorFinal)
            if (valorFinal instanceof Errores) return valorFinal

            this.identificador.forEach(elemento => {
                //Aca debe ir el ciclo para setear a los ids que traiga
                if(this.funcion == "toLower"){
                    valorFinal = valorFinal.toString().toLowerCase()
                }else if(this.funcion == "toUpper"){
                    valorFinal = valorFinal.toString().toUpperCase()
                }
                else if(this.funcion == "length"){
                    valorFinal = valorFinal.length
                }
                else if(this.funcion == "round"){
                    valorFinal = Math.round(valorFinal)
                }
                else if(this.funcion == "typeof"){
                    console.log("Tipo de dato: "+valorFinal)
                    valorFinal = typeof valorFinal
                    console.log("Tipo de dato: "+valorFinal)
                    valorFinal = valorFinal.toString()
                    console.log("Tipo de dato: "+valorFinal)
                }
                else if(this.funcion == "toString"){
                    valorFinal = valorFinal.toString()
                }
                
                console.log("=============================: "+valorFinal)
                if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                    return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                }   
            });
        }

    }
}