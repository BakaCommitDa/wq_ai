// 性能监控模块
class PerformanceTracker {
    constructor() {
        this.metrics = {
            fps: 60,
            memory: 0,
            loadTime: 0
        };
        this.isEnabled = false;
    }

    enable() {
        this.isEnabled = true;
        this.startTracking();
    }

    disable() {
        this.isEnabled = false;
    }

    startTracking() {
        if (!this.isEnabled) return;
        
        // FPS 监控
        let lastTime = performance.now();
        let frameCount = 0;
        
        const trackFPS = () => {
            if (!this.isEnabled) return;
            
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                this.metrics.fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                this.updateDisplay();
            }
            
            requestAnimationFrame(trackFPS);
        };
        
        requestAnimationFrame(trackFPS);
        
        // 内存监控
        if (performance.memory) {
            setInterval(() => {
                if (!this.isEnabled) return;
                this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
                this.updateDisplay();
            }, 1000);
        }
    }

    updateDisplay() {
        const fpsElement = document.getElementById('fps');
        const memoryElement = document.getElementById('memory');
        
        if (fpsElement) fpsElement.textContent = this.metrics.fps;
        if (memoryElement) memoryElement.textContent = `${this.metrics.memory}MB`;
    }
}

// 全局性能追踪器
window.performanceTracker = new PerformanceTracker();

