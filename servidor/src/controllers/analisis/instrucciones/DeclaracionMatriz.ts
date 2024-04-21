import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";    
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Matriz from '../simbolo/Matriz'
import Nativo from '../expresiones/Nativo'

export default class DeclaracionMatriz extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string;
    private valor: Instruccion[][]
    private pos1: Instruccion
    private pos2: Instruccion
    private bandera:boolean


    constructor(tipo: Tipo, linea: number, col: number, id: string , valor: Instruccion[][],pos1:Instruccion, pos2:Instruccion,bandera:boolean) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.pos1 = pos1
        this.pos2 = pos2
        this.bandera=bandera
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null) {
            let p1=parseInt(this.pos1.interpretar(arbol,tabla))
            let p2=parseInt(this.pos2.interpretar(arbol,tabla))
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    ///pasa algo
                    //let arregloVacio: number[][] = new Array<Array<number>>(this.tamano);
                    //let arregloVacio: number[][] = Array.from(Array(this.pos1,this.pos2));
                  //let lista2dvacia: number[][] = Array.from(Array(this.row), () => Array(this.column));

                    console.log("Tamano mandando a setear ")
                    console.log("P1: "+p1+" P2: "+p2)
                    let arregloVacio: Nativo[][] = new Array<Array<Nativo>>(p1+1);
                    for (let i = 0; i < arregloVacio.length; i++) {
                        arregloVacio[i] = new Array<Nativo>(p2+1);
                        for (let j = 0; j < arregloVacio[i].length; j++) {
                            arregloVacio[i][j] = new Nativo(this.tipoDato, "0", 0, 0);
                        }
                    }


                    console.log("Dec de Matriz solo con logitud " + this.pos1 + "," + this.pos2)
                    console.log(arregloVacio)
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador, arregloVacio, p1,p2,true))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
             }
        } else {
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:


                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador,this.valor,0,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                                        
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });
                case tipoDato.CADENA:
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador,this.valor,0,0,false))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });

        }

    }
}

getAST(anterior: string): string {
    let resultado="DecMatriz"
    return resultado
}}