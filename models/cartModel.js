const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Cart{
    constructor(dataFile){
        this.dataFile = dataFile;
    }
    async getData(){
        const data = await readFile(this.dataFile, 'utf-8');
        if(!data){
            return {products:[], subTotal:0};
        }
        return JSON.parse(data);
    }
    async fetchCartItems(){
       return await this.getData();
    }

    async addItem(product){
        const cart = await this.getData();
        const alreadyExist = cart.products.find(item => item.id === product.id); 
        if(!alreadyExist){
            cart.products.unshift({...product, qt:1});
             cart.subTotal = cart.subTotal + +product.price;

        }else{
            cart.products.forEach(item => {
                if(item.id === alreadyExist.id){
                    item.qt += 1;
                    cart.subTotal = cart.subTotal + +item.price;
                }
            })
        }
        return await writeFile(this.dataFile, JSON.stringify(cart))
    }
    
    async DeleteItem(){

    }
}

module.exports = Cart;