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

exports.listNotes = async (_id) => {
    try {
        let inbox = await Inbox.findOne({ _id });
        if (!inbox) return {
            success: false,
            code: 404,
            message: "Inbox not found"
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

// user send message to admin
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