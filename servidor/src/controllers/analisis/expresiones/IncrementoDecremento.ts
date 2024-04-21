import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, {tipoDato} from "../simbolo/Tipo";

export default class IncrementoDecremento extends Instruccion{
    private id : string
    private signo : string

    constructor(id:string, signo:string, linea:number, columna:number){
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.id = id
        this.signo = signo
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //casteamos con <Simbolo>
        let valorVariable: Simbolo = <Simbolo> tabla.getVariable(this.id)
        if (valorVariable == null) return new Errores("Semantico", "Acceso a Variable Incrementada invalido", this.linea, this.col)
        //este tipo es para siempre estar verificando el tipo que estamos obteniendo de lo contrario sera tipo void
        this.tipoDato = valorVariable.getTipo()
        if (this.signo == "++"){
            if (this.tipoDato.getTipo() == tipoDato.ENTERO){
                let varIncrementada = parseInt(valorVariable.getValor()) + 1 ;
                valorVariable.setValor(String(varIncrementada))
            }else if (this.tipoDato.getTipo() == tipoDato.DECIMAL){
                let varIncrementada = parseFloat(valorVariable.getValor()) + 1 ;
                valorVariable.setValor(String(varIncrementada))
            } 
        }else if (this.signo == "--"){
            if (this.tipoDato.getTipo() == tipoDato.ENTERO){
                let varDecremento = parseInt(valorVariable.getValor()) - 1 ;
                valorVariable.setValor(String(varDecremento))
            }else if (this.tipoDato.getTipo() == tipoDato.DECIMAL){
                let varDecremento = parseFloat(valorVariable.getValor()) - 1 ;
                valorVariable.setValor(String(varDecremento))
            } 
        }else{
            return new Errores("Semantico", "Variable a incrementar o decrementar no aceptada", this.linea, this.col)
        }
        return valorVariable.getValor()
    }
    getAST(anterior: string): string {
        let resultado="Incremento Decremento"
        return resultado
    }
}