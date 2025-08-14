/*
 * Copyright (C) 2025 KaedeharaLu
 * 依据 GNU 通用公共许可证 v3.0 授权
 * 请参阅 LICENSE 文件了解详细信息
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import logger from '../bin/logger.js'

const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)
const CONFIG_FILE = path.join(__dirname, './../config/site-config.json')

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
}

export const getSiteConfig = (req, res) => {
    try {
        // 如果配置文件存在，读取配置文件中的网站配置，否则使用默认配置
        if (fs.existsSync(CONFIG_FILE)) {
            const siteConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')) || defaultSiteConfig
            res.json(siteConfig)
        } else {
            // 如果配置文件不存在，返回默认配置
            logger.mark('配置文件不存在，使用默认配置')
            res.json(defaultSiteConfig)
        }
    } catch (err) {
        logger.err('读取网站配置失败:', err)
        // 出错时返回默认配置
        res.json({ defaultSiteConfig })
    }
}