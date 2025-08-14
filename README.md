# KalorsPage
## 简介
KalorsPage是一款全新的简洁且具有创新的个人主页模板。
![KalorsPage](images/KalorsPage.png)
点击跳转预览：https://kalors.com/

## 特性
- 简洁的页面设计
- 适配多种屏幕尺寸，如手机、平板、PC等
- 独居创新的留言板功能

## 开发设计
- 使用HTML5、CSS3、JavaScript进行开发，以Node.js做为后端提供留言板功能的服务。
- 使用pnpm(v10.11.0)进行依赖管理
- 运行环境：Node.js(v24.0.2)
- 图标库来源于[FontAwesome](https://fontawesome.com/icons)

注意：Node.js和pnpm需要自行安装，所示版本为开发时所用版本，其余版本请自行测试

# 快速开始
## 下载KalorsPage
- 使用git命令克隆仓库
```bash
git clone https://github.com/Kalors/KalorsPage.git ./KalorsPage
```
- 或者手动下载zip包并解压

## 自定义页面
**请保留底部版权信息**
### ./config/config.json
该文件包含两项内容，为网站的运行信息
- port: 网站运行端口，默认9999
- addr: 日志显示的运行地址，默认"http://127.0.0.1"(该项仅用于日志显示)
### ./config/site-config.json
- name: 网站名称
- title: 网站标题
- description: 网站描述
- keywords: 网站关键字
- socialLinks: 网站社交链接
    - name: 链接名称
    - url: 链接地址
    - icon: 链接图标(来源于[Font Awesome](https://fontawesome.com/icons))
### ./src/assets/images/
- favicon.ico: 网站图标
- avatar.jpg: 头像
### ./bin/server.js (可选)
``` javascript
import logger from './logger.js'
// import logger from './logger-file.js'
```
此处提供两种日志记录文件，第一种仅输出控制台，第二种输入控制台和日志文件，推荐使用第一种(默认)。

如需使用日志文件，请取消注释并注释第一种方案。

**注意: 一定不要同时启用两种方案或者两个方案都注释！！！**

## 运行
安装依赖
``` bash
pnpm i
```
运行
``` bash
node app
```
控制台输出类似```[info][2025-08-14 20:57:22]server run at http://127.0.0.1:9999```说明运行成功。访问```http://127.0.0.1:9999/```查看效果。

如果希望使用域名访问，请自行配置(如使用反代)。

关闭终端或按下Ctrl+C关闭程序。

## 额外提示
如果想要保持运行，请自行注册为系统服务，此处提供一个Ubuntu Server可用的服务脚本以供参考，具体使用方法建议咨询AI如Kimi、DeepSeek等。
``` bash
[Unit]
Description=KalorsPage
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/Website/KalorsPage
ExecStart=node /Website/KalorsPage/app.js
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

# 写在最后
该项目由一个高三牲独立开发，请勿用于商业用途。

若有bug欢迎提issue，若有更好的建议也欢迎进行PR。

如果需要联系作者，请通过我的[个人主页](https://kalors.com/)前往我的博客任意文章下进行留言。

-- 2025年8月14日

# 许可证

本项目采用 [GNU General Public License v3.0](LICENSE) 许可证。

这意味着你可以自由地使用、复制、修改和分发本软件，但必须遵守以下条件：
- 保留原始版权声明
- 如果分发修改版本，必须以相同的许可证发布
- 不得用于任何违法用途