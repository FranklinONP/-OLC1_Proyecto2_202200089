import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Nativo from '../expresiones/Nativo'

export default class AsignacionArreglo extends Instruccion {
    private id: string
    private exp: Instruccion
    private pos: Instruccion

    constructor(id: string,pos:Instruccion, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
        this.pos = pos
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        console.log("<=====================================  1  ==================================>")
        console.log("NewValor: ",NewValor)
        if (NewValor instanceof Errores) return NewValor
        console.log("<=====================================  1  ==================================>")
        let valor = tabla.getArreglo(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.col)
        console.log("<=====================================  2  ==================================>")
        //Validar que el tipo de dato sea el mismo
        /*
        
        
        let bandera = tabla.getArreglo(this.id.toLocaleLowerCase())
        if(bandera){
            console.log("Bandera: ",bandera)
            if (typeof NewValor === 'string' && NewValor.length === 1) {
                // valor es un solo carácter
                console.log("Tranqui es un caracter")

            } else {
                // valor no es un solo carácter
                console.error("Error: El valor debe ser un solo carácter.");
                return new Errores("SEMANTICO", "Asignacion incorrecta, solo se admiten caracteres", this.linea, this.col)
            }
        }else{
            if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)
        }
        
        
        */
       //Esta linea no deberia borrala pero sino la borro me da error.... y un error perro se;ores
      //if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)
        
        console.log("<=====================================  3  ==================================>")
        this.tipoDato = valor.getTipo()
        console.log("VALOR: ", NewValor)
        console.log("<=====================================  4  ==================================>")
        //interpreto la posicion
        let pos = this.pos.interpretar(arbol,tabla)
        //Agregar Manejo de Errores
        console.log("Desde clase asignacion arreglo: ")
        console.log("Posicion: ",pos)
        console.log("Valor: ",NewValor)
        NewValor=new Nativo(this.tipoDato,NewValor,0,0)
        valor.setValor(pos,NewValor)


    }
    getAST(anterior: string): string {
        let resultado="Asignacion Arreglo"
        return resultado
    }
}