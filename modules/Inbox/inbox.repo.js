let Inbox = require('./inbox.model');
let Catalog = require('../Catalog/catalog.model');

exports.addNote = async (catalogId, form) => {
    try {
        let existedInbox = await Inbox.findOne({ userId: form.userId });
        if (!existedInbox) {
            let inbox = new Inbox({
                userId: form.userId,
                listOfNotes: [form.note]
            });
            await inbox.save();

            await Catalog.findByIdAndUpdate({ _id: catalogId }, { note: form.note }, { new: true });
        }
        else {
            await Inbox.findByIdAndUpdate({ _id: existedInbox._id },
                {
                    $push: { listOfNotes: form.note }
                }, { new: true });

            await Catalog.findByIdAndUpdate({ _id: catalogId }, { note: form.note }, { new: true });
        }

        return {
            success: true,
            code: 201,
            message: "Note added successfully",
        };


    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.sendMessageToUser = async (form) => {
    try {
        if (!form.admin) {
            return {
                success: false,
                code: 400,
                message: "adminId is required"
            };
        }
        let existedInbox = await Inbox.findOne({ userId: form.userId });
        if (!existedInbox) {
            let inbox = new Inbox({
                userId: form.userId,
                admin: form.admin,
                listOfNotes: [form.message]
            });
            await inbox.save();
        }
        else {
            await Inbox.findByIdAndUpdate({ _id: existedInbox._id },
                {
                    $push: { listOfNotes: form.message }
                }, { new: true });
        }

        return {
            success: true,
            code: 201,
            message: "Message sent successfully",
        };


    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.listNotes = async (userId) => {
    try {
        let inbox = await Inbox.findOne({ userId });
        if (!inbox) return {
            success: true,
            code: 200,
            notes: [],
            message: "Notes retrieved successfully"
        }
        return {
            success: true,
            code: 200,
            notes: inbox.listOfNotes,
            message: "Notes retrieved successfully"
        }

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}


exports.sendMessageToAdmin = async (form) => {
    try {
        let existedInbox = await Inbox.findOne({ userId: form.userId });
        if (!existedInbox) {
            let inbox = new Inbox({
                userId: form.userId,
                listOfNotes: [form.message]
            });
            await inbox.save();
        }
        else {
            await Inbox.findByIdAndUpdate({ _id: existedInbox._id },
                {
                    $push: { listOfNotes: form.message }
                }, { new: true });
        }
        return {
            success: true,
            code: 201,
            message: "Message sent successfully",
        };
    }
    catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}

exports.getAllInboxes = async () => {
    try {
        let inboxes = await Inbox.find({}).populate("userId");

        return {
            success: true,
            code: 200,
            inboxes,
            message: "Inboxes retrieved successfully"
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}