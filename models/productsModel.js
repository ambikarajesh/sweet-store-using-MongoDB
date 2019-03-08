const fs = require('fs');
const util = require('util');
const uniqid = require('uniqid');
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
        product.id = uniqid();
        const products = await this.fetchProducts();
        products.push(product);
        await writeFile(this.dataFile, JSON.stringify(products));
    }
    async fetchProduct(productId){
        const products = await this.fetchProducts();
        return products.find(product => product.id === productId);
    }
}

module.exports = Products;