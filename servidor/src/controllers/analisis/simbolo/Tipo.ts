export default class Tipo {
    private tipo: tipoDato

    constructor(tipo: tipoDato) {
        this.tipo = tipo
    }

    public setTipo(tipo: tipoDato) {
        this.tipo = tipo
    }

    public getTipo() {
        return this.tipo
    }

}

export enum tipoDato {
    ENTERO,
    DECIMAL,
    BOOL,
    CARACTER,
    CADENA,
    VOID
}