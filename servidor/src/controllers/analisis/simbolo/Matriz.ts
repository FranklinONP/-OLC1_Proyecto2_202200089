import Tipo from './Tipo'

export default class Matriz {
    private tipo: Tipo
    private id: string
    private valor: any[][]
    private pos1:number
    private pos2:number
    private bandera: boolean

    constructor(tipo: Tipo, id: string, valor: any[][],pos1:number,pos2:number,bandera:boolean) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
        this.pos1 = pos1
        this.pos2 = pos2
        this.bandera = bandera
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
        return this.valor.map(fila => fila.map(nativo => nativo.valor));
    }
    public getValor1(pos1: number,pos2:number) {
        console.log("Entro aqui")
                return this.valor[pos1][pos2].valor

        

    }

    public setValor(pos1:number,pos2:number,valor:any) {
        console.log("Desde Matriz.ts")


        try {
            // Código que puede generar una excepción
            
             this.valor[pos1][pos2]=valor
        } catch (error) {
            // Manejo de la excepción
            console.log("111")
            console.log(this.valor) 
            console.log(valor)   
            this.valor[pos1][pos1]=valor
            //let n: number = parseFloat(pos1.toString());
            console.log("222")
        }
    }
    
    public getTamano() {
        return this.valor.length
    }

}