import { Request, Response } from "express";
// import productValidateSchema from "./product.validate";
import { productService } from "./product.service";
import { Filter } from "./product.interface";


const createProduct = async (req:Request, res : Response) =>{
    try {
        const product = req.body; 
        console.log("product from frontend",product)
        // const { value} = productValidateSchema.validate(product);
        const result = await productService.createProductIntoDB(product);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'product is not created successfully',
            error: error,
          });
    }
}

const getAllProduct = async (req:Request, res : Response) => {
    try {
        const {searchTerm} = req.query;
        console.log("searchTerm=example from con ",searchTerm)
        
        if (typeof searchTerm !== 'string' && typeof searchTerm !== 'undefined') {
            return res.status(400).json({
                success: false,
                message: "Invalid search term provided!",
            });
        }
        const result = await productService.retrieveAllProductFromDB(searchTerm);
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
          });
    }
}
const retrieveProductCategoryCricket = async (req:Request, res : Response) => {
    try {
        const {searchTerm} = req.query;
        
        if (typeof searchTerm !== 'string' && typeof searchTerm !== 'undefined') {
            return res.status(400).json({
                success: false,
                message: "Invalid search term provided!",
            });
        }
        const result = await productService.retrieveProductCategoryCricketFromDB(searchTerm);
        // Modify the result data to move the inventory object to the end of each product entry
        if (result?.length === 0) {
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
          });
    }
}

const retrieveOneSpecificProductByID = async (req:Request, res : Response) =>{
    try {
        const {productId} = req.params;
        const result = await productService.retrieveOneSpecificProductByIDFromDB(productId)

        if (!result) {
            throw new Error('product not found')
        }


        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
          });
    }
}

const UpdateProductInformation = async (req:Request, res : Response) => {
    try {
        const {productId} = req.params;
        const updateData = req.body;
        console.log('from update con' ,productId, updateData)
        const result = await productService.UpdateProductInformationIntoDB(productId , updateData)
        //  data format

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
              });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
          });
    }
}

const deleteProduct = async (req : Request, res : Response) => {
    try {
        const {productId} = req.params;
        console.log("product id from con",productId)
         await productService.deleteProductFromDB(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
          });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
          });
    }
}

  
const filterProduct = async (req : Request, res : Response) => {
    const { brand, category, minPrice, maxPrice } = req.body;
    console.log(req.body)
  
    // Create the filter object
    let filter : Filter = {};
  
    if (brand) {
      filter.brand = brand;
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: maxPrice };
    }
  
    const result = await productService.filterProductsFromDB(filter)

    if (!result) {
        throw new Error("Product Not Found")
    }
    res.status(200).json({
        success: true,
        message: "Product filtered successfully!",
        data: result,
      });

  }



export const productController = {
    createProduct,
    getAllProduct,
    retrieveOneSpecificProductByID,
    UpdateProductInformation,
    deleteProduct,
    retrieveProductCategoryCricket,
    filterProduct
    
}