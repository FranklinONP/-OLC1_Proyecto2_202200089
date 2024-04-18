import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Logicos from "../expresiones/ExpLogicas";
import Relacionales from "../expresiones/Relacionales";


export default class Ternario extends Instruccion {
    private condicion: Instruccion            //condicion del op ternario
    private expresionTrue: Instruccion        //exprecion que se ejecutara si la condicion es verdadera
    private expresionFalse: Instruccion       //exprecion que se ejecutara si la condicion es falsa

    constructor(cond: Instruccion, expT: Instruccion, expF: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.expresionTrue = expT
        this.expresionFalse = expF
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //interpretamos condicion
        let condt = this.condicion.interpretar(arbol, tabla)
        //si condicion es un error retornamos 
        if (condt instanceof Errores) return condt

        //validamos si condicion pertenece a una declaracion Relacional
        if (this.condicion instanceof Relacionales) {
            //si la condicion es relacional y verdadera
            if (condt == true) {
                //obtenemos el tipo de la respuesta que se va a obtener .ENTERO o .BOOL .... 
                let obtTipo = this.expresionTrue.tipoDato.getTipo()
                //interpretamos la expresion que se va a devolver como respuesta ternario
                let expTt = this.expresionTrue.interpretar(arbol, tabla)
                //con este switch evaluaremos el tipo de valor de la respuesta para cambiar el .tipo general del ternario que se va a retornar que inicialmente era .VOID segun nuestro constructor
                //si no se altera el tipo general segun la respuesta no se declarara la variable ya que en clase Declaracion se evaluan los tipos y no puede coincidir con un .VOID
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        //si el tipo de respuesta es ENTERO cambiamos el .tipo del ternario de VOID a ENTERO
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        //console.log(this.expresionTrue.tipoDato.getTipo())
                        //console.log(expTt)
                        if (expTt instanceof Errores) return expTt  //verificamos que no sea error
                        //retornamos valor de respuesta 
                        return expTt 
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (expTt instanceof Errores) return expTt
                        console.log(expTt)
                        return expTt
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    default:
                        return new Errores("Semantico", "Ternario V Declaracion R tipo de respuesta no coincide con los tipos", this.linea, this.col)
                }
            //si la condicion del ternario no es verdadera
            } else {
                let expFt = this.expresionFalse.interpretar(arbol, tabla)
                let obtTipo = this.expresionFalse.tipoDato.getTipo()
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    default:
                        return new Errores("Semantico", "Ternario F Declaracion R tipo de respuesta no coincide con los tipos", this.linea, this.col)
                }
            }
        //validamos si condicion pertenece a una declaracion Logia
        } else if (this.condicion instanceof Logicos) {
            //si es logica y verdadera
            if (condt == true) {
                let obtTipo = this.expresionTrue.tipoDato.getTipo()
                let expTt = this.expresionTrue.interpretar(arbol, tabla)
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (expTt instanceof Errores) return expTt
                        return expTt
                    default:
                        return new Errores("Semantico", "Ternario V Declaracion L tipo de respuesta no coincide con los tipos", this.linea, this.col)
                }
            //si es logica y falsa
            } else {
                let expFt = this.expresionFalse.interpretar(arbol, tabla)
                let obtTipo = this.expresionFalse.tipoDato.getTipo()
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (expFt instanceof Errores) return expFt
                        return expFt
                    default:
                        return new Errores("Semantico", "Ternario F Declaracion L tipo de respuesta no coincide con los tipos", this.linea, this.col)
                }
            }
        //si no es ni Relacional ni Logica retornamos error
        } else {
            return new Errores("Semantico", "Error la condicion no coincide con un operador ternario", this.linea, this.col)
        }
    }
}