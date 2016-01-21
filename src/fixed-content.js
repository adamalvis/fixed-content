/*
 * 
 * 
 *
 * Copyright (c) 2016 Adam Alvis
 * Licensed under the MIT license.
 */
(function ($) {
  
    $.fn.fixedContent = function ( options ) {
      
        var elem = $(this),
            initialOffset = (function () {
                return elem.offset().top
            })(),

            DEFAULTS = {
                'container': elem.closest('section'),
                padding: true,

            },
            settings = $.extend({}, DEFAULTS, options),

            offset = (function () {
                var obj = {
                    top: 0,
                    bottom: 0,
                };

                if( settings.padding ) {
                    obj.top += parseInt( settings.container.css('padding-top') );
                    obj.bottom += parseInt( settings.container.css('padding-bottom') );
                }

                return obj;
            })();

        elem.css({
            'position': 'relative',
        });

        function setTrigger () {

            if ( afterTrigger() && beforeStop() ) {
                updatePosition();
            }

            if ( !afterTrigger() && beforeStop() ) {
                elem.css({
                    top: '0px',
                });
            }

            if( afterTrigger() && !beforeStop() ) {
                elem.css({
                    top: (settings.container.height() - elem.height()),
                });
            }

        }

        function updatePosition () {

            elem.css({
                top: ($(window).scrollTop() - initialOffset) + offset.top,
            });

        }

        function afterTrigger () {
            return $(window).scrollTop() > (initialOffset - offset.top);
        }

        function beforeStop () {
            return $(window).scrollTop() < (initialOffset + settings.container.height()) - (offset.bottom + elem.height());
        }

        // start scroll loop
        $(window).scroll(function () {
            setTrigger();
        });
    };

}(jQuery));
