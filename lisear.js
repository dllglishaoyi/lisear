;(function($, window, document, undefined) {

    "use strict";
    var Lisear = function(element, options) {

        this.$element = $(element);
        this.options = options;

        // self-reference
        var self = this;

        var $input = this.$element.find("input");
        this.$input = $input;
        this.$list = this.$element.children(".lisear-list");
        $input.on('input', function($e){
            // console.log($(this).val());
            var text = $(this).val();
            if (options.dataSourceUrl) {
                $.getJSON(options.dataSourceUrl+"?keyword="+text, function(data){
                  self.showKeywords(data);
                });
            }else if(options.dataSource && options.dataSource instanceof Array){
                var dataSource = options.dataSource.filter(function(item) {
                    return text && item.indexOf(text) > -1;
                });
                self.showKeywords(dataSource);
            }
        });

        $input.on('search', function($e){
            var text = $(this).val();
            window.location.href = self.options.targetUrl+"?keyword="+text;
        });

        // trigger init event
        this.$element.trigger('init');

    };
    // class prototype definition
    Lisear.prototype = {
        getKeywords:function(keyword){
            alert(keyword);
        },
        sayhello:function(){
            alert("hello");
        },
        showKeywords:function(keywords){
            var $list = this.$list;
            var targetUrl = this.options.targetUrl;
            if ( keywords instanceof Array ) {
                // console.log(keywords);
                // $list
                $list.empty();
                keywords.forEach(function(keyword){
                    $list.append('<li class="lisear-list-item"><a href="'+targetUrl+"?keyword="+keyword+'">'+keyword+'</a></li>')
                });
            };
        }
    }

    // plugin definition
    $.fn.lisear = function(option) {

        var lisearArgs = arguments;
        // for each matched element
        return this.each(function() {
            var $this = $(this),
                options = $.extend({}, $.fn.lisear.defaults, $.isPlainObject(option) ? option : {}),
                action = typeof option == 'string' ? option : option.lisear,
                lisear = this._lisear,
                args = option.args || (lisearArgs.length > 1 && Array.prototype.slice.call(lisearArgs, 1));
            if (!lisear) {
                lisear = new Lisear(this, options);
            }
            if (action) {
                // with arguments
                if (args) looper[action].apply(lisear, lisear.length ? args : ('' + args).split(','));
                // without arguments
                else lisear[action]();
            }
        });
    };

    // default options
    $.fn.lisear.defaults = {

    };

    // constructor
    $.fn.lisear.Constructor = Lisear;

})(Zepto || jQuery, window, document);