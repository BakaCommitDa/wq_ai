// AI智能猜词大师 - 优化版游戏引擎
class OptimizedWordMaster {
    constructor() {
        this.initializeGame();
        this.setupEventListeners();
        this.initializePerformanceMonitoring();
    }

    // 初始化游戏
    initializeGame() {
        // 游戏状态
        this.gameState = {
            currentScreen: 'welcome',
            isGameActive: false,
            isPaused: false,
            mode: 'classic',
            difficulty: 'medium',
            score: 0,
            streak: 0,
            maxStreak: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            currentWord: '',
            currentHints: [],
            currentHintIndex: 0,
            timeLeft: 60,
            gameTimer: null,
            hintTimer: null,
            usedWords: [], // 防重复机制
            aiEnabled: false, // AI功能状态
            aiMetrics: {}, // AI性能指标
            // 新增：历史记录相关
            gameHistory: [], // 本局游戏的答题历史
            gameStartTime: null, // 游戏开始时间
            questionStartTime: null, // 当前题目开始时间
            settlementCountdown: null // 结算页面倒计时
        };

        // 性能监控
        this.performance = {
            fps: 60,
            frameCount: 0,
            lastTime: performance.now(),
            memory: 0
        };

        // 缓存DOM元素
        this.elements = this.cacheElements();

        // 优化的词汇数据库
        this.wordDatabase = this.initializeWordDatabase();

        // 初始化本地存储管理器
        this.initLocalStorage();

        // 初始化AI题目生成器
        this.aiGenerator = new AIQuestionGenerator();
        this.loadingManager = new LoadingManager(this);
        this.errorHandler = new ErrorHandler(this);
        this.performanceMonitor = new PerformanceMonitor();
        this.initializeAI();

        // 事件处理器缓存
        this.eventHandlers = new Map();

        // 通知队列
        this.notificationQueue = [];
        this.isShowingNotification = false;
    }

    // 缓存DOM元素
    cacheElements() {
        const elements = {};
        const selectors = [
            'welcomeScreen', 'gameScreen', 'resultScreen', 'settlementScreen',
            'totalScore', 'streak', 'currentMode', 'currentDifficulty',
            'currentScore', 'timer', 'aiHint', 'hintLevel',
            'hintProgressBar', 'userInput', 'submitBtn', 'hintBtn',
            'skipBtn', 'exitGameBtn', 'guessHistory', 'clearHistoryBtn',
            'startGameBtn', 'playAgainBtn', 'backToMenuBtn',
            'finalScore', 'correctAnswers', 'accuracy', 'maxStreak',
            'loadingOverlay', 'loadingText', 'notificationContainer',
            'performanceMonitor', 'fps', 'memory', 'perfToggleBtn',
            // 结算页面元素
            'closeSettlementBtn', 'settlementScore', 'settlementCorrect',
            'settlementAccuracy', 'settlementStreak', 'settlementHistoryCount',
            'settlementHistoryList', 'countdownNumber', 'countdownProgress',
            // 个人记录元素
            'highScore', 'totalGames', 'bestStreak', 'overallAccuracy'
        ];

        selectors.forEach(id => {
            elements[id] = document.getElementById(id);
        });

        // 缓存按钮组
        elements.modeBtns = document.querySelectorAll('.mode-btn');
        elements.difficultyBtns = document.querySelectorAll('.difficulty-btn');

        return elements;
    };
    // 初始化词汇数据库（增强难度）
    initializeWordDatabase() {
        return {
            easy: {
                internet_culture: [
                    { word: '摸鱼', hints: ['上班时间偷懒的艺术', '老板不在时的快乐时光', '工作群里最怕听到的词', '打工人的日常技能', '划水的高级说法'] },
                    { word: '躺平', hints: ['年轻人的生活态度', '不内卷的选择', '佛系生活的代名词', '放弃努力的状态', '平躺着过日子'] },
                    { word: 'yyds', hints: ['网络流行缩写', '表示某样东西很厉害', '永远的神的拼音首字母', '夸赞时常用的网络用语', '四个字母的赞美'] },
                    { word: '干饭', hints: ['吃饭的网络说法', '打工人的快乐时光', '一日三次的重要任务', '美食博主的口头禅', '填饱肚子的行为'] },
                    { word: '冲浪', hints: ['网上闲逛的比喻', '在互联网上游荡', '刷手机的文艺说法', '网络世界的探索', '数字海洋中的漂流'] }
                ],
                daily_life: [
                    { word: '外卖', hints: ['懒人的救星', '手机下单送到家', '不想做饭的解决方案', '骑手小哥送的美食', '现代人的用餐方式'] },
                    { word: '熬夜', hints: ['年轻人的通病', '黑眼圈的制造者', '深夜不睡觉', '第二天困倦的原因', '夜猫子的日常'] },
                    { word: '追剧', hints: ['沙发上的娱乐活动', '一集接一集停不下来', '周末的快乐时光', '电视剧爱好者的行为', '熬夜的常见理由'] },
                    { word: '刷屏', hints: ['手机不离手的状态', '信息爆炸的体现', '社交媒体的魅力', '碎片时间的消磨', '现代人的习惯动作'] },
                    { word: '拼团', hints: ['省钱购物的方式', '集体消费的力量', '电商平台的营销手段', '朋友圈常见的邀请', '团结就是力量的体现'] }
                ],
                entertainment: [
                    { word: '吃瓜', hints: ['围观八卦的行为', '看热闹不嫌事大', '网络围观群众的代名词', '瓜子配茶看戏', '旁观者的快乐'] },
                    { word: '种草', hints: ['被安利某样东西', '购买欲被激发', '美妆博主的拿手好戏', '钱包的天敌', '消费冲动的源头'] },
                    { word: '拔草', hints: ['买到心仪的东西', '种草后的行动', '购物车清空的快感', '钱包变瘦的时刻', '消费欲望的满足'] }
                ]
            },
            medium: {
                pop_culture: [
                    { word: '破防', hints: ['心理防线被突破', '游戏术语转生活用语', '情感被触动的状态', '防御被击穿的感觉', '内心受到冲击'] },
                    { word: '内卷', hints: ['恶性竞争的代名词', '大家都在拼命努力', '竞争激烈的现象', '社会压力的体现', '人人都在加班的状态'] },
                    { word: '社死', hints: ['社会性死亡的简称', '尴尬到想找地缝钻进去', '在公共场合出丑', '羞耻感爆棚的时刻', '恨不得隐身的状态'] },
                    { word: '凡尔赛', hints: ['低调炫耀的艺术', '不经意间的显摆', '看似抱怨实则炫耀', '高级版的装逼', '贵族式的谦虚'] },
                    { word: 'emo', hints: ['情绪低落的状态', '年轻人的情感表达', '抑郁情绪的网络说法', '深夜发朋友圈的心情', '三个字母的忧郁'] }
                ],
                workplace: [
                    { word: '996', hints: ['加班文化的代表', '早九晚九每周六天', '打工人的噩梦', '工作时间的数字密码', '福报还是压榨的争议'] },
                    { word: 'PUA', hints: ['精神控制的手段', '职场霸凌的一种', '通过贬低来控制他人', '心理操控的技巧', '三个英文字母的缩写'] },
                    { word: '斜杠青年', hints: ['多重身份的年轻人', '不只有一份工作', '多元化发展的代表', '副业达人的称呼', '用符号分隔不同身份'] },
                    { word: '打工人', hints: ['上班族的自嘲称呼', '社畜的升级版', '为生活奔波的人', '早起晚归的代名词', '现代都市的主力军'] },
                    { word: '摆烂', hints: ['放弃治疗的状态', '破罐子破摔的心态', '不想努力的选择', '消极应对的方式', '躺平的进阶版'] }
                ],
                technology: [
                    { word: '直播带货', hints: ['新兴的销售模式', '网红经济的体现', '边看边买的购物方式', '主播推荐商品', '电商的新玩法'] },
                    { word: '短视频', hints: ['碎片化娱乐的载体', '15秒到几分钟的内容', '抖音快手的主要形式', '注意力经济的产物', '竖屏时代的宠儿'] },
                    { word: '云办公', hints: ['远程工作的方式', '疫情催生的工作模式', '在家上班的状态', '数字化办公的体现', '不用通勤的工作'] }
                ]
            },
            hard: {
                deep_internet: [
                    { word: '元宇宙', hints: ['虚拟世界的终极形态', '科技巨头争相布局的领域', '现实与虚拟的融合', '未来互联网的发展方向', '沉浸式数字体验空间'] },
                    { word: '数字游民', hints: ['不被地理位置束缚的工作者', '带着电脑环游世界', '远程办公的极致形态', '自由职业的新模式', '现代科技催生的生活方式'] },
                    { word: 'FOMO', hints: ['害怕错过的焦虑症', '社交媒体时代的心理现象', '四个英文字母的缩写', '看到别人精彩生活的不安', '错失恐惧症的英文简称'] },
                    { word: '算法推荐', hints: ['个性化内容分发', '大数据的应用场景', '你喜欢什么就推什么', '信息茧房的制造者', '用户画像的体现'] },
                    { word: '数字原住民', hints: ['从小接触数字技术的一代', '互联网时代的原生用户', '天生的科技达人', '数字化生活的践行者', 'Z世代的特征标签'] }
                ],
                social_phenomena: [
                    { word: '精神内耗', hints: ['内心的自我消耗', '想太多导致的疲惫', '心理能量的浪费', '过度思考的副作用', '现代人的心理困扰'] },
                    { word: '容貌焦虑', hints: ['对外表的过度担忧', '美颜滤镜时代的产物', '社交媒体带来的压力', '对自己长相的不满', '外貌标准化的心理影响'] },
                    { word: '信息茧房', hints: ['算法推荐的副作用', '只接收相似信息的状态', '认知局限的比喻', '个性化推送的陷阱', '思维被困在狭小空间'] },
                    { word: '注意力经济', hints: ['争夺用户时间的商业模式', '眼球就是金钱的体现', '互联网公司的核心逻辑', '碎片化时代的产物', '专注力成为稀缺资源'] },
                    { word: '数字鸿沟', hints: ['技术普及的不平等', '信息时代的新差距', '数字化进程中的分化', '科技发展的副作用', '接入能力的差异化'] }
                ]
            },
            expert: {
                cutting_edge: [
                    { word: 'Web3', hints: ['去中心化互联网的愿景', '区块链技术的应用场景', '用户拥有数据主权', '下一代互联网的概念', '数字经济的新范式'] },
                    { word: '碳中和', hints: ['环保目标的专业术语', '净零排放的状态', '气候变化的应对策略', '绿色发展的终极目标', '碳排放与吸收的平衡'] },
                    { word: '数字孪生', hints: ['现实世界的数字镜像', '物理实体的虚拟复制', '工业4.0的核心技术', '实时同步的数字模型', '预测性维护的基础'] },
                    { word: '量子霸权', hints: ['量子计算的里程碑', '超越经典计算机的能力', '计算领域的革命性突破', '科技竞争的新高地', '未来计算的制高点'] },
                    { word: '脑机接口', hints: ['大脑与计算机的直接连接', '思维控制设备的技术', '神经科学的前沿应用', '人机融合的终极形态', '意识与机器的桥梁'] }
                ],
                philosophical: [
                    { word: '后真相时代', hints: ['事实不如情感重要的时代', '信息爆炸带来的困惑', '真假难辨的信息环境', '观点比事实更有影响力', '客观性受到挑战的时期'] },
                    { word: '算法偏见', hints: ['人工智能的道德问题', '机器学习的公平性挑战', '数据中隐藏的歧视', '技术中性的质疑', 'AI决策的伦理困境'] },
                    { word: '技术奇点', hints: ['人工智能超越人类的时刻', '科技发展的临界点', '未来学的重要概念', '智能爆炸的起始', '人类历史的转折点'] },
                    { word: '数字永生', hints: ['意识上传的终极目标', '死亡的技术解决方案', '人类存在的数字化', '永恒生命的可能性', '哲学与科技的交汇'] },
                    { word: '赛博朋克', hints: ['高科技低生活的未来想象', '反乌托邦的科幻流派', '数字化社会的阴暗面', '技术与人性的冲突', '霓虹灯下的末世美学'] }
                ]
            }
        };
    }

    // 初始化AI生成器
    async initializeAI() {
        try {
            this.updateAIStatus('初始化中...', 'initializing');
            this.showLoading('正在初始化AI生成器...');
            
            // 使用本地题库作为回退方案
            const success = await this.aiGenerator.initialize(this.wordDatabase);
            
            if (success) {
                this.gameState.aiEnabled = true;
                this.updateAIStatus('AI在线', 'enabled');
                this.showNotification('AI生成器初始化成功！', 'success');
                console.log('AI生成器已启用');
            } else {
                this.gameState.aiEnabled = false;
                this.updateAIStatus('AI离线', 'disabled');
                this.showNotification('AI生成器初始化失败，将使用本地题库', 'warning');
                console.log('AI生成器初始化失败，使用本地题库');
            }
            
            this.hideLoading();
        } catch (error) {
            this.gameState.aiEnabled = false;
            this.updateAIStatus('AI错误', 'error');
            this.hideLoading();
            console.warn('AI初始化错误:', error);
        }
    }

    // 更新AI状态指示器
    updateAIStatus(text, status) {
        const aiStatusElement = document.getElementById('aiStatus');
        const aiStatusText = document.getElementById('aiStatusText');
        
        if (aiStatusElement && aiStatusText) {
            aiStatusText.textContent = text;
            aiStatusElement.className = `ai-status ${status}`;
        }
    }

    // 获取AI生成指标
    getAIMetrics() {
        if (this.aiGenerator) {
            return this.aiGenerator.getMetrics();
        }
        return {};
    }

    // 设置事件监听器
    setupEventListeners() {
        // 使用事件委托优化性能
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // 输入事件优化
        this.elements.userInput?.addEventListener('input', this.debounce(this.handleInput.bind(this), 300));
        
        // 窗口事件
        window.addEventListener('beforeunload', this.saveGameState.bind(this));
        window.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // 性能监控切换
        this.elements.perfToggleBtn?.addEventListener('click', this.togglePerformanceMonitor.bind(this));
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 统一点击事件处理
    handleClick(event) {
        const target = event.target.closest('button');
        if (!target) return;

        const action = target.id || target.dataset.action;
        const handlers = {
            'startGameBtn': () => this.startGame(),
            'submitBtn': () => this.submitAnswer(),
            'hintBtn': () => this.getNextHint(),
            'skipBtn': () => this.skipWord(),
            'exitGameBtn': () => this.exitGame(),
            'clearHistoryBtn': () => this.clearHistory(),
            'playAgainBtn': () => this.restartGame(),
            'backToMenuBtn': () => this.backToMenu(),
            'closeSettlementBtn': () => this.closeSettlement()
        };

        // 模式选择
        if (target.classList.contains('mode-btn')) {
            this.selectMode(target.dataset.mode);
            return;
        }

        // 难度选择
        if (target.classList.contains('difficulty-btn')) {
            this.selectDifficulty(target.dataset.difficulty);
            return;
        }

        const handler = handlers[action];
        if (handler) {
            event.preventDefault();
            handler();
        }
    }

    // 键盘事件处理
    handleKeydown(event) {
        if (this.gameState.currentScreen !== 'game') return;

        const keyHandlers = {
            'Enter': () => {
                if (event.target === this.elements.userInput) {
                    this.submitAnswer();
                }
            },
            'Escape': () => this.pauseGame(),
            'h': () => event.ctrlKey && this.getNextHint(),
            's': () => event.ctrlKey && this.skipWord()
        };

        const handler = keyHandlers[event.key];
        if (handler) {
            event.preventDefault();
            handler();
        }
    }

    // 输入处理
    handleInput(event) {
        const value = event.target.value.trim();
        if (value.length > 0) {
            this.elements.submitBtn.style.background = 'var(--success-color)';
        } else {
            this.elements.submitBtn.style.background = 'var(--primary-color)';
        }
    }

    // 页面可见性变化处理
    handleVisibilityChange() {
        if (document.hidden && this.gameState.isGameActive) {
            this.pauseGame();
        }
    }

    // 模式选择
    selectMode(mode) {
        this.gameState.mode = mode;
        this.elements.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    }

    // 难度选择
    selectDifficulty(difficulty) {
        this.gameState.difficulty = difficulty;
        this.elements.difficultyBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
        });
    }

    // 开始游戏
    async startGame() {
        this.showLoading('正在初始化游戏...');
        
        // 重置游戏状态
        this.resetGameState();
        
        // 切换到游戏界面
        await this.switchScreen('game');
        
        // 更新UI
        this.updateGameUI();
        
        // 生成第一个词汇
        await this.generateNewWord();
        
        // 开始计时器
        this.startTimer();
        
        this.hideLoading();
        this.gameState.isGameActive = true;
        
        // 加载个人记录
        this.loadPersonalRecords();
        
        this.showNotification('游戏开始！祝您好运！', 'success');
    }

    // 重置游戏状态
    resetGameState() {
        this.gameState.score = 0;
        this.gameState.streak = 0;
        this.gameState.totalQuestions = 0;
        this.gameState.correctAnswers = 0;
        this.gameState.timeLeft = this.getTimeLimit();
        this.gameState.currentHintIndex = 0;
        this.gameState.usedWords = []; // 清空已使用词汇列表
        // 重置历史记录
        this.gameState.gameHistory = [];
        this.gameState.gameStartTime = Date.now();
        this.gameState.questionStartTime = null;
        this.clearHistory();
    }

    // 获取时间限制
    getTimeLimit() {
        const timeLimits = {
            easy: 90,
            medium: 60,
            hard: 45,
            expert: 30
        };
        return timeLimits[this.gameState.difficulty] || 60;
    }

    // 更新游戏UI
    updateGameUI() {
        this.elements.currentMode.textContent = this.getModeDisplayName();
        this.elements.currentDifficulty.textContent = this.getDifficultyDisplayName();
        this.elements.currentScore.textContent = this.gameState.score;
        this.elements.totalScore.textContent = this.gameState.score;
        this.elements.streak.textContent = this.gameState.streak;
        this.elements.timer.textContent = this.gameState.timeLeft;
    }

    // 获取模式显示名称
    getModeDisplayName() {
        const names = {
            classic: '经典',
            challenge: '挑战'
        };
        return names[this.gameState.mode] || '经典';
    }

    // 获取难度显示名称
    getDifficultyDisplayName() {
        const names = {
            easy: '简单',
            medium: '中等',
            hard: '困难',
            expert: '专家'
        };
        return names[this.gameState.difficulty] || '中等';
    }

    // 生成新词汇（AI增强 + 防重复机制）
    async generateNewWord() {
        try {
            // 显示AI思考状态
            this.showAIThinking();
            
            let question = null;
            
            // 1. 优先尝试AI生成
            if (this.gameState.aiEnabled && this.aiGenerator) {
                try {
                    question = await this.aiGenerator.generateQuestion(
                        this.gameState.difficulty, 
                        this.gameState.usedWords
                    );
                    
                    if (question) {
                        console.log('AI生成题目成功:', question.word);
                        this.showNotification('AI为您生成了新题目！', 'success');
                    }
                } catch (error) {
                    console.warn('AI生成失败，使用本地题库:', error);
                    this.showNotification('AI生成失败，使用本地题库', 'warning');
                }
            }
            
            // 2. 回退到本地题库
            if (!question) {
                question = await this.generateFromLocalDatabase();
            }
            
            // 3. 设置题目
            if (question) {
                this.gameState.currentWord = question.word;
                this.gameState.currentHints = [...question.hints];
                this.gameState.currentHintIndex = 0;
                
                // 记录问题开始时间
                this.gameState.questionStartTime = Date.now();
                
                // 将当前词汇添加到已使用列表
                this.gameState.usedWords.push(question.word);
                
                // 根据难度调整提示数量
                this.adjustHintsByDifficulty();
                
                // 显示第一个提示
                this.displayCurrentHint();
            } else {
                throw new Error('无法生成题目');
            }
            
            this.hideLoading();
            
        } catch (error) {
            console.error('题目生成失败:', error);
            this.hideLoading();
            this.showNotification('题目生成失败，请重试', 'error');
        }
    }

    // 从本地数据库生成题目（回退方案）
    async generateFromLocalDatabase() {
        // 模拟思考时间
        await this.sleep(500 + Math.random() * 300);
        
        // 获取当前难度的所有词汇
        const allWords = this.getAllWordsForDifficulty(this.gameState.difficulty);
        
        // 过滤掉已使用的词汇
        const availableWords = allWords.filter(wordObj => 
            !this.gameState.usedWords.includes(wordObj.word)
        );
        
        // 如果所有词汇都用完了，重置已使用列表
        if (availableWords.length === 0) {
            this.gameState.usedWords = [];
            this.showNotification('题库已刷新，开始新一轮挑战！', 'info');
            return this.generateFromLocalDatabase(); // 递归调用
        }
        
        // 随机选择一个未使用的词汇
        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        return randomWord;
    }

    // 显示AI思考状态
    showAIThinking() {
        const messages = [
            'AI正在思考中...',
            '正在生成有趣的题目...',
            '创意正在路上...',
            'AI大脑正在运转...',
            '马上就好，请稍候...'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showLoading(randomMessage);
    }

    // 获取指定难度的所有词汇
    getAllWordsForDifficulty(difficulty) {
        const allWords = [];
        const categories = Object.keys(this.wordDatabase[difficulty]);
        
        categories.forEach(category => {
            const words = this.wordDatabase[difficulty][category];
            allWords.push(...words);
        });
        
        return allWords;
    }

    // 根据难度调整提示
    adjustHintsByDifficulty() {
        const hintCounts = {
            easy: 5,
            medium: 4,
            hard: 3,
            expert: 2
        };
        
        const maxHints = hintCounts[this.gameState.difficulty] || 4;
        if (this.gameState.currentHints.length > maxHints) {
            this.gameState.currentHints = this.gameState.currentHints.slice(0, maxHints);
        }
    }

    // 显示当前提示
    displayCurrentHint() {
        const hint = this.gameState.currentHints[this.gameState.currentHintIndex];
        this.elements.aiHint.textContent = hint;
        
        // 更新提示进度
        const progress = ((this.gameState.currentHintIndex + 1) / this.gameState.currentHints.length) * 100;
        this.elements.hintProgressBar.style.width = `${progress}%`;
        this.elements.hintLevel.textContent = `${this.gameState.currentHintIndex + 1}/${this.gameState.currentHints.length}`;
        
        // 添加打字机效果
        this.typewriterEffect(this.elements.aiHint, hint);
    }

    // 打字机效果
    async typewriterEffect(element, text) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.sleep(30);
        }
    }

    // 获取下一个提示
    getNextHint() {
        if (this.gameState.currentHintIndex >= this.gameState.currentHints.length - 1) {
            this.showNotification('已经是最后一个提示了！', 'warning');
            return;
        }
        
        this.gameState.currentHintIndex++;
        this.displayCurrentHint();
        
        // 使用提示会减少分数
        this.gameState.score = Math.max(0, this.gameState.score - this.getHintPenalty());
        this.updateGameUI();
        
        this.showNotification('获得新提示！', 'info');
    }

    // 获取提示惩罚分数
    getHintPenalty() {
        const penalties = {
            easy: 2,
            medium: 5,
            hard: 8,
            expert: 12
        };
        return penalties[this.gameState.difficulty] || 5;
    }

    // 提交答案
    submitAnswer() {
        const answer = this.elements.userInput.value.trim();
        if (!answer) {
            this.showNotification('请输入答案！', 'warning');
            return;
        }
        
        this.checkAnswer(answer);
        this.elements.userInput.value = '';
    }

    // 检查答案（增强算法）
    checkAnswer(answer) {
        const isCorrect = this.isAnswerCorrect(answer);
        
        this.gameState.totalQuestions++;
        
        // 记录答题历史
        this.addToGameHistory(answer, isCorrect, 'answer');
        this.addToHistory(answer, isCorrect);
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
        
        this.updateGameUI();
        
        // 生成下一个词汇
        setTimeout(() => {
            if (this.gameState.isGameActive) {
                this.generateNewWord();
            }
        }, 1500);
    }

    // 判断答案是否正确（模糊匹配）
    isAnswerCorrect(answer) {
        const target = this.gameState.currentWord.toLowerCase();
        const input = answer.toLowerCase();
        
        // 完全匹配
        if (input === target) return true;
        
        // 去除空格匹配
        if (input.replace(/\s/g, '') === target.replace(/\s/g, '')) return true;
        
        // 相似度匹配（针对专家难度）
        if (this.gameState.difficulty === 'expert') {
            return this.calculateSimilarity(input, target) > 0.8;
        }
        
        return false;
    }

    // 计算字符串相似度
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    // 计算编辑距离
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    // 处理正确答案
    handleCorrectAnswer() {
        this.gameState.correctAnswers++;
        this.gameState.streak++;
        this.gameState.maxStreak = Math.max(this.gameState.maxStreak, this.gameState.streak);
        
        const baseScore = this.getBaseScore();
        const streakBonus = this.getStreakBonus();
        const timeBonus = this.getTimeBonus();
        const hintPenalty = this.gameState.currentHintIndex * this.getHintPenalty();
        
        const totalScore = Math.max(0, baseScore + streakBonus + timeBonus - hintPenalty);
        this.gameState.score += totalScore;
        
        this.showNotification(`🎉 正确！+${totalScore}分`, 'success');
        
        // 连击特效
        if (this.gameState.streak >= 3) {
            this.showStreakEffect();
        }
    }

    // 获取基础分数
    getBaseScore() {
        const baseScores = {
            easy: 10,
            medium: 20,
            hard: 35,
            expert: 50
        };
        return baseScores[this.gameState.difficulty] || 20;
    }

    // 获取连击奖励
    getStreakBonus() {
        return Math.min(this.gameState.streak * 5, 50);
    }

    // 获取时间奖励
    getTimeBonus() {
        const timeLimit = this.getTimeLimit();
        const timeUsed = timeLimit - this.gameState.timeLeft;
        const maxBonus = this.getBaseScore() * 0.5;
        
        if (timeUsed < timeLimit * 0.3) {
            return Math.floor(maxBonus);
        } else if (timeUsed < timeLimit * 0.6) {
            return Math.floor(maxBonus * 0.5);
        }
        return 0;
    }

    // 显示连击特效
    showStreakEffect() {
        const effect = document.createElement('div');
        effect.className = 'streak-effect';
        effect.innerHTML = `🔥 ${this.gameState.streak}连击！`;
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            font-weight: bold;
            color: #f59e0b;
            z-index: 9999;
            animation: streakPop 1s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1000);
    }

    // 处理错误答案
    handleIncorrectAnswer() {
        this.gameState.streak = 0;
        this.showNotification(`❌ 错误！答案是"${this.gameState.currentWord}"`, 'error');
    }

    // 跳过词汇
    skipWord() {
        this.gameState.totalQuestions++;
        this.gameState.streak = 0;
        
        // 记录跳过到游戏历史
        this.addToGameHistory('(跳过)', false, 'skip');
        this.addToHistory('(跳过)', false);
        
        this.showNotification(`⏭️ 已跳过！答案是"${this.gameState.currentWord}"`, 'info');
        
        setTimeout(() => {
            if (this.gameState.isGameActive) {
                this.generateNewWord();
            }
        }, 1500);
    }

    // 添加到历史记录
    addToHistory(answer, isCorrect) {
        const historyItem = document.createElement('div');
        historyItem.className = `guess-item ${isCorrect ? 'correct' : 'incorrect'}`;
        historyItem.innerHTML = `
            <span class="guess-text">${answer}</span>
            <span class="guess-result">
                <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
                ${isCorrect ? '正确' : '错误'}
            </span>
        `;
        
        this.elements.guessHistory.insertBefore(historyItem, this.elements.guessHistory.firstChild);
        
        // 限制历史记录数量
        const items = this.elements.guessHistory.children;
        if (items.length > 10) {
            this.elements.guessHistory.removeChild(items[items.length - 1]);
        }
    }

    // 清空历史记录
    clearHistory() {
        this.elements.guessHistory.innerHTML = '';
    }

    // 开始计时器
    startTimer() {
        this.gameState.gameTimer = setInterval(() => {
            this.gameState.timeLeft--;
            this.elements.timer.textContent = this.gameState.timeLeft;
            
            // 时间警告
            if (this.gameState.timeLeft <= 10) {
                this.elements.timer.style.color = 'var(--error-color)';
                this.elements.timer.style.animation = 'pulse 0.5s infinite';
            }
            
            if (this.gameState.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    // 暂停游戏
    pauseGame() {
        if (!this.gameState.isGameActive) return;
        
        this.gameState.isPaused = !this.gameState.isPaused;
        
        if (this.gameState.isPaused) {
            clearInterval(this.gameState.gameTimer);
            this.showNotification('游戏已暂停', 'info');
        } else {
            this.startTimer();
            this.showNotification('游戏继续', 'info');
        }
    }

    // 结束游戏
    endGame() {
        this.gameState.isGameActive = false;
        clearInterval(this.gameState.gameTimer);
        
        // 显示结算页面而不是结果页面
        this.showSettlement();
        this.switchScreen('settlement');
    }

    // 显示游戏结果
    showGameResult() {
        const accuracy = this.gameState.totalQuestions > 0 
            ? Math.round((this.gameState.correctAnswers / this.gameState.totalQuestions) * 100)
            : 0;
        
        this.elements.finalScore.textContent = this.gameState.score;
        this.elements.correctAnswers.textContent = this.gameState.correctAnswers;
        this.elements.accuracy.textContent = `${accuracy}%`;
        this.elements.maxStreak.textContent = this.gameState.maxStreak;
        
        // 根据表现显示不同图标和标题
        const resultIcon = this.elements.resultIcon;
        const resultTitle = document.getElementById('resultTitle');
        
        if (accuracy >= 80) {
            resultIcon.className = 'fas fa-trophy result-icon';
            resultIcon.style.color = 'var(--warning-color)';
            resultTitle.textContent = '优秀表现！';
        } else if (accuracy >= 60) {
            resultIcon.className = 'fas fa-medal result-icon';
            resultIcon.style.color = 'var(--primary-color)';
            resultTitle.textContent = '不错的成绩！';
        } else {
            resultIcon.className = 'fas fa-heart result-icon';
            resultIcon.style.color = 'var(--error-color)';
            resultTitle.textContent = '继续努力！';
        }
    }

    // 重新开始游戏
    restartGame() {
        this.startGame();
    }

    // 返回主菜单
    backToMenu() {
        this.switchScreen('welcome');
        this.gameState.isGameActive = false;
        clearInterval(this.gameState.gameTimer);
    }

    // 切换界面
    async switchScreen(screenName) {
        const screens = ['welcome', 'game', 'result', 'settlement'];
        
        screens.forEach(screen => {
            const element = this.elements[`${screen}Screen`];
            if (element) {
                if (screen === screenName) {
                    element.classList.remove('hidden');
                    this.gameState.currentScreen = screen;
                } else {
                    element.classList.add('hidden');
                }
            }
        });
        
        // 焦点管理
        if (screenName === 'game') {
            setTimeout(() => this.elements.userInput?.focus(), 100);
        }
    }

    // 显示加载状态
    showLoading(text = '加载中...', options = {}) {
        if (this.loadingManager) {
            this.loadingManager.show(text, options);
        } else {
            // 回退到原始方法
            this.elements.loadingText.textContent = text;
            this.elements.loadingOverlay.classList.remove('hidden');
        }
    }

    // 隐藏加载状态
    hideLoading() {
        if (this.loadingManager) {
            this.loadingManager.hide();
        } else {
            // 回退到原始方法
            this.elements.loadingOverlay.classList.add('hidden');
        }
    }

    // 显示AI思考状态
    showAIThinking() {
        if (this.loadingManager) {
            this.loadingManager.showAIThinking(this.gameState.difficulty);
        } else {
            this.showLoading('AI正在思考中...');
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        this.notificationQueue.push({ message, type });
        if (!this.isShowingNotification) {
            this.processNotificationQueue();
        }
    }

    // 处理通知队列
    async processNotificationQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }
        
        this.isShowingNotification = true;
        const { message, type } = this.notificationQueue.shift();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;
        
        this.elements.notificationContainer.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                this.processNotificationQueue();
            }, 300);
        }, 3000);
    }

    // 保存游戏状态
    saveGameState() {
        const saveData = {
            score: this.gameState.score,
            maxStreak: this.gameState.maxStreak,
            totalQuestions: this.gameState.totalQuestions,
            correctAnswers: this.gameState.correctAnswers,
            difficulty: this.gameState.difficulty,
            mode: this.gameState.mode
        };
        
        localStorage.setItem('aiWordMasterSave', JSON.stringify(saveData));
    }

    // 加载游戏状态
    loadGameState() {
        const saveData = localStorage.getItem('aiWordMasterSave');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                // 只加载统计数据，不恢复游戏进度
                this.elements.totalScore.textContent = data.score || 0;
            } catch (e) {
                console.warn('Failed to load game state:', e);
            }
        }
    }

    // 初始化性能监控
    initializePerformanceMonitoring() {
        this.startPerformanceMonitoring();
    }

    // 开始性能监控
    startPerformanceMonitoring() {
        const updatePerformance = () => {
            this.performance.frameCount++;
            const now = performance.now();
            const delta = now - this.performance.lastTime;
            
            if (delta >= 1000) {
                this.performance.fps = Math.round((this.performance.frameCount * 1000) / delta);
                this.performance.frameCount = 0;
                this.performance.lastTime = now;
                
                // 更新内存使用（如果支持）
                if (performance.memory) {
                    this.performance.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
                }
                
                // 更新显示
                this.updatePerformanceDisplay();
            }
            
            requestAnimationFrame(updatePerformance);
        };
        
        requestAnimationFrame(updatePerformance);
    }

    // 更新性能显示
    updatePerformanceDisplay() {
        if (this.elements.fps) {
            this.elements.fps.textContent = this.performance.fps;
        }
        if (this.elements.memory) {
            this.elements.memory.textContent = `${this.performance.memory}MB`;
        }
    }

    // 切换性能监控显示
    togglePerformanceMonitor() {
        this.elements.performanceMonitor.classList.toggle('hidden');
    }

    // 工具函数：延迟
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 添加到游戏历史记录
    addToGameHistory(answer, isCorrect, type = 'answer') {
        if (!this.gameState.questionStartTime) {
            this.gameState.questionStartTime = Date.now();
        }
        
        const timeSpent = Math.round((Date.now() - this.gameState.questionStartTime) / 1000);
        const hintsUsed = this.gameState.currentHintIndex;
        
        const historyItem = {
            questionNumber: this.gameState.totalQuestions + 1,
            question: this.gameState.currentWord.hint,
            answer: answer,
            correctAnswer: this.gameState.currentWord.word,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            hintsUsed: hintsUsed,
            type: type,
            timestamp: Date.now()
        };
        
        this.gameState.gameHistory.push(historyItem);
    }

    // 显示结算页面
    showSettlement() {
        const accuracy = this.gameState.totalQuestions > 0 
            ? Math.round((this.gameState.correctAnswers / this.gameState.totalQuestions) * 100)
            : 0;
        
        // 更新结算统计
        this.elements.settlementScore.textContent = this.gameState.score;
        this.elements.settlementCorrect.textContent = this.gameState.correctAnswers;
        this.elements.settlementAccuracy.textContent = `${accuracy}%`;
        this.elements.settlementStreak.textContent = this.gameState.maxStreak;
        
        // 更新历史记录
        this.renderSettlementHistory();
        
        // 开始倒计时
        this.startSettlementCountdown();
    }

    // 渲染结算历史记录
    renderSettlementHistory() {
        const historyList = this.elements.settlementHistoryList;
        const historyCount = this.elements.settlementHistoryCount;
        
        historyCount.textContent = `共${this.gameState.gameHistory.length}题`;
        historyList.innerHTML = '';
        
        this.gameState.gameHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'settlement-history-item';
            
            const statusClass = item.type === 'skip' ? 'skipped' : (item.isCorrect ? 'correct' : 'incorrect');
            const statusIcon = item.type === 'skip' ? 'fa-forward' : (item.isCorrect ? 'fa-check' : 'fa-times');
            
            historyItem.innerHTML = `
                <div class="history-item-number">${item.questionNumber}</div>
                <div class="history-item-content">
                    <div class="history-item-question">${item.question}</div>
                    <div class="history-item-answer">
                        <span class="user-answer ${statusClass}">${item.answer}</span>
                        ${!item.isCorrect && item.type !== 'skip' ? `<span class="correct-answer">正确答案：${item.correctAnswer}</span>` : ''}
                    </div>
                    <div class="history-item-meta">
                        <span class="time-spent">${item.timeSpent}s</span>
                        <span class="hints-used">${item.hintsUsed}次提示</span>
                    </div>
                </div>
                <div class="history-item-status ${statusClass}">
                    <i class="fas ${statusIcon}"></i>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }

    // 开始结算倒计时
    startSettlementCountdown() {
        let countdown = 5;
        const countdownElement = this.elements.settlementCountdown;
        
        countdownElement.textContent = `${countdown}秒后返回`;
        
        const countdownTimer = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownElement.textContent = `${countdown}秒后返回`;
            } else {
                clearInterval(countdownTimer);
                this.closeSettlement();
            }
        }, 1000);
        
        // 保存计时器引用以便手动关闭时清除
        this.gameState.settlementTimer = countdownTimer;
    }

    // 关闭结算页面
    closeSettlement() {
        // 清除倒计时
        if (this.gameState.settlementTimer) {
            clearInterval(this.gameState.settlementTimer);
            this.gameState.settlementTimer = null;
        }
        
        // 保存游戏记录到本地存储
        this.saveGameRecord();
        
        // 清空游戏历史记录
        this.gameState.gameHistory = [];
        
        // 返回主界面
        this.switchScreen('welcome');
        this.showNotification('已返回主界面', 'info');
    }

    // 退出游戏
    exitGame() {
        if (confirm('确定要退出当前游戏吗？')) {
            // 停止计时器
            if (this.gameState.gameTimer) {
                clearInterval(this.gameState.gameTimer);
            }
            
            // 清空游戏历史记录
            this.gameState.gameHistory = [];
            
            // 重置游戏状态
            this.gameState.isGameActive = false;
            
            // 返回主界面
            this.switchScreen('welcome');
            this.showNotification('已退出游戏', 'info');
        }
    }

    // 本地存储管理器
    initLocalStorage() {
        this.localStorageManager = {
            // 保存游戏记录
            saveRecord: (record) => {
                try {
                    const records = this.getRecords();
                    records.push(record);
                    
                    // 只保留最近100条记录
                    if (records.length > 100) {
                        records.splice(0, records.length - 100);
                    }
                    
                    localStorage.setItem('wordmaster_records', JSON.stringify(records));
                    this.updatePersonalRecords();
                } catch (error) {
                    console.warn('保存游戏记录失败:', error);
                }
            },
            
            // 获取所有记录
            getRecords: () => {
                try {
                    const records = localStorage.getItem('wordmaster_records');
                    return records ? JSON.parse(records) : [];
                } catch (error) {
                    console.warn('读取游戏记录失败:', error);
                    return [];
                }
            },
            
            // 获取统计数据
            getStats: () => {
                const records = this.getRecords();
                if (records.length === 0) {
                    return {
                        highestScore: 0,
                        totalGames: 0,
                        maxStreak: 0,
                        totalAccuracy: 0
                    };
                }
                
                const highestScore = Math.max(...records.map(r => r.score));
                const totalGames = records.length;
                const maxStreak = Math.max(...records.map(r => r.maxStreak));
                const totalCorrect = records.reduce((sum, r) => sum + r.correctAnswers, 0);
                const totalQuestions = records.reduce((sum, r) => sum + r.totalQuestions, 0);
                const totalAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
                
                return {
                    highestScore,
                    totalGames,
                    maxStreak,
                    totalAccuracy
                };
            }
        };
    }

    // 获取记录（简化访问）
    getRecords() {
        return this.localStorageManager.getRecords();
    }

    // 保存游戏记录
    saveGameRecord() {
        const record = {
            score: this.gameState.score,
            correctAnswers: this.gameState.correctAnswers,
            totalQuestions: this.gameState.totalQuestions,
            maxStreak: this.gameState.maxStreak,
            mode: this.gameState.mode,
            difficulty: this.gameState.difficulty,
            timestamp: Date.now(),
            date: new Date().toLocaleDateString()
        };
        
        this.localStorageManager.saveRecord(record);
    }

    // 更新个人记录显示
    updatePersonalRecords() {
        const stats = this.localStorageManager.getStats();
        
        if (this.elements.highestScore) {
            this.elements.highestScore.textContent = stats.highestScore;
        }
        if (this.elements.totalGames) {
            this.elements.totalGames.textContent = stats.totalGames;
        }
        if (this.elements.personalMaxStreak) {
            this.elements.personalMaxStreak.textContent = stats.maxStreak;
        }
        if (this.elements.totalAccuracy) {
            this.elements.totalAccuracy.textContent = `${stats.totalAccuracy}%`;
        }
    }

    // 加载个人记录
    loadPersonalRecords() {
        this.updatePersonalRecords();
    }
}

// 添加连击特效样式
const streakStyle = document.createElement('style');
streakStyle.textContent = `
    @keyframes streakPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(streakStyle);

// 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
    const game = new OptimizedWordMaster();
    
    // 加载保存的游戏状态
    game.loadGameState();
    
    // 全局错误处理
    window.addEventListener('error', (event) => {
        console.error('Game error:', event.error);
        game.showNotification('游戏出现错误，请刷新页面', 'error');
    });
    
    // 性能警告
    setTimeout(() => {
        if (game.performance.fps < 30) {
            game.showNotification('检测到性能问题，建议关闭其他应用', 'warning');
        }
    }, 5000);
});

// 导出游戏类（用于测试）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedWordMaster;
}

