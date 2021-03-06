$(document).ready(function($) {
    awe_backtotop();
    awe_category();

    $(window).on('load resize', function() {
        resizeImage();
    });

    function resizeImage() {
        setTimeout(function() {
            $('.product-block-item:not(.viewed)').each(function() {
                var thumbset = $(this).find('.product-transition');
                thumbset.css({
                    'height': thumbset.width() + 'px'
                });
            })
        }, 200);
    }

    $('#trigger-mobile').click(function() {
        $("#nav").toggleClass('active');
        $(this).toggleClass('active');
    });
    $('.plus-nClick1').click(function(e) {
        e.preventDefault();
        $(this).parents('.has-childs').toggleClass('opened');
        $(this).parents('.has-childs').children('ul').slideToggle(100);
        $(this).parents('.has-childs').children('.mega-content').slideToggle(100);
    });
    $('.plus-nClick2').click(function(e) {
        e.preventDefault();
        $(this).parents('.has-childs2').toggleClass('opened');
        $(this).parents('.has-childs2').children('ul').slideToggle(100);
    });
    $('.plus-nClick3').click(function(e) {
        e.preventDefault();
        $(this).parents('.evo-mega-level1').toggleClass('opened');
        $(this).parents('.evo-mega-level1').children('.evo-mega-level2').slideToggle(100);
    });
    $('.nd-header-cart').click(function() {
        $(".cart-sidebar").toggleClass('active');
        $(".backdrop__body-backdrop___1rvky").addClass('active');
    });
    $('.backdrop__body-backdrop___1rvky, .cart_btn-close').click(function() {
        $("body").removeClass('show-search');
        $(".cart-sidebar").removeClass('active');
        $(".popup-cart-mobile").removeClass('active');
        $(".backdrop__body-backdrop___1rvky").removeClass('active');
    });
    $(".backdrop__body-backdrop___1rvky").removeClass('active');
    $('.ng-has-child1 a .svg1').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1').find('.ul-has-child1').stop().slideToggle();
        $(this).toggleClass('active');
        return false;
    });
    $('.ng-has-child1 .ul-has-child1 .ng-has-child2 a .svg2').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1 .ul-has-child1 .ng-has-child2').find('.ul-has-child2').stop().slideToggle();
        $(this).toggleClass('active');
        return false;
    });
    if ($('.cart_body>div').length == '0') {
        $('.cart-footer').hide();
        jQuery('<div class="cart-empty">' +
            '<span class="empty-icon"><i class="ico ico-cart"></i></span>' +
            '<div class="btn-cart-empty">' +
            '<a class="btn btn-default" href="/" title="Ti???p t???c mua h??ng">Ti???p t???c mua h??ng</a>' +
            '</div>' +
            '</div>').appendTo('.cart_body');
    };
    $(".rte table").wrap("<div class='table-responsive'></div>");
    if ($('.addThis_listSharing').length > 0) {
        $(window).scroll(function() {
            if (jQuery(window).scrollTop() > 100) {
                jQuery('.addThis_listSharing').addClass('is-show');
            } else {
                jQuery('.addThis_listSharing').removeClass('is-show');
            }
        });
    };
});
$(document).ready(function() {
    $('.middle-header .nd-header-search-form input[type="text"]').bind('focusin focusout', function(e) {
        $(this).closest('.nd-searchs').toggleClass('focus', e.type == 'focusin');
    });
    var preLoadLoadGif = $('<div class="spinner-border text-primary" role="status"></div>');
    var searchTimeoutThrottle = 500;
    var searchTimeoutID = -1;
    var currReqObj = null;
    var $resultsBox = $('<div class="results-box"><div class="search-results"></div></div>').appendTo('.nd-search, .nd-searchs');
    $('.middle-header .nd-header-search-form input[type="text"]').bind('keyup change', function() {
        if ($(this).val().length > 1 && $(this).val() != $(this).data('oldval')) {
            $(this).data('oldval', $(this).val());
            if (currReqObj != null) currReqObj.abort();
            clearTimeout(searchTimeoutID);
            var $form = $(this).closest('form');
            var term = 'name:(*' + $form.find('input[name="query"]').val() + '*)';
            var linkURL = $form.attr('action') + '?query=' + term + '&type=product';
            $resultsBox.find('.search-results').html('<div class="nd-loading"><div class="spinner-border text-primary" role="status"></div></div>');
            searchTimeoutID = setTimeout(function() {
                currReqObj = $.ajax({
                    url: $form.attr('action'),
                    async: false,
                    data: {
                        type: 'product',
                        view: 'json',
                        q: term
                    },
                    dataType: 'json',
                    success: function(data) {
                        currReqObj = null;
                        if (data.results_total == 0) {
                            $resultsBox.find('.search-results').html('<div class="note">Kh??ng c?? k???t qu??? t??m ki???m</div>');
                        } else {
                            $resultsBox.find('.search-results').empty();
                            $.each(data.results, function(index, item) {
                                var xshow = 'wholesale';
                                if (!(item.title.toLowerCase().indexOf(xshow) > -1)) {
                                    var $row = $('<a class="clearfix"></a>').attr('href', item.url).attr('title', item.title);
                                    $row.append('<div class="img"><img src="' + item.thumb + '" /></div>');
                                    $row.append('<div class="d-title">' + item.title + '</div>');
                                    $row.append('<div class="d-title d-price">' + item.price + '</div>');
                                    $resultsBox.find('.search-results').append($row);
                                }
                            });
                            $resultsBox.find('.search-results').append("<a href='" + linkURL + "' class='note' title='Xem t???t c???'>Xem t???t c???</a>");
                        }
                    }
                });
            }, searchTimeoutThrottle);
        } else if ($(this).val().length <= 1) {
            $resultsBox.find('.search-results').empty();
        }
    }).attr('autocomplete', 'off').data('oldval', '').bind('focusin', function() {
        $resultsBox.fadeIn(200);
    }).bind('click', function(e) {
        e.stopPropagation();
    });
    $('body').bind('click', function() {
        $resultsBox.fadeOut(200);
    });
    $('.nd-search-form').on('submit', function(e) {
        e.preventDefault();
        var term = 'name:(*' + $(this).find('input[name="query"]').val() + '*)';
        var linkURL = $(this).attr('action') + '?query=' + term + '&type=product';
        window.location = linkURL;
    });
    var wDWs = $(window).width();
    if (wDWs < 767) {
        $('.close-menu, .opacity_menu').on('click', function() {
            $('.list_menu').removeClass('current');
            $('.opacity_menu').removeClass('current');
        })
        $('.title-menu').on('click', function() {
            $('.list_menu').addClass('current');
            $('.opacity_menu').addClass('current');
        })

        $('.footer-click h4').click(function(e) {
            $(this).toggleClass('current');
            $(this).next('div').toggleClass("current");
        });
        $('.item_big li .fa').click(function(e) {
            if ($(this).hasClass('current')) {
                $(this).closest('ul').find('li, .fa').removeClass('current');
            } else {
                $(this).closest('ul').find('li, .fa').removeClass('current');
                $(this).closest('li').addClass('current');
                $(this).addClass('current');
            }
        });

    }


});
$(document).on('click', '.overlay, .close-popup, .btn-continue, .fancybox-close', function() {
    hidePopup('.awe-popup');
    setTimeout(function() {
        $('.loading').removeClass('loaded-content');
    }, 500);
    return false;
})

function awe_showNoitice(selector) {
    $(selector).animate({
        right: '0'
    }, 500);
    setTimeout(function() {
        $(selector).animate({
            right: '-300px'
        }, 500);
    }, 3500);
}
window.awe_showNoitice = awe_showNoitice;

function awe_showLoading(selector) {
    var loading = $('.loader').html();
    $(selector).addClass("loading").append(loading);
}
window.awe_showLoading = awe_showLoading;

function awe_hideLoading(selector) {
    $(selector).removeClass("loading");
    $(selector + ' .loading-icon').remove();
}
window.awe_hideLoading = awe_hideLoading;

function awe_showPopup(selector) {
    $(selector).addClass('active');
}
window.awe_showPopup = awe_showPopup;

function awe_hidePopup(selector) {
    $(selector).removeClass('active');
}
window.awe_hidePopup = awe_hidePopup;

function awe_convertVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}
window.awe_convertVietnamese = awe_convertVietnamese;

function awe_category() {
    $('.nav-category .Collapsible__Plus').click(function(e) {
        $(this).parent().toggleClass('active');
    });
}
window.awe_category = awe_category;

function awe_backtotop() {
    if ($('.back-to-top').length) {
        var scrollTrigger = 100,
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.back-to-top').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('.back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}
window.awe_backtotop = awe_backtotop;
$('.btn-close').click(function() {
    $(this).parents('.dropdown').toggleClass('open');
});
$(document).on('keydown', '#qty, #quantity-detail, .number-sidebar, .number-phone', function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});
var buy_now = function(id) {
    var quantity = 1;
    var params = {
        type: 'POST',
        url: '/cart/add.js',
        data: 'quantity=' + quantity + '&variantId=' + id,
        dataType: 'json',
        success: function(line_item) {
            window.location = '/checkout';
        },
        error: function(XMLHttpRequest, textStatus) {
            Bizweb.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
}





var SuccessNoti = function(SuccessText) {
    $.notify({
        // options
        title: '<strong>Tuy???t v???i</strong><br>',
        message: SuccessText,
        icon: 'glyphicon glyphicon-ok'
    }, {
        // settings
        element: 'body',
        //position: null,
        type: "success",
        //allow_dismiss: true,
        //newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 3300,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutRight'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
    });
}
var InfoNoti = function(InfoText) {
    $.notify({
        // options
        title: '<strong>Th??ng b??o</strong><br>',
        message: InfoText,
        icon: 'glyphicon glyphicon-info-sign',
    }, {
        // settings
        element: 'body',
        position: null,
        type: "info",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 3300,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
    });
}
var ErrorNoti = function(ErrorText) {
    $.notify({
        // options
        title: '<strong>Th??ng b??o</strong><br',
        message: ErrorText,
        icon: 'glyphicon glyphicon-info-sign',
    }, {
        // settings
        element: 'body',
        position: null,
        type: "warning",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 3300,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
    });
}
$('.section_product .title-links .btn-more-cate').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.parents('.section_product .title-links').find('.block-cate').stop().slideToggle();
    $(this).toggleClass('active')
    return false;
});