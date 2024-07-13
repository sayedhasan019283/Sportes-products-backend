import mongoose from "mongoose";
import { Filter, TProduct } from "./product.interface";
import { ProductModel } from "./product.model";


const createProductIntoDB = async (product : TProduct)=>{
    const Result = await ProductModel.create(product);
    if (!Result) {
        throw new Error('Product not Created successfully');
    }
    return Result;
}

const retrieveAllProductFromDB =async (searchTerm : string | undefined) =>{
    let products;

    if (searchTerm) {
      // Search for products matching the searchTerm
      products = await ProductModel.find({ name: new RegExp(searchTerm, 'i') }); 
      // Case-insensitive search
    } else {
      // Return all products
      products = await ProductModel.find({});
    }
    return products;
}
const retrieveProductCategoryCricketFromDB =async (searchTerm : string | undefined) =>{
    let products;

    if (searchTerm) {
      // Search for products matching the searchTerm
      products = await ProductModel.find({ category: new RegExp(searchTerm, 'i') }); 
      // Case-insensitive search
    } 
    return products;
}

const retrieveOneSpecificProductByIDFromDB = async (id : string) =>{
    const result = await ProductModel.findById(id);
    if (!result) {
        throw new Error('Product not found');
    }
    console.log(result)
    return result
}



const UpdateProductInformationIntoDB = async (productId : string, updateData : Partial<TProduct> ) => {
    const result = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    if (!result) {
        throw new Error('Product not update');
    }
    // console.log(result)
    return result;
}

const deleteProductFromDB = async (productId: string) => {
    console.log("product id from ser",productId)
    try {
        const result = await ProductModel.findByIdAndDelete(productId);
        if (!result) {
            throw new Error('Product not found');
        }
        return result;
    } catch (error) {
        throw new Error(`Error deleting product: ${error}`);
    }
};

const filterProductsFromDB = async (filter : Filter) => {
    try {
        const products = await ProductModel.find(filter);
        if (!products) {
            throw new Error("Product Not found")
        }
        return products
      } catch (err) {
        throw new Error("product not found")
      }
}

export const productService = {
    createProductIntoDB,
    retrieveAllProductFromDB,
    retrieveOneSpecificProductByIDFromDB,
    UpdateProductInformationIntoDB,
    deleteProductFromDB,
    retrieveProductCategoryCricketFromDB,
    filterProductsFromDB
}