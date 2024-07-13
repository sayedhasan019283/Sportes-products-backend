"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/product', product_controller_1.productController.createProduct);
router.post('/filter', product_controller_1.productController.filterProduct);
router.get('/products', product_controller_1.productController.getAllProduct);
router.get('/product/:productId', product_controller_1.productController.retrieveOneSpecificProductByID);
router.put('/product/:productId', product_controller_1.productController.UpdateProductInformation);
router.delete('/product/:productId', product_controller_1.productController.deleteProduct);
router.get('/product', product_controller_1.productController.retrieveProductCategoryCricket);
exports.productRoutes = router;
