const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack');
const isDev=process.env.NODE_ENV === 'development'//开发环境
const ExtractPlugin=require('extract-text-webpack-plugin')//单独打包scss/css文件
const config={
	target:'web',
	entry:path.join(__dirname,'src/index.js'),//拼接绝对路径
	output:{
		filename:'bundle.[hash:8].js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
		    {
		  	    test:/\.vue$/,
		  	    loader:'vue-loader'
		    },
		    {
		    	test:/\.jsx$/,
		    	loader:"babel-loader"
		    },
		    {
		        test:/\.css$/,
		        use:[
		           "style-loader",
		           "css-loader"
		        ]
		    },
		    //处理图片文件
		    {
			    test:/\.(png|jpg|jpeg|gif|svg)$/i,
				loader:'url-loader',
				options:{
				   limit:1024,
				   name:'images/[name]-[hash:5].[ext]'
				}
		    },
		]
	},
	plugins:[
	    //允许创建一个在编译时可以配置的全局常量
	    new webpack.DefinePlugin({
	    	"process.env":{
	    		NODE_ENV:isDev?'"development"':'"production"'
	    	}
	    }),
	    new HTMLPlugin({
	    	filename:'index.html',//文件名
	        template:'index.html',//以文件原有的模板为基础
			inject:'body',//inject :true | ‘head’ | ‘body’ | false  注入的位置
	    })
	]
}

if(isDev){                                                 //开发环境
	config.module.rules.push({
	    test:/\.scss$/,
	    use:[
		  'style-loader',
		  'css-loader',
		  {
		  	loader:'postcss-loader',
		  	options:{
		  		sourceMap:true,
		  	}
		  },
		  'sass-loader'
		]
	});
	config.devtool='#cheap-module-eval-source-map';
	config.devServer={
		port:8000,
		host:'0.0.0.0',
		overlay:{
			errors:true,
		},
		hot:true                                            //模块热替换
	};
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),           //模块热替换
		new webpack.NoEmitOnErrorsPlugin()
	);
}else{                                                      //正式环境
	config.entry={                                          //明确第三方库
		app:path.join(__dirname,'src/index.js'),
		vendor:['vue']
	}
	config.output.filename='[name].[chunkhash:8].js'        //开发环境不能用chunkhash
	config.module.rules.push(                               //scss文件单独打包
	   {
	    test:/\.scss$/,
	    use:ExtractPlugin.extract({
	    	fallback:'style-loader',                        //style-loader 只是把打包好的css文件外面加一层包裹，正式环境css-loader就够了
		    use:[
			  'css-loader',
			  {
			  	loader:'postcss-loader',
			  	options:{
			  		sourceMap:true,
			  	}
			  },
			  'sass-loader'
			]
	    })
	   }
	)
	config.plugins.push( 
		new ExtractPlugin('styles.[contentHash:8].css'),  //单独打包的文件 scss
		new webpack.optimize.CommonsChunkPlugin({         //单独打包类库文件  （vue）
			name:'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({         //把生成在app.js里面的webpack代码单独打包成一个文件
			name:'runtime'
		})
	)
}

module.exports=config;









