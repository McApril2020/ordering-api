import db from '../model/products.js';

const products = async (req, res) => {
    try {
        const data = req.body
        const response = await db.get_products(data);
        res.json(response);
    } catch (error) {
        console.log(error)
    }
}

export default products;