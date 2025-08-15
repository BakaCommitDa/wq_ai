// 延迟处理和用户体验管理器
class LoadingManager {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.loadingElement = null;
        this.loadingTextElement = null;
        this.progressBarElement = null;
        this.currentMessage = '';
        this.messageRotationInterval = null;
        this.progressInterval = null;
        this.isLoading = false;
        
        this.initializeElements();
    }

    initializeElements() {
        this.loadingElement = document.getElementById('loadingOverlay');
        this.loadingTextElement = document.getElementById('loadingText');
        
        // 创建进度条元素
        if (this.loadingElement && !this.progressBarElement) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'loading-progress-container';
            progressContainer.innerHTML = `
                <div class="loading-progress-bar">
                    <div class="loading-progress-fill" id="loadingProgressFill"></div>
                </div>
                <div class="loading-progress-text" id="loadingProgressText">0%</div>
            `;
            
            this.loadingElement.querySelector('.loading-content').appendChild(progressContainer);
            this.progressBarElement = document.getElementById('loadingProgressFill');
            this.progressTextElement = document.getElementById('loadingProgressText');
        }
    }

    // 显示加载状态
    show(message = 'AI正在思考中...', options = {}) {
        if (!this.loadingElement) return;

        this.isLoading = true;
        this.currentMessage = message;
        
        // 设置初始消息
        if (this.loadingTextElement) {
            this.loadingTextElement.textContent = message;
        }

        // 显示加载覆盖层
        this.loadingElement.classList.remove('hidden');
        this.loadingElement.style.display = 'flex';

        // 启动消息轮换
        if (options.rotateMessages && options.messages) {
            this.startMessageRotation(options.messages, options.rotationInterval || 2000);
        }

        // 启动进度条动画
        if (options.showProgress) {
            this.startProgressAnimation(options.duration || 5000);
        }

        // 添加加载动画
        this.addLoadingAnimation();
    }

    // 隐藏加载状态
    hide() {
        if (!this.loadingElement) return;

        this.isLoading = false;
        
        // 停止所有动画
        this.stopMessageRotation();
        this.stopProgressAnimation();
        
        // 隐藏加载覆盖层
        this.loadingElement.classList.add('hidden');
        this.loadingElement.style.display = 'none';

        // 重置进度条
        this.resetProgress();
    }

    // 更新加载消息
    updateMessage(message) {
        this.currentMessage = message;
        if (this.loadingTextElement) {
            this.loadingTextElement.textContent = message;
        }
    }

    // 启动消息轮换
    startMessageRotation(messages, interval = 2000) {
        if (!messages || messages.length === 0) return;

        let currentIndex = 0;
        this.messageRotationInterval = setInterval(() => {
            if (!this.isLoading) return;
            
            currentIndex = (currentIndex + 1) % messages.length;
            this.updateMessage(messages[currentIndex]);
        }, interval);
    }

    // 停止消息轮换
    stopMessageRotation() {
        if (this.messageRotationInterval) {
            clearInterval(this.messageRotationInterval);
            this.messageRotationInterval = null;
        }
    }

    // 启动进度条动画
    startProgressAnimation(duration = 5000) {
        if (!this.progressBarElement) return;

        let progress = 0;
        const increment = 100 / (duration / 100); // 每100ms增加的进度

        this.progressInterval = setInterval(() => {
            if (!this.isLoading) return;

            progress = Math.min(progress + increment, 95); // 最多到95%，等待实际完成
            this.updateProgress(progress);

            if (progress >= 95) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }
        }, 100);
    }

    // 停止进度条动画
    stopProgressAnimation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // 更新进度条
    updateProgress(percentage) {
        if (this.progressBarElement) {
            this.progressBarElement.style.width = `${percentage}%`;
        }
        if (this.progressTextElement) {
            this.progressTextElement.textContent = `${Math.round(percentage)}%`;
        }
    }

    // 完成进度条
    completeProgress() {
        this.updateProgress(100);
        setTimeout(() => {
            this.hide();
        }, 500);
    }

    // 重置进度条
    resetProgress() {
        this.updateProgress(0);
    }

    // 添加加载动画
    addLoadingAnimation() {
        if (!this.loadingElement) return;
        // 只保留脉冲动画类，不再创建粒子效果
        this.loadingElement.classList.add('loading-pulse');
    }

    // 显示AI思考状态
    showAIThinking(difficulty = 'medium') {
        const messages = this.getThinkingMessages(difficulty);
        
        this.show(messages[0], {
            rotateMessages: true,
            messages: messages,
            rotationInterval: 1500,
            showProgress: true,
            duration: 4000
        });
    }

    // 获取思考消息
    getThinkingMessages(difficulty) {
        const baseMessages = [
            'AI正在思考中...',
            '正在分析词汇特征...',
            '创意正在路上...',
            'AI大脑正在运转...'
        ];

        const difficultyMessages = {
            easy: [
                '正在寻找有趣的日常词汇...',
                '挖掘年轻人喜爱的网络用语...',
                '生成轻松愉快的题目...'
            ],
            medium: [
                '正在构思流行文化词汇...',
                '分析当下热门话题...',
                '创造有挑战性的题目...'
            ],
            hard: [
                '深度分析复杂概念...',
                '构建高难度词汇...',
                '挑战您的知识边界...'
            ],
            expert: [
                '探索前沿科技概念...',
                '构思哲学思辨题目...',
                '准备终极挑战...'
            ]
        };

        return [...baseMessages, ...(difficultyMessages[difficulty] || difficultyMessages.medium)];
    }

    // 显示错误状态
    showError(message, duration = 3000) {
        this.show(message);
        
        // 添加错误样式
        if (this.loadingElement) {
            this.loadingElement.classList.add('loading-error');
        }

        setTimeout(() => {
            this.hide();
            if (this.loadingElement) {
                this.loadingElement.classList.remove('loading-error');
            }
        }, duration);
    }

    // 显示成功状态
    showSuccess(message, duration = 2000) {
        this.show(message);
        
        // 添加成功样式
        if (this.loadingElement) {
            this.loadingElement.classList.add('loading-success');
        }

        this.completeProgress();

        setTimeout(() => {
            if (this.loadingElement) {
                this.loadingElement.classList.remove('loading-success');
            }
        }, duration);
    }
}

// 错误处理管理器
class ErrorHandler {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.errorCount = 0;
        this.maxErrors = 5;
        this.errorLog = [];
        this.fallbackStrategies = [
            'LOCAL_AI_MODEL',
            'MOCK_API_SERVICE', 
            'LOCAL_DATABASE',
            'EMERGENCY_MODE'
        ];
        this.currentStrategy = 0;
    }

    // 处理AI生成错误
    async handleAIGenerationError(error, context) {
        this.errorCount++;
        this.logError(error, context);

        console.warn(`AI生成错误 (${this.errorCount}/${this.maxErrors}):`, error);

        // 如果错误次数过多，降级服务
        if (this.errorCount >= this.maxErrors) {
            return this.activateEmergencyMode();
        }

        // 尝试下一个回退策略
        return this.tryNextFallbackStrategy(context);
    }

    // 尝试下一个回退策略
    async tryNextFallbackStrategy(context) {
        if (this.currentStrategy >= this.fallbackStrategies.length - 1) {
            return this.activateEmergencyMode();
        }

        this.currentStrategy++;
        const strategy = this.fallbackStrategies[this.currentStrategy];

        switch (strategy) {
            case 'MOCK_API_SERVICE':
                return this.useMockAPIService(context);
            case 'LOCAL_DATABASE':
                return this.useLocalDatabase(context);
            case 'EMERGENCY_MODE':
                return this.activateEmergencyMode();
            default:
                return this.useLocalDatabase(context);
        }
    }

    // 使用模拟API服务
    async useMockAPIService(context) {
        try {
            if (typeof MockAIService !== 'undefined') {
                const mockService = new MockAIService();
                const result = await mockService.generateQuestion(
                    context.prompt, 
                    context.difficulty
                );
                
                this.game.showNotification('使用模拟AI服务生成题目', 'info');
                return result;
            }
        } catch (error) {
            console.warn('模拟API服务失败:', error);
        }
        
        return this.useLocalDatabase(context);
    }

    // 使用本地数据库
    async useLocalDatabase(context) {
        try {
            const result = await this.game.generateFromLocalDatabase();
            this.game.showNotification('使用本地题库生成题目', 'warning');
            return result;
        } catch (error) {
            console.error('本地数据库失败:', error);
            return this.activateEmergencyMode();
        }
    }

    // 激活紧急模式
    activateEmergencyMode() {
        this.game.showNotification('系统进入紧急模式，功能受限', 'error');
        
        // 返回一个基础题目
        return {
            word: '游戏',
            hints: ['娱乐活动', '休闲方式', '互动体验', '快乐源泉']
        };
    }

    // 记录错误
    logError(error, context) {
        const errorEntry = {
            timestamp: new Date().toISOString(),
            error: error.message,
            context: context,
            strategy: this.fallbackStrategies[this.currentStrategy]
        };
        
        this.errorLog.push(errorEntry);
        
        // 保持错误日志大小
        if (this.errorLog.length > 50) {
            this.errorLog.shift();
        }
    }

    // 重置错误状态
    reset() {
        this.errorCount = 0;
        this.currentStrategy = 0;
        this.errorLog = [];
    }

    // 获取错误统计
    getErrorStats() {
        return {
            errorCount: this.errorCount,
            currentStrategy: this.fallbackStrategies[this.currentStrategy],
            recentErrors: this.errorLog.slice(-10)
        };
    }
}

// 性能监控器
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            aiGenerationTime: [],
            fallbackUsage: 0,
            cacheHitRate: 0,
            errorRate: 0,
            userSatisfaction: 0
        };
        this.startTime = null;
    }

    // 开始计时
    startTiming(operation) {
        this.startTime = performance.now();
    }

    // 结束计时
    endTiming(operation) {
        if (this.startTime) {
            const duration = performance.now() - this.startTime;
            this.recordMetric(operation, duration);
            this.startTime = null;
            return duration;
        }
        return 0;
    }

    // 记录指标
    recordMetric(operation, value) {
        if (!this.metrics[operation]) {
            this.metrics[operation] = [];
        }
        
        this.metrics[operation].push(value);
        
        // 保持数组大小
        if (this.metrics[operation].length > 100) {
            this.metrics[operation].shift();
        }
    }

    // 获取平均值
    getAverage(operation) {
        const values = this.metrics[operation];
        if (!values || values.length === 0) return 0;
        
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    // 获取性能报告
    getPerformanceReport() {
        return {
            avgAIGenerationTime: this.getAverage('aiGenerationTime'),
            fallbackUsage: this.metrics.fallbackUsage,
            cacheHitRate: this.metrics.cacheHitRate,
            errorRate: this.metrics.errorRate,
            totalOperations: this.metrics.aiGenerationTime.length
        };
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoadingManager, ErrorHandler, PerformanceMonitor };
}

