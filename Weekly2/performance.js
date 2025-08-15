// 性能监控模块
class PerformanceTracker {
    constructor() {
        this.metrics = {
            fps: 60,
            memory: 0,
            frameCount: 0,
            lastTime: performance.now()
        };
        this.isMonitoring = false;
        this.animationId = null;
    }

    // 开始监控
    start() {
        this.isMonitoring = true;
        this.updateMetrics();
    }

    // 停止监控
    stop() {
        this.isMonitoring = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    // 更新性能指标
    updateMetrics() {
        if (!this.isMonitoring) return;

        const now = performance.now();
        const delta = now - this.metrics.lastTime;
        
        if (delta >= 1000) {
            this.metrics.fps = Math.round((this.metrics.frameCount * 1000) / delta);
            this.metrics.frameCount = 0;
            this.metrics.lastTime = now;
            
            // 更新内存使用（如果支持）
            if (performance.memory) {
                this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            }
            
            // 更新UI显示
            this.updateDisplay();
        }
        
        this.metrics.frameCount++;
        this.animationId = requestAnimationFrame(() => this.updateMetrics());
    }

    // 更新显示
    updateDisplay() {
        const fpsElement = document.getElementById('fps');
        const memoryElement = document.getElementById('memory');
        
        if (fpsElement) {
            fpsElement.textContent = this.metrics.fps;
        }
        
        if (memoryElement) {
            memoryElement.textContent = `${this.metrics.memory}MB`;
        }
    }

    // 获取当前指标
    getMetrics() {
        return { ...this.metrics };
    }
}

// 全局性能监控实例
window.performanceTracker = new PerformanceTracker();

// 自动启动监控
document.addEventListener('DOMContentLoaded', () => {
    window.performanceTracker.start();
});

