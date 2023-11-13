let inbox = require('../../modules/Inbox/inbox.repo');

exports.add = async (req, res) => {
    try {
        let result = await inbox.addNote(req.query.catalogId, req.body);
        return res.status(result.code).json(result);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}