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
        console.log("======== clase arreglo.ts ===========")
        console.log(this.valor[pos1][pos2].valor)
        console.log('Valor de la posicion: '+pos1+','+pos2)
        console.log("======== clase arreglo.ts ===========")
        return this.valor[pos1][pos2].valor
    }

    public setValor(valor: any[][]) {
        this.valor = valor
    }
    
    public getTamano() {
        return this.valor.length
    }

}