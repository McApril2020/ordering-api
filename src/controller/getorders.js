import db from '../model/getorders.js';


const getorders = async (req, res) => {
    try {
        const user_id = req.params.id;
        const response = await db.get_my_orders(user_id);
        
        if(response.length > 0) {
            res.status(200).json(response);
        }
    } catch (error) {
        console.log('failed to get orders from db')
    }
}

export default getorders;