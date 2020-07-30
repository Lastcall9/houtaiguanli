
  
module.exports = {
    devServer:{

    },
    css:{
        loaderOptions:{
            sass: {
                // 这里data换成 prependData  并且重启vue项目即可
                prependData: `@import "@/assets/scss/_variable.scss";`
              }
        }
    }
}
