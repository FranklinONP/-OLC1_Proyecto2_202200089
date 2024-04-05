import Tipo from './Tipo'

export default class Simbolo {
    private tipo: Tipo
    private id: string
    private valor: any

    constructor(tipo: Tipo, id: string, valor?: any) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
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
        return this.valor
    }

    public setValor(valor: any) {
        this.valor = valor
    }

}