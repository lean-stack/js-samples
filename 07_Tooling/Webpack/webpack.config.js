module.exports = {

    module: {
             rules: [
               {
                 test: /\.scss$/,
                 use: [
                   'style-loader',
                   'css-loader',
                   'sass-loader'
                 ]
               },
               {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
              }
             ]
           }

};