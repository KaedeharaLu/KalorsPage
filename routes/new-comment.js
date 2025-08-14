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

export const postNewComment = (req, res) => {
    const newComment = req.body

    // 基本验证
    if (!newComment.nickname || !newComment.content) {
        return res.status(400).json({ error: '昵称和内容不能为空' })
    }

    // 清理数据
    newComment.nickname = newComment.nickname.trim().substring(0, 30)
    newComment.content = newComment.content.trim().substring(0, 500)
    newComment.blog = (newComment.blog || '').substring(0, 200)
    newComment.avatar = (newComment.avatar || '').substring(0, 300)

    try {
        const comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8'))

        // 创建新留言对象
        const commentWithId = {
            id: Date.now().toString(), // ID生成
            time: new Date().toISOString(),
            ...newComment
        }

        comments.push(commentWithId)
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 4), 'utf-8')

        logger.info(`${newComment.nickname}新建留言成功, id为: ` + commentWithId.id)
        res.status(201).json(commentWithId)
    } catch (err) {
        logger.err('保存留言失败:', err)
        res.status(500).json({ error: '保存留言失败' })
    }
}