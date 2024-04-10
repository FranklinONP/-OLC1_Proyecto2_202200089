import Tipo from './Tipo'

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
        console.log("======== clase arreglo.ts ===========")
        console.log(this.valor[posicion].valor)
        console.log('Valor de la posicion: '+posicion)
        console.log("======== clase arreglo.ts ===========")
        return this.valor[posicion].valor
    }

    public setValor(valor: any[]) {
        this.valor = valor
    }
    
    public getTamano() {
        return this.valor.length
    }

}