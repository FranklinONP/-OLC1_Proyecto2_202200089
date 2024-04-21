import { Router } from "express";
import { indexController } from "../controllers/indexController";


class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }


    config(): void {
        this.router.get('/', indexController.prueba);
        this.router.post('/interpretar', indexController.interpretar)
        this.router.get('/errores', indexController.getErrores)
        //Probar si manda todos los errroes o solo el ultimo
        //sino importo la lista de errrores y le hago directamente push
        this.router.post('/generar_reporte_tablas', indexController.generar_reporte_tablas)
        this.router.get('/ast', indexController.ast)
        
    }
}


const indexRouter=new router();
export default indexRouter.router;