import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import Return from "./return";

export default class Metodo extends Instruccion {

    public id: string;
    public parametros: any = [];
    public instrucciones: Instruccion[];
    public tipo: Tipo;
    public valorRetorno: any = Instruccion;

    constructor(id: string, tipo: Tipo, parametros: any[], instrucciones: Instruccion[], linea: number, columna: number) {
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        if (this.tipo.getTipo() == tipoDato.VOID) {


            for (let i of this.instrucciones) {

                let resultado = i.interpretar(arbol, tabla);
                if (resultado instanceof Errores) {
                    return resultado;
                }

                if (resultado instanceof Return) {
                    //console.log("Retorno en metodo")
                    if (resultado.expresion != undefined) {
                        return resultado;
                    }
                    return;

                }

            }

        }else{

            let existeReturn = false;
            
            for(let i of this.instrucciones){
                if(i instanceof Return){
                    existeReturn = true;
                    if(i.expresion != undefined){
                        this.valorRetorno = i.expresion;
                        //console.log("lo que quiero probar es:"+i.expresion.tipoDato.getTipo()+" "+this.tipo.getTipo());
                        if(this.tipo.getTipo() != i.expresion.tipoDato.getTipo()){
                            arbol.Print("Error Semantico: El tipo de retorno no coincide con el tipo de la función. linea:"+ this.linea+" columna: " +(this.columna+1));
                            return new Errores("Semantico", "El tipo de retorno no coincide con el tipo de la función", this.linea, this.columna);
                        }
                        return i.expresion;
                    }else{
                        arbol.Print("Error Semantico: El return debe retornar un valor. linea:"+ this.linea+" columna: " +(this.columna+1));
                        return new Errores("Semantico", "El metodo no retorna un valor", this.linea, this.columna);
                    }
                }
                let resultado = i.interpretar(arbol, tabla);
                if(resultado instanceof Errores){
                    return resultado;
                }

                if(resultado instanceof Return){
                    if(resultado.expresion != undefined){
                        //console.log(resultado.expresion.tipoDato.getTipo());
                        existeReturn = true;
                        this.valorRetorno = resultado.expresion;
                        //console.log("lo que quiero probar es:"+resultado.expresion.tipoDato.getTipo());
                        //console.log("this.tipo.getTipo():"+this.tipo.getTipo()+" resultado.tipoDato.getTipo():"+resultado.expresion.tipoDato.getTipo());
                        /*if(this.tipo.getTipo() != resultado.expresion.tipoDato.getTipo()){
                           arbol.Print("Error Semantico: El tipo de retorno no coincide con el tipo de la función. linea:"+ this.linea+" columna: " +(this.columna+1));
                            return new Errores("Semantico", "El tipo de retorno no coincide con el tipo de la función", this.linea, this.columna);
                        }*/
                        //console.log(resultado.expresion.tipoDato.getTipo());
                        return resultado.expresion;
                    }else{
                        arbol.Print("Error Semantico: El return debe retornar un valor. linea:"+ this.linea+" columna: " +(this.columna+1));
                        return new Errores("Semantico", "El metodo no retorna un valor", this.linea, this.columna);
                    }
                }

            }

            if(existeReturn == false){
                arbol.Print("Error Semantico: No existe un return en la función. linea:"+ this.linea+" columna: " +(this.columna+1));
                return new Errores("Semantico", "No existe un return en la función", this.linea, this.columna);
            }

        }
    }

}