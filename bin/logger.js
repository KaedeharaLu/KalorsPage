/*
 * Copyright (C) 2025 KaedeharaLu
 * 依据 GNU 通用公共许可证 v3.0 授权
 * 请参阅 LICENSE 文件了解详细信息
 */
import chalk from 'chalk'
import moment from 'moment'

/**
 * 日志工具类
 */
class Logger {
    /**
     * 初始化日志文件
     */
    static new() {} // 防止主文件出错

    /**
     * 输出info级别日志（绿色）
     * @param {string} message - 日志内容
     */
    static info(message) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(
            `${chalk.green('[info]')}${chalk.blue(`[${timestamp}]`)}${chalk.white(message)}`
        )
    }

    /**
     * 输出error级别日志（红色）
     * @param {string} message - 日志内容
     */
    static err(message) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(
            `${chalk.red('[error]')}${chalk.blue(`[${timestamp}]`)}${chalk.white(message)}`
        )
    }

    /**
     * 输出mark级别日志（白色）
     * @param {string} message - 日志内容
     */
    static mark(message) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(
            `${chalk.white('[mark]')}${chalk.blue(`[${timestamp}]`)}${chalk.white(message)}`
        )
    }
}

export default Logger