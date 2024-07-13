import  express  from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validate";

const router = express.Router();

router.post(
    '/product',
     productController.createProduct
    );
router.post(
    '/filter', 
    productController.filterProduct
    )    
router.get(
    '/products',
    productController.getAllProduct
)
router.get(
    '/product/:productId', 
    productController.retrieveOneSpecificProductByID
)
router.put(
    '/product/:productId', 
    productController.UpdateProductInformation
)
router.delete(
    '/product/:productId', 
    productController.deleteProduct
)
router.get(
    '/product', 
    productController.retrieveProductCategoryCricket
)


export const productRoutes = router;