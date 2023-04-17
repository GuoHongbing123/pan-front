module.exports = { 
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    productionSourceMap: false,
    devServer: {
        proxy: {
            "/proxyApi": {
                target: "http://127.0.0.1:8080/api/pan/",
                // target: "http://10.90.12.36:8080/api/pan/",
                //  target: "http://101.34.26.36:8080/api/pan/",
                //  target:"http://10.90.101.106:8080/api/pan/",
                changeOrigin: true,
                pathRewrite: {
                    "^/proxyApi": "/",
                },
            }
        },
    },
  };
  