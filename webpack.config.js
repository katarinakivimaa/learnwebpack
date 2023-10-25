import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import glob from ''
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fetch('').then(response => JSON.parse(response));


let views = fs.readdirSync('./src/views', {withFileTypes: true});

views = views.filter(view => view.isFile());
console.log(views);
let htmlPlugins = [];
for(let view of views){
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: path.parse(view.name).name + 'html',
        template: './src/views/' + view.name,
        templateParameters: {
            fullname: 'Katarina Kivimaa',
            items: ['keefir', 'vorst', 'hommikuhelbed', 'banaan']
        }
    }));
}


export default {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        static: {
            directory:path.resolve(__dirname, 'public')
        },
        port:9000,
        compress:true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin,'css-loader']
            },            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader','css-loader']
            },            {
                test: /\.nunjucks$/i,
                use: ['simple-nunjucks-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/views/contact.html'
        }),
        new [MiniCssExtractPlugin](),
    ],
}