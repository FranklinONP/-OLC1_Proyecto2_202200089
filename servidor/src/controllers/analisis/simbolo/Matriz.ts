import Tipo from './Tipo'

export default class Matriz {
    private tipo: Tipo
    private id: string
    private valor: any[][]
    private pos1:number
    private pos2:number

    constructor(tipo: Tipo, id: string, valor: any[][],pos1:number,pos2:number) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
        this.pos1 = pos1
        this.pos2 = pos2
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

    public getValor(pos1: number,pos2:number) {
        //Creado vacio
        if(this.pos1!=0 && this.pos2!=0){
            return this.valor[pos1][pos2]
        }
        //Llenado al ser creado
        else if(this.pos1==0 && this.pos2==0){
            return this.valor[pos1][pos2].valor
        }

    }

    public setValor(pos1:number,pos2:number,valor:any) {
        console.log("Desde Matriz.ts")
        this.valor[pos1][pos2]=valor
    }
    
    public getTamano() {
        return this.valor.length
    }

}