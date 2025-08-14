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
const COMMENTS_FILE = path.join(__dirname, './../data/comments.json')

export const getComments = (req, res) => {
    try {
        const comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8'))
        // 按时间倒序排列（最新在前）
        const sortedComments = comments.sort((a, b) =>
            new Date(b.time) - new Date(a.time)
        )
        res.json(sortedComments)
    } catch (err) {
        logger.err('读取留言失败:', err)
        res.status(500).json({ error: '无法读取留言数据' })
    }
}