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
    ENTERO,  //0
    DECIMAL, //1
    BOOL,    //2   
    CARACTER,//3
    CADENA,  //4
    VOID     //5
}