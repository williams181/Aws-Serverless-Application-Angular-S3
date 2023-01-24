const PROXY_CONFIG =[
    {
        context:[
            '/api',
        ],
        target: "https://9pe3b80wee.execute-api.us-east-1.amazonaws.com/prod",
        secure: false,
        changeOrigin: true,
        pathRewrite: {"^/api":""}
    }

];

module.exports = PROXY_CONFIG;