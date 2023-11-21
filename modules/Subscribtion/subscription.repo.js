let Subscription = require('./subscription.model');

exports.createSubscription = async (form) => {
    try {
        let subscription = new Subscription(form);
        await subscription.save();
        return {
            success: true,
            code: 201,
            message: "Subscription created successfully"

        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}

exports.getSubscription = async (userId) => {
    try {
        let subscription = await Subscription.findOne({ userId });
        if (!subscription) return {
            success: false,
            code: 404,
            message: "Subscription not found"
        }
        return {
            success: true,
            code: 200,
            data: subscription
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}

exports.listSubscriptions = async (filter) => {
    try {
        let subscriptions = await Subscription.find(filter);
        return {
            success: true,
            code: 200,
            data: subscriptions
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}

exports.approveSubscription = async (_id) => {
    try {
        let subscription = await Subscription.findOne({ _id });
        if (!subscription) return {
            success: false,
            code: 404,
            message: "Subscription not found"
        }
        await Subscription.findByIdAndUpdate(_id, { status: "approved" }, { new: true });
        return {
            success: true,
            code: 200,
            message: "Subscription approved successfully"
        }
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }
}