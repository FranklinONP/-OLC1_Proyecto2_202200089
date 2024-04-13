import { Instruccion } from "../abstracto/Instruccion";
import CCase from './CCase';
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Simbolo from "../simbolo/Simbolo";


export default class Switch extends Instruccion {
    private condicion: Instruccion
    private instrucciones: any[]


    constructor(cond: Instruccion, ins: any[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
        console.log("Entro al constructor del switch")
    }
//Podria necesitar una nueva tabla
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // El cond es 1 solo para todo...
        // El ins trae en cada nodo su comparador y sus instrucciones
        // Si tuviese default el ultimo lo traera
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond


        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia Switch")
        console.log("Impresion del cuerpo del switch")
        console.log(this.instrucciones)
        console.log("---------------------------------")

        for (var i = 0; i < this.instrucciones.length; i++) {
            var objeto = this.instrucciones[i];
            var compTemp=objeto.expresion.interpretar(arbol,tabla)
            
            if (cond==compTemp) {
                console.log("Condicion: "+cond+" compTemporal: "+compTemp)
                console.log("Es igual/true")
                console.log(objeto.defaultCase)
                for (let i of objeto.instrucciones) {
                    if (i instanceof Break) return i;
                    let resultado = i.interpretar(arbol, newTabla)

                } return
            }else{
                if(objeto.defaultCase){
                   for (let i of objeto.defaultCase   ) {
                    if (i instanceof Break) return i;
                    let resultado = i.interpretar(arbol, newTabla)
                    }   
                }  
            }   
        }      
    }
}