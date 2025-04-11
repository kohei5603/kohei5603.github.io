// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const heroText = document.querySelector('.hero p');
    const logo = document.querySelector('.logo');
    const heroTitle = document.getElementById('hero-title');
    
    // ヒーロータイトルの位置とサイズを計算するための変数
    let heroTitleRect;
    let headerLogoRect;
    let documentScrolled = false;
    
    // 初期ロード時の位置を記録
    function recordInitialPositions() {
        if (heroTitle) {
            heroTitleRect = heroTitle.getBoundingClientRect();
        }
        if (logo) {
            headerLogoRect = logo.getBoundingClientRect();
        }
    }
    
    // ウィンドウサイズが変わった時のために位置を更新
    window.addEventListener('resize', recordInitialPositions);
    
    // ページロード後に実行
    window.addEventListener('load', function() {
        recordInitialPositions();
        startImageSlideshow();
    });
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });
    
    // ヘッダーのロゴアニメーション関数
    function animateHeaderLogo(scrollY) {
        const heroSectionHeight = window.innerHeight * 0.4; // ヒーローセクションの40%をスクロールしたらアニメーション開始
        const scrollProgress = Math.min(1, Math.max(0, scrollY / heroSectionHeight));
        
        if (scrollY > 100 && !documentScrolled) {
            documentScrolled = true;
            if (logo) {
                logo.classList.add('visible');
            }
        } else if (scrollY <= 100 && documentScrolled) {
            documentScrolled = false;
            if (logo) {
                logo.classList.remove('visible');
            }
        }
        
        // ヒーロータイトルのフェードアウト
        if (heroTitle) {
            const opacity = Math.max(0, 1 - scrollProgress * 2);
            const scale = Math.max(0.5, 1 - scrollProgress * 0.5);
            const translateY = scrollProgress * 20;
            
            heroTitle.style.opacity = opacity;
            heroTitle.style.transform = `translateY(-${translateY}px) scale(${scale})`;
        }
    }
    
    // スクロール時にヘッダーのスタイルを変更し、ヒーローテキストとタイトルをアニメーション
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            if (header) {
                header.classList.add('scrolled');
            }
            
            // ヒーローテキストのフェードアウト
            if (heroText) {
                heroText.style.opacity = Math.max(0, 1 - scrollY / 300);
                heroText.style.transform = `translateY(-${Math.min(30, scrollY / 10)}px)`;
            }
            
            // ヘッダーロゴとヒーロータイトルのアニメーション
            animateHeaderLogo(scrollY);
            
        } else {
            if (header) {
                header.classList.remove('scrolled');
            }
            
            // ヒーローテキストの復元
            if (heroText) {
                heroText.style.opacity = 1;
                heroText.style.transform = 'translateY(0)';
            }
            
            // ヒーロータイトルの復元
            if (heroTitle) {
                heroTitle.style.opacity = 1;
                heroTitle.style.transform = 'translateY(0) scale(1)';
            }
            
            // ヘッダーロゴアニメーション
            animateHeaderLogo(scrollY);
        }
    });
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 画像スライドショー機能
    function startImageSlideshow() {
        const featureSections = document.querySelectorAll('.feature-section');
        
        featureSections.forEach(section => {
            const images = section.querySelectorAll('.feature-img');
            if (images.length === 0) return;
            
            let currentIndex = 0;
            
            // 最初の画像をアクティブに
            images[0].classList.add('active');
            
            // 5秒ごとに画像を切り替え
            setInterval(() => {
                // 現在の画像を非アクティブに
                images[currentIndex].classList.remove('active');
                
                // 次の画像のインデックスを計算
                currentIndex = (currentIndex + 1) % images.length;
                
                // 次の画像をアクティブに
                images[currentIndex].classList.add('active');
            }, 5000);
        });
    }
    
    // アニメーション効果の追加
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-text, .gallery-item, .price-card, .section-title');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初期スタイルを設定
    const setupAnimation = () => {
        const elements = document.querySelectorAll('.feature-text, .gallery-item, .price-card, .section-title');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // 初回実行
        animateOnScroll();
    };
    
    setupAnimation();
    
    // スクロール時にアニメーション実行
    window.addEventListener('scroll', animateOnScroll);
});
