// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏交互
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // 切换导航菜单
            nav.classList.toggle('nav-active');
            
            // 动画链接
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // 汉堡按钮动画
            burger.classList.toggle('toggle');
        });
    }
    
    // 婚礼倒计时
    const weddingDate = new Date('2025-09-21T11:00:00+08:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // 计算天、时、分、秒
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 更新DOM元素
        if(document.getElementById('days')) {
            document.getElementById('days').textContent = String(days).padStart(2, '0');
        }
        if(document.getElementById('hours')) {
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        }
        if(document.getElementById('minutes')) {
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        }
        if(document.getElementById('seconds')) {
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        // 如果倒计时结束
        if (distance < 0) {
            clearInterval(countdownTimer);
            if(document.getElementById('countdown')) {
                document.getElementById('countdown').innerHTML = "<div class='time-block'><span>婚礼进行中</span></div>";
            }
        }
    }
    
    // 立即更新一次倒计时
    updateCountdown();
    
    // 设置每秒更新一次倒计时
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // 页面滚动动画
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 页面滑动功能
    setupPageScrolling();
});

// 添加汉堡菜单动画类
function toggleBurger() {
    const burger = document.querySelector('.burger');
    burger.classList.toggle('toggle');
}

// 设置页面滑动功能
function setupPageScrolling() {
    // 获取所有页面链接
    const pageLinks = document.querySelectorAll('.nav-links a');
    const pages = Array.from(pageLinks).map(link => link.getAttribute('href'));
    
    // 当前页面索引
    let currentPageIndex = 0;
    // 当前页面URL
    const currentPageURL = window.location.pathname.split('/').pop() || 'index.html';
    // 查找当前页面在页面数组中的索引
    currentPageIndex = pages.findIndex(page => page === currentPageURL);
    if (currentPageIndex === -1) currentPageIndex = 0;
    
    // 滚动监听
    let isScrolling = false;
    let lastScrollTop = 0;
    let scrollTimeout;
    
    // 添加滚动指示器到每个页面
    if (document.querySelector('.hero') || document.querySelector('.page-section')) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        
        // 判断是否是最后一页
        if (currentPageIndex === pages.length - 1) {
            scrollIndicator.classList.add('back-to-home');
            scrollIndicator.title = '返回首页';
        } else {
            scrollIndicator.title = '滑动到下一页';
        }
        
        document.querySelector('.hero') ? 
            document.querySelector('.hero').appendChild(scrollIndicator) : 
            document.querySelector('.page-section').appendChild(scrollIndicator);
        
        scrollIndicator.addEventListener('click', function() {
            if (currentPageIndex === pages.length - 1) {
                // 最后一页，点击返回首页
                navigateToPage('index.html');
            } else if (currentPageIndex < pages.length - 1) {
                // 不是最后一页，点击进入下一页
                navigateToPage(pages[currentPageIndex + 1]);
            }
        });
    }
    
    window.addEventListener('scroll', function(e) {
        if (isScrolling) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 检查是否滚动到底部
        if (scrollTop + windowHeight >= documentHeight - 50) {
            // 向下滚动并且在页面底部
            if (scrollTop > lastScrollTop) {
                if (currentPageIndex === pages.length - 1) {
                    // 如果是最后一页，返回首页
                    isScrolling = true;
                    navigateToPage('index.html');
                } else if (currentPageIndex < pages.length - 1) {
                    isScrolling = true;
                    navigateToPage(pages[currentPageIndex + 1]);
                }
            }
        }
        // 检查是否滚动到顶部
        else if (scrollTop <= 0) {
            // 向上滚动并且在页面顶部
            if (scrollTop < lastScrollTop && currentPageIndex > 0) {
                isScrolling = true;
                navigateToPage(pages[currentPageIndex - 1]);
            }
        }
        
        lastScrollTop = scrollTop;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 1000);
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            if (currentPageIndex === pages.length - 1) {
                // 如果是最后一页，返回首页
                navigateToPage('index.html');
            } else if (currentPageIndex < pages.length - 1) {
                navigateToPage(pages[currentPageIndex + 1]);
            }
        } else if (e.key === 'ArrowUp' && currentPageIndex > 0) {
            navigateToPage(pages[currentPageIndex - 1]);
        }
    });
    
    // 触摸滑动支持
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        if (Math.abs(swipeDistance) > 50) { // 至少滑动50px才触发
            if (swipeDistance > 0) {
                if (currentPageIndex === pages.length - 1) {
                    // 如果是最后一页，返回首页
                    navigateToPage('index.html');
                } else if (currentPageIndex < pages.length - 1) {
                    // 向上滑动，转到下一页
                    navigateToPage(pages[currentPageIndex + 1]);
                }
            } else if (swipeDistance < 0 && currentPageIndex > 0) {
                // 向下滑动，转到上一页
                navigateToPage(pages[currentPageIndex - 1]);
            }
        }
    }
    
    // 导航到指定页面
    function navigateToPage(page) {
        window.location.href = page;
    }
} 