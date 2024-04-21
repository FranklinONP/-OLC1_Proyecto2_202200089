import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Contador from "../simbolo/Contador";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class AsignacionVar extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        console.log("Valor interpretado: ", NewValor)
        if (NewValor instanceof Errores) return NewValor
        console.log("1")
        let valor = tabla.getVariable(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.col)
        console.log("2")
        //Esta linea no deberia de borrala pero sino la borro no funciona con el La conversion de caracter a cadena (en arreglos)
        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)
        console.log("3")    
        this.tipoDato = valor.getTipo()
        console.log("Desde asignacion de AsignacionVar: "+NewValor)
        valor.setValor(NewValor)


    }

    getAST(anterior: string): string {

        let contador = Contador.getInstancia();
        let result = "";


        let padre = `n${contador.get()}`;
        let variable = `n${contador.get()}`;
        let varNombre = `n${contador.get()}`;
        let igual = `n${contador.get()}`;
        let asignacion = `n${contador.get()}`;

        result += ` ${padre}[label="Asignacion de Variable"];\n`;
        result += `${variable}[label="ID"];\n`;
        result += `${varNombre}[label="${this.id}"];\n`;
        result += `${igual}[label="="];\n`;
        result += `${asignacion}[label="Expresion"];\n`;

        result += ` ${anterior} -> ${padre};\n`;
        result += `${padre} -> ${variable};\n`;
        result += `${variable} -> ${varNombre};\n`;
        result += `${padre} -> ${igual};\n`;
        result += `${padre} -> ${asignacion};\n`;

        result += this.exp.getAST(asignacion);

        return result;
    }
}