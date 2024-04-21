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
    public getNombreTipo(): string {
        switch (this.tipo) {
            case tipoDato.ENTERO:
                return "ENTERO"
            case tipoDato.DECIMAL:
                return "DECIMAL"
            case tipoDato.BOOL:
                return "BOOLEANO"
            case tipoDato.CARACTER:
                return "CARACTER"
            case tipoDato.CADENA:
                return "CADENA"
            case tipoDato.VOID:
                return "VOID"
            default:
                return "Tipo No Valido"
        }
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