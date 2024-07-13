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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield product_model_1.ProductModel.create(product);
    if (!Result) {
        throw new Error('Product not Created successfully');
    }
    return Result;
});
const retrieveAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    if (searchTerm) {
        // Search for products matching the searchTerm
        products = yield product_model_1.ProductModel.find({ name: new RegExp(searchTerm, 'i') });
        // Case-insensitive search
    }
    else {
        // Return all products
        products = yield product_model_1.ProductModel.find({});
    }
    return products;
});
const retrieveProductCategoryCricketFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    if (searchTerm) {
        // Search for products matching the searchTerm
        products = yield product_model_1.ProductModel.find({ category: new RegExp(searchTerm, 'i') });
        // Case-insensitive search
    }
    return products;
});
const retrieveOneSpecificProductByIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(id);
    if (!result) {
        throw new Error('Product not found');
    }
    console.log(result);
    return result;
});
const UpdateProductInformationIntoDB = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    if (!result) {
        throw new Error('Product not update');
    }
    // console.log(result)
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("product id from ser", productId);
    try {
        const result = yield product_model_1.ProductModel.findByIdAndDelete(productId);
        if (!result) {
            throw new Error('Product not found');
        }
        return result;
    }
    catch (error) {
        throw new Error(`Error deleting product: ${error}`);
    }
});
const filterProductsFromDB = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.ProductModel.find(filter);
        if (!products) {
            throw new Error("Product Not found");
        }
        return products;
    }
    catch (err) {
        throw new Error("product not found");
    }
});
exports.productService = {
    createProductIntoDB,
    retrieveAllProductFromDB,
    retrieveOneSpecificProductByIDFromDB,
    UpdateProductInformationIntoDB,
    deleteProductFromDB,
    retrieveProductCategoryCricketFromDB,
    filterProductsFromDB
};
