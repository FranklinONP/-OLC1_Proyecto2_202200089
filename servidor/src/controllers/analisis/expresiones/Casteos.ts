import TipoCasteo, {tipoDatoCasteo} from "../simbolo/TiposCasteos";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Nativo from '../expresiones/Nativo'

export default class Casteos extends Instruccion{
    private tipoCasteo: TipoCasteo
    private valor: Instruccion


    constructor(expCastear: TipoCasteo,valor:Instruccion,fila: number, col: number) {
        super(new Tipo(tipoDato.CADENA),fila,col)
        this.tipoCasteo= expCastear
        this.valor = valor
    
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.valor.interpretar(arbol,tabla)
        console.log("Casteos====================>")
        switch (this.tipoCasteo.getTipo()) {
            case tipoDatoCasteo.TOLOWER:
                return this.valor.interpretar(arbol,tabla).toString().toLowerCase()
            case tipoDatoCasteo.TOUPPER:
                return this.valor.interpretar(arbol,tabla).toString().toUpperCase()
            case tipoDatoCasteo.ROUND:
                return this.valor.interpretar(arbol,tabla).mathround()
            case tipoDatoCasteo.LENGTH:
                console.log("Entro al .length")
                try {
                    return this.valor.interpretar(arbol,tabla).length
                } catch (error) {
                    //Errores.getInstance().push(new Errores("Semantico", error, this.fila, this.columna))
                    console.log("--------------------->")
                    console.log(this.valor)
                    console.log("--------------------->")
                    console.log("--------------------->")
                }
                
            case tipoDatoCasteo.TYPEOF:
                switch(this.valor.tipoDato.getTipo()){
                    case 0:
                        return "ENTERO"
                    case 1:
                        return "DECIMAL"
                    case 2:
                        return "BOOL"
                    case 3:
                        return "CARACTER"
                    case 4:
                        return "CADENA"
                    case 5:
                        return "VOID"
                }
            case tipoDatoCasteo.TOSTRING:
                console.log("Funcion toString()")
                return this.valor.interpretar(arbol,tabla).toString()
            case tipoDatoCasteo.CSTR:
                if(this.valor.tipoDato.getTipo() == 4){
                    console.log("Funcion CSTR()")
                    console.log("+++++++++++++++++++++++++++++")
                    console.log(this.valor.interpretar(arbol,tabla).split(''))
                    console.log("+++++++++++++++++++++++++++++")
                    //NewValor=new Nativo(this.tipoDato,NewValor,0,0)

                    let NewValor = this.valor.interpretar(arbol,tabla).split('')

                    const NewValor_nativo: Nativo[] = [];
                    for (const elemento of NewValor) {
                        const nativo: Nativo = new Nativo(this.tipoDato, elemento, 0, 0);
                        NewValor_nativo.push(nativo);
                    }
                    return NewValor_nativo
                }
            
        }      
}
getAST(anterior: string): string {
    let resultado="Casteos"
    return resultado
}

}
