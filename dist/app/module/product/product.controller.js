"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
// import productValidateSchema from "./product.validate";
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        console.log("product from frontend", product);
        // const { value} = productValidateSchema.validate(product);
        const result = yield product_service_1.productService.createProductIntoDB(product);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'product is not created successfully',
            error: error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        console.log("searchTerm=example from con ", searchTerm);
        if (typeof searchTerm !== 'string' && typeof searchTerm !== 'undefined') {
            return res.status(400).json({
                success: false,
                message: "Invalid search term provided!",
            });
        }
        const result = yield product_service_1.productService.retrieveAllProductFromDB(searchTerm);
        // Modify the result data to move the inventory object to the end of each product entry
        if (result.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No result found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
        });
    }
});
const retrieveProductCategoryCricket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (typeof searchTerm !== 'string' && typeof searchTerm !== 'undefined') {
            return res.status(400).json({
                success: false,
                message: "Invalid search term provided!",
            });
        }
        const result = yield product_service_1.productService.retrieveProductCategoryCricketFromDB(searchTerm);
        // Modify the result data to move the inventory object to the end of each product entry
        if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
            return res.status(500).json({
                success: false,
                message: "No result found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
        });
    }
});
const retrieveOneSpecificProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.retrieveOneSpecificProductByIDFromDB(productId);
        if (!result) {
            throw new Error('product not found');
        }
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
        });
    }
});
const UpdateProductInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        console.log('from update con', productId, updateData);
        const result = yield product_service_1.productService.UpdateProductInformationIntoDB(productId, updateData);
        //  data format
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        console.log("product id from con", productId);
        yield product_service_1.productService.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
        });
    }
});
const filterProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brand, category, minPrice, maxPrice } = req.body;
    console.log(req.body);
    // Create the filter object
    let filter = {};
    if (brand) {
        filter.brand = brand;
    }
    if (category) {
        filter.category = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    else if (minPrice !== undefined) {
        filter.price = { $gte: minPrice };
    }
    else if (maxPrice !== undefined) {
        filter.price = { $lte: maxPrice };
    }
    const result = yield product_service_1.productService.filterProductsFromDB(filter);
    if (!result) {
        throw new Error("Product Not Found");
    }
    res.status(200).json({
        success: true,
        message: "Product filtered successfully!",
        data: result,
    });
});
exports.productController = {
    createProduct,
    getAllProduct,
    retrieveOneSpecificProductByID,
    UpdateProductInformation,
    deleteProduct,
    retrieveProductCategoryCricket,
    filterProduct
};
