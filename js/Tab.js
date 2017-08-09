(function($){

    var Tab = function(id,data_config){
        var _this = this;
        //默认配置参数
        this.config = {
            "invoke"      : 1,
            "auto"        : false,
            "effect"      : "fade",
            "triggerType" : "mouseover"
        };
        //扩展配置参数
        if(data_config&&data_config!==""){
            $.extend(this.config,data_config);
        }
        var config = this.config;

        //获取DOM元素
        this.tab_nav   = $(id).find(".tab-nav li");
        this.tab_panel = $(id).find(".tab-panel");
        this.length    = this.tab_nav.length;

        if(config.triggerType === "click"){
            //绑定hover事件
            this.tab_nav.hover(function() {
                $(this).addClass('nav-hover');
            }, function() {
                $(this).removeClass('nav-hover');
            });
            //绑定click事件
            this.tab_nav.click(function() {
                _this.switchover($(this));
            });
        }else{
            this.tab_nav.mouseover(function() {
                $(this).css('cursor', 'pointer');
                _this.switchover($(this));
            });
        }

        //设置自动播放
        if(config.auto > 0){
            //计数器
            this.loop  = 0;
            //计时器
            this.timer = null;

            this.auto_play();

            $(id).hover(function() {
                window.clearInterval(_this.timer);
            }, function() {
                _this.auto_play();
            });
        }

        //设置默认tan_nav
        if(config.invoke>1 && config.invoke<this.length){
            this.switchover(this.tab_nav.eq(config.invoke-1));
        }

    };

    Tab.prototype = {

        auto_play:function(){
            var _this   = this;
            var config  = this.config;
            var tab_len = this.length;
            var tab_nav = this.tab_nav;

            this.timer=window.setInterval(function(){
                _this.loop++;
                if (_this.loop >= tab_len) {
                    _this.loop = 0;
                }

                if(config.triggerType !== "click") {
                    tab_nav.eq(_this.loop).trigger('mouseover');
                    tab_nav.eq(_this.loop).trigger('mouseout');
                }else{
                    tab_nav.eq(_this.loop).trigger('click');
                }
            },config.auto);
        },


        switchover:function(current_item){
            //记录当前导航的下标
            var index = current_item.index();
            //导航的切换
            current_item.addClass('active').siblings().removeClass('active');
            //内容的切换
            var effect    = this.config.effect;
            var tab_panel = this.tab_panel;

            if(effect === "fade"){
                tab_panel.eq(index).fadeIn().siblings('.tab-panel').fadeOut();
            }else{
                tab_panel.eq(index).addClass("current").siblings('.tab-panel').removeClass("current");
            }

            //把loop设置为当前tab_nav的index
            this.loop = index;
        }
    };

    window.Tab = Tab;
})(jQuery);
