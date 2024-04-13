import { Instruccion } from "../abstracto/Instruccion";

export default class CCase  {
    public condicion: Instruccion
    public instrucciones:Instruccion[]
    public instruccionesDefault: Instruccion[]

    constructor(cond: Instruccion, ins: Instruccion[],ins2:Instruccion[]) {
        this.condicion = cond;
        this.instrucciones = ins;
        this.instruccionesDefault=ins2;
    }
}