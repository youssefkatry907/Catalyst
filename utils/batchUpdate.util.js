let schedule = require("node-schedule");
let batchUpdate = require("../modules/batchUpdate/batchUpdate.repo")
let user = require("../modules/User/user.repo")
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = 5;
rule.minute = 0;
rule.second = 0;


const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
}

exports.executeJobs = async () => {
    try {
        schedule.scheduleJob(rule, async () => {
            console.log("job started at ", dateFormat());
            let result = await batchUpdate.list()
            if (result.success) {
                let arrayOfKeys = result.records[0].arrayOfKeys;
                if (arrayOfKeys.length > 0) {
                    for (let i = 0; i < arrayOfKeys.length; i++) {
                        await user.deleteMany(arrayOfKeys[i])
                    }
                    await batchUpdate.remove()
                    console.log("job ended at ", dateFormat());
                }
            }
            else {
                console.log(`result.message`, result.message);
            }
        });
    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            message: err.message
        };
    }
}
