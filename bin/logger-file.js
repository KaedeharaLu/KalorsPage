/*
 * Copyright (C) 2025 KaedeharaLu
 * 依据 GNU 通用公共许可证 v3.0 授权
 * 请参阅 LICENSE 文件了解详细信息
 */
import chalk from 'chalk'
import moment from 'moment'
import fs from 'fs'
import path from 'path'

/**
 * 日志工具类
 */
class logger {
    static logFile = null;

    /**
     * 初始化日志文件
     */
    static new() {
        // 创建 logs 目录
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        // 根据启动时间创建日志文件
        const startTime = moment().format('YYYY-MM-DD HH-mm-ss');
        this.logFile = path.join(logsDir, `${startTime}.log`);
        
        // 创建空的日志文件
        fs.writeFileSync(this.logFile, '', 'utf-8');
        
        // 记录初始化信息
        const initMessage = `[START][${moment().format('YYYY-MM-DD HH:mm:ss')}]Log file initialized\n`;
        fs.appendFileSync(this.logFile, initMessage, 'utf-8');
    }

    /**
     * 输出info级别日志（绿色）
     * @param {string} message - 日志内容
     */
    static info(message) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(
            `${chalk.green('[info]')}${chalk.blue(`[${timestamp}]`)}${chalk.white(message)}`
        )
        
        // 如果日志文件已初始化，则写入文件
        if (this.logFile) {
            const fileMessage = `[info][${timestamp}]${message}\n`;
            fs.appendFileSync(this.logFile, fileMessage, 'utf-8');
        }
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
        
        // 如果日志文件已初始化，则写入文件
        if (this.logFile) {
            const fileMessage = `[error][${timestamp}]${message}\n`;
            fs.appendFileSync(this.logFile, fileMessage, 'utf-8');
        }
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
        
        // 如果日志文件已初始化，则写入文件
        if (this.logFile) {
            const fileMessage = `[mark][${timestamp}]${message}\n`;
            fs.appendFileSync(this.logFile, fileMessage, 'utf-8');
        }
    }
}

export default logger