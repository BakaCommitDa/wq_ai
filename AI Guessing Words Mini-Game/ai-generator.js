// AI题目生成器 - 纯前端实现
class AIQuestionGenerator {
    constructor() {
        this.isInitialized = false;
        this.apiEndpoint = '/api/generate-question'; // 代理API端点
        this.fallbackDatabase = null;
        this.usedWords = new Set();
        this.generationCache = new Map();
        this.maxCacheSize = 50;
        
        // AI生成配置
        this.config = {
            maxRetries: 3,
            timeout: 5000,
            enableCache: true,
            enableFallback: true
        };

        // 内容过滤器
        this.contentFilter = new ContentFilter();
        
        // 性能监控
        this.metrics = {
            apiCalls: 0,
            cacheHits: 0,
            fallbackUses: 0,
            averageResponseTime: 0
        };
    }

    // 初始化AI生成器
    async initialize(fallbackDatabase) {
        try {
            this.fallbackDatabase = fallbackDatabase;
            
            // 预热API连接
            await this.warmupAPI();
            
            // 预生成一些题目
            await this.preGenerateQuestions();
            
            this.isInitialized = true;
            console.log('AI题目生成器初始化成功');
            
            return true;
        } catch (error) {
            console.warn('AI生成器初始化失败，将使用本地题库:', error);
            this.isInitialized = false;
            return false;
        }
    }

    // API预热
    async warmupAPI() {
        try {
            const response = await fetch(this.apiEndpoint + '/health', {
                method: 'GET',
                timeout: 2000
            });
            return response.ok;
        } catch (error) {
            throw new Error('API服务不可用');
        }
    }

    // 预生成题目
    async preGenerateQuestions() {
        const difficulties = ['easy', 'medium', 'hard', 'expert'];
        const preGenerateCount = 2; // 每个难度预生成2个题目

        for (const difficulty of difficulties) {
            for (let i = 0; i < preGenerateCount; i++) {
                try {
                    const question = await this.generateQuestionInternal(difficulty, []);
                    this.cacheQuestion(difficulty, question);
                } catch (error) {
                    console.warn(`预生成${difficulty}难度题目失败:`, error);
                }
            }
        }
    }

    // 主要的题目生成接口
    async generateQuestion(difficulty, usedWords = []) {
        const startTime = performance.now();
        
        try {
            // 更新已使用词汇列表
            this.updateUsedWords(usedWords);
            
            // 1. 尝试从缓存获取
            if (this.config.enableCache) {
                const cachedQuestion = this.getCachedQuestion(difficulty);
                if (cachedQuestion && !this.isWordUsed(cachedQuestion.word)) {
                    this.metrics.cacheHits++;
                    this.recordMetrics(startTime);
                    return cachedQuestion;
                }
            }

            // 2. 尝试AI生成
            if (this.isInitialized) {
                try {
                    const aiQuestion = await this.generateWithAI(difficulty, Array.from(this.usedWords));
                    if (aiQuestion && this.contentFilter.isContentSafe(aiQuestion)) {
                        this.cacheQuestion(difficulty, aiQuestion);
                        this.recordMetrics(startTime);
                        return aiQuestion;
                    }
                } catch (error) {
                    console.warn('AI生成失败，使用回退方案:', error);
                }
            }

            // 3. 回退到本地题库
            if (this.config.enableFallback && this.fallbackDatabase) {
                this.metrics.fallbackUses++;
                const fallbackQuestion = this.generateFromFallback(difficulty, Array.from(this.usedWords));
                this.recordMetrics(startTime);
                return fallbackQuestion;
            }

            throw new Error('所有生成方案都失败了');

        } catch (error) {
            console.error('题目生成失败:', error);
            this.recordMetrics(startTime);
            throw error;
        }
    }

    // AI生成核心逻辑
    async generateWithAI(difficulty, usedWords) {
        const prompt = this.buildPrompt(difficulty, usedWords);
        
        for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
            try {
                const response = await this.callAIAPI(prompt, difficulty);
                
                if (response && response.word && response.hints) {
                    // 验证生成的内容
                    if (this.validateQuestion(response, usedWords)) {
                        this.metrics.apiCalls++;
                        return response;
                    }
                }
            } catch (error) {
                console.warn(`AI生成尝试 ${attempt + 1} 失败:`, error);
                if (attempt === this.config.maxRetries - 1) {
                    throw error;
                }
                // 指数退避
                await this.sleep(Math.pow(2, attempt) * 1000);
            }
        }
        
        throw new Error('AI生成达到最大重试次数');
    }

    // 构建AI提示词
    buildPrompt(difficulty, usedWords) {
        const difficultyDescriptions = {
            easy: '简单有趣，适合年轻人的日常词汇，如网络流行语、生活场景',
            medium: '中等难度，包含流行文化、职场生活等年轻人熟悉的概念',
            hard: '较难的概念，如深度网络文化、社会现象等',
            expert: '专家级别，包含前沿科技、哲学思辨等高深概念'
        };

        const categories = {
            easy: ['网络文化', '日常生活', '娱乐场景', '美食', '运动'],
            medium: ['流行文化', '职场生活', '科技应用', '社交媒体', '消费文化'],
            hard: ['深度网络文化', '社会现象', '心理学概念', '经济概念', '文化现象'],
            expert: ['前沿科技', '哲学思辨', '学术概念', '未来趋势', '复杂理论']
        };

        return {
            difficulty: difficulty,
            description: difficultyDescriptions[difficulty],
            categories: categories[difficulty],
            usedWords: usedWords,
            requirements: [
                '词汇要贴近年轻人生活，有趣生动',
                '提示要循序渐进，从模糊到具体',
                '避免使用已经出现过的词汇',
                '内容要积极正面，适合所有年龄段',
                '提示语言要幽默风趣，富有创意'
            ]
        };
    }

    // 调用AI API
    async callAIAPI(prompt, difficulty) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            // 在演示环境中使用模拟API服务
            if (typeof MockAIService !== 'undefined') {
                clearTimeout(timeoutId);
                const mockService = new MockAIService();
                return await mockService.generateQuestion(prompt, difficulty);
            }

            // 实际部署时的API调用
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    difficulty: difficulty,
                    format: 'json'
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            return this.parseAIResponse(data);

        } catch (error) {
            clearTimeout(timeoutId);
            
            // 如果是网络错误或超时，尝试使用模拟服务
            if (error.name === 'AbortError' || error.name === 'TypeError') {
                console.warn('API服务不可用，使用模拟服务');
                if (typeof MockAIService !== 'undefined') {
                    const mockService = new MockAIService();
                    return await mockService.generateQuestion(prompt, difficulty);
                }
            }
            
            throw error;
        }
    }

    // 解析AI响应
    parseAIResponse(data) {
        try {
            // 如果返回的是字符串，尝试解析JSON
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            // 验证响应格式
            if (!data.word || !Array.isArray(data.hints)) {
                throw new Error('AI响应格式不正确');
            }

            return {
                word: data.word.trim(),
                hints: data.hints.map(hint => hint.trim()).filter(hint => hint.length > 0)
            };
        } catch (error) {
            throw new Error('解析AI响应失败: ' + error.message);
        }
    }

    // 验证生成的题目
    validateQuestion(question, usedWords) {
        // 检查词汇是否已使用
        if (usedWords.includes(question.word)) {
            return false;
        }

        // 检查提示数量
        if (!question.hints || question.hints.length < 3) {
            return false;
        }

        // 检查内容长度
        if (question.word.length > 20 || question.word.length < 1) {
            return false;
        }

        // 检查提示质量
        for (const hint of question.hints) {
            if (hint.length < 3 || hint.length > 50) {
                return false;
            }
        }

        return true;
    }

    // 从本地题库生成（回退方案）
    generateFromFallback(difficulty, usedWords) {
        if (!this.fallbackDatabase || !this.fallbackDatabase[difficulty]) {
            throw new Error('本地题库不可用');
        }

        const allWords = [];
        const categories = Object.keys(this.fallbackDatabase[difficulty]);
        
        categories.forEach(category => {
            const words = this.fallbackDatabase[difficulty][category];
            allWords.push(...words);
        });

        // 过滤已使用的词汇
        const availableWords = allWords.filter(wordObj => 
            !usedWords.includes(wordObj.word)
        );

        if (availableWords.length === 0) {
            // 如果所有词汇都用完了，重置已使用列表
            this.usedWords.clear();
            return allWords[Math.floor(Math.random() * allWords.length)];
        }

        return availableWords[Math.floor(Math.random() * availableWords.length)];
    }

    // 缓存管理
    cacheQuestion(difficulty, question) {
        if (!this.config.enableCache) return;

        const cacheKey = `${difficulty}_${Date.now()}`;
        this.generationCache.set(cacheKey, {
            ...question,
            difficulty,
            timestamp: Date.now()
        });

        // 清理过期缓存
        this.cleanupCache();
    }

    getCachedQuestion(difficulty) {
        if (!this.config.enableCache) return null;

        for (const [key, question] of this.generationCache.entries()) {
            if (question.difficulty === difficulty && !this.isWordUsed(question.word)) {
                this.generationCache.delete(key);
                return question;
            }
        }

        return null;
    }

    cleanupCache() {
        if (this.generationCache.size <= this.maxCacheSize) return;

        // 删除最旧的缓存项
        const entries = Array.from(this.generationCache.entries());
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        const toDelete = entries.slice(0, entries.length - this.maxCacheSize);
        toDelete.forEach(([key]) => this.generationCache.delete(key));
    }

    // 工具方法
    updateUsedWords(usedWords) {
        usedWords.forEach(word => this.usedWords.add(word));
    }

    isWordUsed(word) {
        return this.usedWords.has(word);
    }

    recordMetrics(startTime) {
        const responseTime = performance.now() - startTime;
        this.metrics.averageResponseTime = 
            (this.metrics.averageResponseTime + responseTime) / 2;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 获取性能指标
    getMetrics() {
        return { ...this.metrics };
    }

    // 重置生成器
    reset() {
        this.usedWords.clear();
        this.generationCache.clear();
        this.metrics = {
            apiCalls: 0,
            cacheHits: 0,
            fallbackUses: 0,
            averageResponseTime: 0
        };
    }
}

// 内容过滤器
class ContentFilter {
    constructor() {
        this.sensitiveWords = [
            // 这里可以添加需要过滤的敏感词
        ];
        
        this.inappropriatePatterns = [
            /暴力/,
            /血腥/,
            /恐怖/,
            // 添加更多不当内容模式
        ];
    }

    isContentSafe(question) {
        const content = question.word + ' ' + question.hints.join(' ');
        
        // 检查敏感词
        for (const word of this.sensitiveWords) {
            if (content.includes(word)) {
                return false;
            }
        }

        // 检查不当模式
        for (const pattern of this.inappropriatePatterns) {
            if (pattern.test(content)) {
                return false;
            }
        }

        // 检查内容积极性
        return this.isPositiveContent(content);
    }

    isPositiveContent(content) {
        // 简单的积极性检查
        const negativeWords = ['死亡', '痛苦', '悲伤', '恐惧'];
        const positiveWords = ['快乐', '有趣', '创新', '美好'];
        
        let score = 0;
        negativeWords.forEach(word => {
            if (content.includes(word)) score -= 1;
        });
        positiveWords.forEach(word => {
            if (content.includes(word)) score += 1;
        });
        
        return score >= 0;
    }
}

// 模拟API服务（用于演示，实际部署时需要真实的API服务）
class MockAIService {
    constructor() {
        this.templates = {
            easy: [
                { word: '刷屏', hints: ['手机不离手的状态', '信息爆炸的体现', '社交媒体的魅力', '碎片时间的消磨'] },
                { word: '种草', hints: ['被安利某样东西', '购买欲被激发', '美妆博主的拿手好戏', '钱包的天敌'] },
                { word: '拔草', hints: ['买到心仪的东西', '种草后的行动', '购物车清空的快感', '钱包变瘦的时刻'] }
            ],
            medium: [
                { word: '数字游民', hints: ['不被地理位置束缚的工作者', '带着电脑环游世界', '远程办公的极致形态', '自由职业的新模式'] },
                { word: '精神内耗', hints: ['内心的自我消耗', '想太多导致的疲惫', '心理能量的浪费', '过度思考的副作用'] }
            ],
            hard: [
                { word: '算法推荐', hints: ['个性化内容分发', '大数据的应用场景', '你喜欢什么就推什么', '信息茧房的制造者'] },
                { word: '注意力经济', hints: ['争夺用户时间的商业模式', '眼球就是金钱的体现', '互联网公司的核心逻辑', '碎片化时代的产物'] }
            ],
            expert: [
                { word: '技术奇点', hints: ['人工智能超越人类的时刻', '科技发展的临界点', '未来学的重要概念', '智能爆炸的起始'] },
                { word: '数字永生', hints: ['意识上传的终极目标', '死亡的技术解决方案', '人类存在的数字化', '永恒生命的可能性'] }
            ]
        };
    }

    async generateQuestion(prompt, difficulty) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const templates = this.templates[difficulty] || this.templates.easy;
        const usedWords = prompt.usedWords || [];
        
        // 过滤已使用的词汇
        const availableTemplates = templates.filter(template => 
            !usedWords.includes(template.word)
        );
        
        if (availableTemplates.length === 0) {
            // 如果没有可用模板，随机选择一个
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            return randomTemplate;
        }
        
        const selectedTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
        
        // 添加一些随机性到提示中
        const enhancedHints = selectedTemplate.hints.map(hint => {
            const variations = [hint, hint + '的体现', hint + '的表现'];
            return variations[Math.floor(Math.random() * variations.length)];
        });
        
        return {
            word: selectedTemplate.word,
            hints: enhancedHints
        };
    }
}

// 导出类供游戏使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIQuestionGenerator, ContentFilter, MockAIService };
}

