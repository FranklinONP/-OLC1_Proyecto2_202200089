import Tipo from './Tipo'
import Errores from "../excepciones/Errores";
export default class Arreglo {
    private tipo: Tipo
    private id: string
    private valor: any[]
    private tamano: number
    private bandera: boolean

    constructor(tipo: Tipo, id: string, valor: any[],tamano: number,bandera: boolean) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
        this.tamano = tamano
        this.bandera = bandera
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
    public getValor() {
        return this.valor.map(nativo => nativo.valor)
    }

    public getValor1(posicion: number) {
        //Capturo el error si esta fuera del rango
        let longitud = this.valor.length
        console.log("===============================================")
        console.log("==================GET VALOR1===================")
        console.log("Posicion: "+posicion)
        console.log(this.valor[posicion].valor)
        console.log("===============================================")
        return this.valor[posicion].valor
        /*
             if(this.bandera){
            return this.valor[posicion].valor
        }
        if(posicion>=0 && posicion<=longitud){
             if(this.tamano!=0){
            return this.valor[posicion].valor
        }
        else if(this.tamano==0){
            return this.valor[posicion].valor
        }
        }else{
            return new Errores("SEMANTICO","Indice fuera de rango",0,0)

        }
        */
   
       
    }

    public setValor(pos:number,valor: any) {
        let longitud = this.valor.length
        if(this.bandera){
            console.log("Set con Bandera==============================================================================================")
            console.log("Posicion: "+pos)
            this.valor[pos] = valor
            console.log(this.valor[pos])
            return
        }
        if(this.tamano!=0 && pos>=0 && pos<=longitud){
            this.valor[pos] = valor
        }
        else if(this.tamano==0){
            console.log("====")
             this.valor[pos]=valor
             console.log(this.valor)
             console.log("====")
        }else{
            return new Errores("SEMANTICO","Indice fuera de rango",0,0)
        }
    }
    
    public getTamano() {
        return this.valor.length
    }

}