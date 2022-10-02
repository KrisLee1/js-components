function Slideshow(containerSelector, imgBoxSelector) {
    this.imgBox = document.querySelector(imgBoxSelector);
    this.subscribers = [];
    this.currIndex = 1;

    const container = document.querySelector(containerSelector);
    const firstImg = this.imgBox.firstElementChild.cloneNode(true);
    const lastImg = this.imgBox.lastElementChild.cloneNode(true);
    const width = this.imgBox.clientWidth;

    this.imgBox.appendChild(firstImg);
    this.imgBox.insertBefore(lastImg, this.imgBox.firstElementChild);
    this.imgBox.style.transform = `translateX(-${width * this.currIndex}px)`;
    
    let passiveIfSupported = false;
    try {
        window.addEventListener("test", null,
            Object.defineProperty(
                {},
                "passive",
                {
                    get() { passiveIfSupported = { passive: true }; }
                }
            )
        );
    } catch (err) {}

    container.addEventListener('mouseenter', () => this.stopPlay());
    container.addEventListener('mouseleave', () => this.isAutoPlay && this.autoPlay(this.autoPlayInterval));
    
    container.addEventListener('touchstart', (e) => {
        this.startX = e.targetTouches[0].pageX;
        this.stopPlay();
    }, passiveIfSupported);

    container.addEventListener('touchend', (e) => {
        this.isAutoPlay && this.autoPlay(this.autoPlayInterval)
        const x = e.changedTouches[0].pageX;
        const moveX = Math.floor(this.startX - x) * 2;
        if(moveX > width) {
            this.next();
        }else if(moveX < - width){
            this.pre();
        }else{
            this.imgBox.style.transform = `translateX(-${width * this.currIndex}px)`;
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        const x = e.changedTouches[0].pageX;
        const moveX = Math.floor(this.startX - x);
        this.imgBox.style.transform = `translateX(-${width * this.currIndex + moveX}px)`;
    }, passiveIfSupported);
    
    return this;
}

Slideshow.prototype.skipTo = throttled(function(index) {
    if(index == this.currIndex) return;
    const imgNum = this.imgBox.childElementCount - 2;
    const width = this.imgBox.clientWidth;

    index %= imgNum + 2;
    let targetIndex = index;
    

    if(index < 1 || index > imgNum) {
        targetIndex = index < 1 ? imgNum : 1;
        setTimeout(() => {
            this.imgBox.style.transitionDuration = '0s';
            this.imgBox.style.transform = `translateX(-${width * targetIndex}px)`;
        }, 500);
    }
    this.changedIndex(this.currIndex, targetIndex);
    this.currIndex = targetIndex;
    this.imgBox.style.transitionDuration = '.5s';
    this.imgBox.style.transform = `translateX(-${width * index}px)`;
}, 500);

Slideshow.prototype.pre = function() {
    this.skipTo(this.currIndex - 1);
}

Slideshow.prototype.next = function() {
    this.skipTo(this.currIndex + 1);
}

Slideshow.prototype.autoPlay = function(interval = 3000) {
    this.isAutoPlay = true;
    this.autoPlayInterval = interval;
    if(!this.timer) {
        this.timer = setInterval(() => {
            this.next();
        }, interval);
    }
}

Slideshow.prototype.stopPlay = function() {
    if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
}

Slideshow.prototype.addWidgets = function(...widgets) {
    widgets.forEach((widget) => {
        widget.call(this);
    });
    return this;
}

Slideshow.prototype.changedIndex = function(oldIndex, newIndex) {
    this.subscribers.forEach((subscriber) => {
        subscriber(oldIndex, newIndex);
    });
}

Slideshow.prototype.addSubscribers = function(...funcs) {
    this.subscribers.push(...funcs);
}

function SlideshowNavigator(selector) {
    const navBox = document.querySelector(selector);

    function change(currIndex, targetIndex) {
        const currNavBtn = navBox.children[currIndex - 1];
        const targetNavBtn = navBox.children[targetIndex - 1];
        currNavBtn.classList.remove('current');
        targetNavBtn.classList.add('current');
    }

    return function() {
        this.addSubscribers(change);
        navBox.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            index && this.skipTo(index);
        });
    }
}

function SlideshowPre(selector) {
    const preBtn = document.querySelector(selector);

    return function() {
        preBtn.addEventListener('click', () => this.pre());
    }
}

function SlideshowNext(selector) {
    const nextBtn = document.querySelector(selector);
    
    return function() {
        nextBtn.addEventListener('click', () => this.next());
    }
}