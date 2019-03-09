const fs = require('fs');
const util = require('util');
const uniqid = require('uniqid');
const configs = require("../config")
const CartModel = require('../models/cartModel');
const cartModel = new CartModel(configs.data.cart); 

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Products{
    constructor(dataFile){
        this.dataFile = dataFile;
    }
    async fetchProducts(){
        const products = await readFile(this.dataFile, 'utf-8');
        if(!products){
            return [];
        }
        else{
            return JSON.parse(products);
        }

    }
   
    async storeProduct(product){
        const products = await this.fetchProducts();
        if(product.id){
            const updatedProducts = products.map(item=> {
                if(item.id === product.id){
                    item.name = product.name;
                    item.image = product.image;
                    item.price = product.price;
                    item.ingredients = product.ingredients;  
                    return item;                  
                }
                else{
                    return item;
                }
            })
            await cartModel.updateItem(product);
            await writeFile(this.dataFile, JSON.stringify(updatedProducts));
        }else{
            product.id = uniqid();           
            products.push(product);
            await writeFile(this.dataFile, JSON.stringify(products));
        }
    }
    async fetchProduct(productId){
        const products = await this.fetchProducts();
        return products.find(product => product.id === productId);
    }
    async removeProduct(productId){
        const products = await this.fetchProducts();
        const updatedProducts = products.filter(product => product.id !== productId);
        await cartModel.DeleteItem(productId);
        await writeFile(this.dataFile, JSON.stringify(updatedProducts));
    }
    async findProduct (productId){
        const products = await this.fetchProducts();
        return products.find(product => product.id === productId);
    }
}

module.exports = Products;