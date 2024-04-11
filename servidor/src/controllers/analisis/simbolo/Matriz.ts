import Tipo from './Tipo'

export default class Matriz {
    private tipo: Tipo
    private id: string
    private valor: any[][]
    private tamano: number

    constructor(tipo: Tipo, id: string, valor: any[][],tamano: number) {
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

    public getValor(pos1: number,pos2:number) {
        return this.valor[pos1][pos2]
    }

    public setValor(pos1:number,pos2:number,valor:any) {
        this.valor[pos1][pos2].valor = valor
    }
    
    public getTamano() {
        return this.valor.length
    }

}