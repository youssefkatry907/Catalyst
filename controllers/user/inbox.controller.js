let inbox = require('../../modules/Inbox/inbox.repo');

exports.get = async (req, res) => {
    try {
        let result = await inbox.listNotes(req.query.userId);
        return res.status(result.code).json({
            success: result.success,
            code: result.code,
            messages: result.notes,
            message: result.message
        });

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            message: err.message
        });
    }
}

exports.contactUs = async (req, res) => {
    try {
        let result = await inbox.sendMessageToAdmin(req.body);
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