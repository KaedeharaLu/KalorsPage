/*
 * Copyright (C) 2025 KaedeharaLu
 * 依据 GNU 通用公共许可证 v3.0 授权
 * 请参阅 LICENSE 文件了解详细信息
 */
const { createApp, ref, onMounted } = Vue

createApp({
    setup() {
        const commentFormCollapsed = ref(true); // 默认折叠

        // 默认站点数据
        const siteConfig = ref({
            name: 'HOMEPAGE',
            title: '个人主页',
            description: '个人引导页面',
            keywords: '个人主页,个人引导页',
            socialLinks: [
                {
                    name: 'Blog',
                    url: '#',
                    icon: 'fab fa-bilibili'
                },
                {
                    name: 'Github',
                    url: '#',
                    icon: 'fab fa-github'
                }
            ]
        });

        // 当前时间
        const hours = ref('00');
        const minutes = ref('00');
        const seconds = ref('00');

        // 获取网站配置
        const fetchSiteConfig = async () => {
            try {
                const response = await axios.get('/site-config');

                siteConfig.value = response.data;

                // 更新页面标题和meta信息
                document.title = response.data.title;
                document.querySelector('meta[name="description"]').setAttribute('content', response.data.description);
                document.querySelector('meta[name="keywords"]').setAttribute('content', response.data.keywords);
            } catch (err) {
                console.error('获取网站配置失败:', err);
            }
        };

        // 更新当前时间
        const updateCurrentTime = () => {
            const now = new Date();
            hours.value = now.getHours().toString().padStart(2, '0');
            minutes.value = now.getMinutes().toString().padStart(2, '0');
            seconds.value = now.getSeconds().toString().padStart(2, '0');
        };

        // 切换留言表单折叠状态
        const toggleCommentForm = () => {
            commentFormCollapsed.value = !commentFormCollapsed.value;
        };

        const comments = ref([]);
        const loading = ref(true);
        const error = ref(null);

        // 新留言表单
        const newComment = ref({
            nickname: '',
            blog: '',
            avatar: '',
            content: ''
        });

        const errors = ref({
            nickname: '',
            content: '',
            avatar: ''
        });

        const submitting = ref(false);
        const submitSuccess = ref(false);

        // 获取留言数据
        const fetchComments = async () => {
            try {
                const response = await axios.get('/comments');

                // 将获取的数据按时间倒序排列（最新的在前）
                comments.value = response.data.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });

                loading.value = false;
            } catch (err) {
                error.value = '加载留言失败: ' + (err.message || '请稍后再试');
                loading.value = false;

                // 错误就设置成空
                comments.value = [];
                loading.value = false;
            }
        };

        // 格式化时间
        const formatTime = (timeString) => {
            const date = new Date(timeString);
            return date.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        // 表单验证
        const validateForm = () => {
            let valid = true;
            errors.value = { nickname: '', content: '', avatar: '' };

            if (!newComment.value.nickname.trim()) {
                errors.value.nickname = '请输入昵称';
                valid = false;
            }

            if (!newComment.value.content.trim()) {
                errors.value.content = '请输入留言内容';
                valid = false;
            }

            if (newComment.value.avatar && !isValidUrl(newComment.value.avatar)) {
                errors.value.avatar = '请输入有效的URL地址';
                valid = false;
            }

            return valid;
        };

        // URL验证函数
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        };

        // 提交留言
        const submitComment = async () => {
            if (!validateForm()) return;

            submitting.value = true;
            submitSuccess.value = false;

            try {
                // 构建要提交的数据
                const commentData = {
                    ...newComment.value,
                    time: new Date().toISOString()
                };

                // 提交留言
                const response = await axios.post('/new-comment', commentData);

                // 将新留言添加到列表开头
                comments.value.unshift(response.data);

                // 清空表单
                newComment.value = {
                    nickname: '',
                    blog: '',
                    avatar: '',
                    content: ''
                };

                submitSuccess.value = true;

                // 提交成功后折叠表单
                commentFormCollapsed.value = true;

                // 3秒后隐藏成功消息
                setTimeout(() => {
                    submitSuccess.value = false;
                }, 3000);
            } catch (err) {
                error.value = '提交留言失败: ' + (err.message || '请稍后再试');
            } finally {
                submitting.value = false;
            }
        };

        const fetchHikotoko = async () => {
            try {
                const response = await fetch('https://v1.hitokoto.cn');
                const data = await response.json();
                const hitokotoElement = document.getElementById('hitokoto');
                hitokotoElement.innerText = `${data.hitokoto} —— ${data.from}`;
            } catch (error) {
                console.error('获取一言失败:', error);
                const hitokotoElement = document.getElementById('hitokoto');
                hitokotoElement.innerText = '平凡是生活的底色，但每个人都可以为它增添自己的色彩';
            }
        };

        onMounted(() => {
            // 初始化当前时间
            updateCurrentTime();

            // 每秒更新一次时间
            setInterval(updateCurrentTime, 1000);

            // 获取留言
            fetchComments();

            // 获取一言
            fetchHikotoko();

            // 获取网站配置
            fetchSiteConfig();
        });

        return {
            hours,
            minutes,
            seconds,
            comments,
            loading,
            error,
            newComment,
            errors,
            submitting,
            submitSuccess,
            formatTime,
            submitComment,
            commentFormCollapsed,
            toggleCommentForm,
            siteConfig
        };
    }
}).mount('#app');