export default class TiposCasteos {
    private tipoCasteo: tipoDatoCasteo

    constructor(tipo: tipoDatoCasteo) {
        this.tipoCasteo = tipo
    }

    public setTipo(tipo: tipoDatoCasteo) {
        this.tipoCasteo = tipo
    }

    public getTipo() {
        return this.tipoCasteo
    }

}

export enum tipoDatoCasteo {
    TOLOWER,
    TOUPPER,
    ROUND,
    LENGTH,
    TYPEOF,
    TOSTRING,
    CSTR,
}