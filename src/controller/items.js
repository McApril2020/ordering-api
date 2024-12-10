import db from '../model/items.js';

const items = async (req, res) => {
    try {
        const response = await db.get_epp_items();
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

export default items;