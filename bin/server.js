/*
 * Copyright (C) 2025 KaedeharaLu
 * 依据 GNU 通用公共许可证 v3.0 授权
 * 请参阅 LICENSE 文件了解详细信息
 */
import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import logger from './logger.js'
// import logger from './logger-file.js'

// 三个路由
import { getSiteConfig } from '../routes/site-config.js'
import { getComments } from '../routes/comments.js'
import { postNewComment } from '../routes/new-comment.js'

logger.new() // 初始化日志

const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)
// 留言数据存储路径
const COMMENTS_FILE = path.join(__dirname, './../data/comments.json');
// 网站配置文件路径
const CONFIG_FILE = path.join(__dirname, './../config/site-config.json');

// 默认site-config
const defaultSiteConfig = {
    name: 'HOMEPAGE',
    title: '个人主页',
    description: '个人引导页面,您可以从这里访问到我的所有公开服务',
    keywords: '个人主页,个人引导页',
    socialLinks: [
        {
            name: 'Blog',
            url: '#',
            icon: 'fas fa-book'
        },
        {
            name: 'Github',
            url: '#',
            icon: 'fab fa-github'
        }
    ]
};

// 创建express应用
const app = express()

app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.url}`)
    next()
})

app.use(bodyParser.json())

//静态文件
app.use(express.static(path.join(__dirname, './../src')))

// API: 获取网站配置
app.get('/site-config', getSiteConfig)

// API: 获取留言列表
app.get('/comments', getComments)

// API: 提交新留言
app.post('/new-comment', postNewComment)

// 读取配置文件
let config = {
    "port": 9999,
    "addr": "http://127.0.0.1"
}
config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8', err => {
    logger.err('读取配置文件失败: ' + err.message)
    logger.mark('使用默认配置')
    // process.exit()
}))

// 检查数据目录
const dataDir = path.join(__dirname, './../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
// 留言
if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, '[]', 'utf-8');
}
// site-config
if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultSiteConfig, null, 4), 'utf-8');
}

// 启动服务器
app.listen(Number(config.port), () => {
    logger.info(`server run at ${config.addr}:${config.port}`)
})