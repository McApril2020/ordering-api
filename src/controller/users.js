import db from '../model/users.js';

const users = async (req, res) => {
    try {
        const response = await db.get_users();
        res.json(response);
    } catch (error) {
        console.log(error)
    }
}

export default users;