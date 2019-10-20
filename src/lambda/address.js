const request = require('request');

exports.handler = async function (event, context, callback) {
    console.log(context)
    return {
        statusCode: 200,
        body: JSON.stringify({
            event,
            context,
            message: `Hello world ${Math.floor(Math.random() * 10)}`
        })
    };
};
