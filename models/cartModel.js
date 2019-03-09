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
    async DecreaseItem(productId){
        const cart = await this.getData();        
        const Item = cart.products.find(item => item.id === productId);
        if(Item.qt > 1) {
            cart.products = cart.products.map(item => {
                if((item.id === productId)){
                    item.qt = item.qt - 1;
                    cart.subTotal = cart.subTotal - +item.price;
                    return item;
                }else{
                    return item;
                }
            })
        }
        return await writeFile(this.dataFile, JSON.stringify(cart))
    }
    async IncreaseItem(productId){
        const cart = await this.getData();        
        const Item = cart.products.find(item => item.id === productId);
        if(Item.qt >= 1) {
            cart.products = cart.products.map(item => {
                if((item.id === productId)){
                    item.qt = item.qt + 1;
                    cart.subTotal = cart.subTotal + +item.price;
                    return item;
                }else{
                    return item;
                }
            })
        }
        return await writeFile(this.dataFile, JSON.stringify(cart))
    }
    
    async DeleteItem(productId){
        const cart = await this.getData();        
        
        cart.products.forEach(item => {
            if(item.id === productId){
                cart.subTotal = cart.subTotal - (item.price * item.qt);
            }
        })
        cart.products = cart.products.filter(item => item.id !== productId);         
        
        return await writeFile(this.dataFile, JSON.stringify(cart))
    }
    async updateItem(product){
        const cart = await this.getData();
        cart.products = cart.products.map(item=> {
            if(item.id === product.id){
                cart.subTotal = cart.subTotal - (item.qt * item.price) + (item.qt * product.price);
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
        await writeFile(this.dataFile, JSON.stringify(cart));
    }
}

module.exports = Cart;