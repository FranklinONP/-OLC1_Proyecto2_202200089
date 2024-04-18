export default class Errores {
    private tipoError: string
    private desc: string
    private fila: number
    private col: number

    constructor(tipo: string, desc: string, fila: number, col: number) {
        this.tipoError = tipo
        this.desc = desc
        this.fila = fila
        this.col = col
    }
    public getTipo(): string {
        return this.tipoError
    }
    public getDesc(): string {
        return this.desc
    }
    public getFila(): number {
        return this.fila
    }
    public getCol(): number {
        return this.col
    }
}