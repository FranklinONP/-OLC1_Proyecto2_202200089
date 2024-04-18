import Tipo from './Tipo'
import Errores from "../excepciones/Errores";
export default class Arreglo {
    private tipo: Tipo
    private id: string
    private valor: any[]
    private tamano: number

    constructor(tipo: Tipo, id: string, valor: any[],tamano: number) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
        this.tamano = tamano
    }

    public getTipo(): Tipo {
        return this.tipo
    }

    public setTipo(tipo: Tipo) {
        this.tipo = tipo
    }

    public getId() {
        return this.id
    }

    public setId(id: string) {
        this.id = id
    }

    public getValor(posicion: number) {
        //Capturo el error si esta fuera del rango
        let longitud = this.valor.length
        //Creado Vacio
        if(posicion>=0 && posicion<=longitud){
             if(this.tamano!=0){
            return this.valor[posicion]
        }
        //Llenado al ser creado
        else if(this.tamano==0){
            return this.valor[posicion].valor
        }
        }else{
            console.log("Indice fuera de rango")
            console.log("ID: "+this.id)
            console.log("Posicion: "+posicion)
            console.log("Tamano: "+this.valor.length)
            console.log("==========================================================================================")
            return new Errores("SEMANTICO","Indice fuera de rango",0,0)

        }
       
    }

    public setValor(pos:number,valor: any) {
        //this.valor[pos].valor = valor
        let longitud = this.valor.length
        if(this.tamano!=0 && pos>=0 && pos<=longitud){
            this.valor[pos] = valor
            console.log("Entro al sin .valor")
        }
        else if(this.tamano==0){
             this.valor[pos].valor=valor
            console.log("Entro al .valor")
        }else{
            console.log("Indice fuera de rango")
            console.log("ID: "+this.id)
            console.log("Posicion: "+pos)
            console.log("Tamano: "+this.valor.length)
            console.log("==========================================================================================")
            return new Errores("SEMANTICO","Indice fuera de rango",0,0)
        }
    }
    
    public getTamano() {
        return this.valor.length
    }

}