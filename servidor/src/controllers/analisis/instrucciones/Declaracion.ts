import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Contador from "../simbolo/Contador";


export default class Declaracion extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string[];
    private valor: Instruccion

    constructor(tipo: Tipo, linea: number, col: number, id: string [], valor: Instruccion) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
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
                    return new Errores("SEMANTICO", "No se puede declarar una variable de tipo void", this.linea, this.col)
                    
             }
        }
        //Asignacion normal
        else {
            let valorFinal = this.valor.interpretar(arbol, tabla)

            if (valorFinal instanceof Errores) return valorFinal
            
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    if (this.valor.tipoDato.getTipo() != tipoDato.ENTERO){
                        return new Errores("SEMANTICO", "El valor asignado no es de tipo entero", this.linea, this.col)
                    }
                    this.identificador.forEach(elemento => {
                        if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                            return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                        }   
                    });
                case tipoDato.DECIMAL:
                    if (this.valor.tipoDato.getTipo() != tipoDato.DECIMAL){
                        return new Errores("SEMANTICO", "El valor asignado no es de tipo decimal", this.linea, this.col)
                    }
                    this.identificador.forEach(elemento => {
                        if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                            return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                        }   
                    });
                case tipoDato.BOOL:
                    if (this.valor.tipoDato.getTipo() != tipoDato.BOOL){
                        return new Errores("SEMANTICO", "El valor asignado no es de tipo booleano", this.linea, this.col)
                    }
                    this.identificador.forEach(elemento => {
                        if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                            return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                        }   
                    });
                case tipoDato.CARACTER:
                    if (this.valor.tipoDato.getTipo() != tipoDato.CARACTER){
                        return new Errores("SEMANTICO", "El valor asignado no es de tipo caracter", this.linea, this.col)
                    }
                    this.identificador.forEach(elemento => {
                        if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                            return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                        }   
                    });
                case tipoDato.CADENA:
                    if (this.valor.tipoDato.getTipo() != tipoDato.CADENA){
                        return new Errores("SEMANTICO", "El valor asignado no es de tipo cadena", this.linea, this.col)
                    }
                    this.identificador.forEach(elemento => {
                        if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                            return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                        }   
                    });
                case tipoDato.VOID:
                    console.log("No se puede declarar una variable de tipo void")
                    return new Errores("SEMANTICO", "No se puede declarar una variable de tipo void", this.linea, this.col)
                default:
                    console.log("No se puede declarar una variable de tipo void")
                    return new Errores("SEMANTICO", "No se puede declarar una variable de tipo void", this.linea, this.col)

            
        }

    }}
    getAST(anterior: string): string {
        let result = "";
        let contador = Contador.getInstancia();

        let declar = `n${contador.get()}`;

        let tipoG = `n${contador.get()}`;
        let tipoD = `n${contador.get()}`;
        let ids = `n${contador.get()}`;

        let conjuntoID = [];
        for(let i= 0; i < this.identificador.length; i++){
            conjuntoID.push(`n${contador.get()}`);

        }
        let igual = `n${contador.get()}`;
        let valor = `n${contador.get()}`;
        let puntocoma = `n${contador.get()}`;

        result += `${declar}[label="DECLARACION DE VARIABLES"];\n`
        if(this.tipoDato.getTipo() == tipoDato.ENTERO){
            result += `${tipoD}[label="INT"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.DECIMAL){
            result += `${tipoD}[label="DOUBLE"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.BOOL){
            result += `${tipoD}[label="BOOL"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.CADENA){
            result += `${tipoD}[label="STD::STRING"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.CARACTER){
            result += `${tipoD}[label="char"];\n`
        }
        result += `${tipoG}[label="TIPOS DE DATOS"];\n`

        result += `${ids}[label="ID(S)"];\n`

        for(let i= 0; i < this.identificador.length; i++){
            result += `${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`
        }

        result += `${igual}[label="="];\n`
        result += `${valor}[label="expresion"];\n`
        result += `${puntocoma}[label=";"];\n`

       
        result += `${anterior} -> ${declar};\n`
        result += `${declar} -> ${ids};\n`
        
        result += `${declar} -> ${tipoG};\n`
        result += `${tipoG} -> ${tipoD};\n`
        
        for(let i= 0; i < this.identificador.length; i++){
            result += `${ids} -> ${conjuntoID[i]};\n`
        }

        result += `${declar} -> ${igual};\n`
        result += `${declar} -> ${valor};\n`
        result += `${declar} -> ${puntocoma};\n`

        this.valor.getAST(valor);

        return result;
    }
    
}