const logout = (req,res) => {
    const token = Object.keys(req.cookies);

    if(token.length > 0) {
        token.forEach(e => {
            res.cookie(e, '', {maxAge : 1});

            res.status(200).json({
                result: true
            })
        })
    }
}

export default logout;