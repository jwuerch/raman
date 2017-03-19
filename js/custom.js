(function($) {
    var HelloWorldDevs = function() {

    };

    HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
        var $form = $(form);
        $form.submit(function(e) {
            e.preventDefault();
            var formData = $form.serialize();
            var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule';
            $('.form-error').remove();
            $.ajax({
                type: 'POST',
                url: formAction,
                data: formData,
                dataType: 'json',
                encode: true
            }).done(function (response) {
                $form.replaceWith($(success_msg).html());
            }).error(function (response) {
                var $error_list = $('<ul>');
                if(response.responseJSON == undefined) {
                    $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
                } else {
                    $.each(response.responseJSON, function(key, value) {
                        $error_list.append($('<li>').text(value));
                    });
                }
                $form.before('<div class="form-error"></div>');
                $('.form-error').html($error_list).fadeIn();
            });
        });
    };

    // $('#smile-gallery-modal').on('shown.bs.modal', function() {
    //     setTimeout(function() {
    //         $('#oc-portfolio-3').show();
    //     }, 1500)
    // });
    var HWD = new HelloWorldDevs();
    HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

    $('.mobile-primary-menu a').click(function () {
        if ($('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
            $('ul.mobile-primary-menu').toggleClass("show");
        }
    });

    $('#more-services #oc-portfolio-2').owlCarousel({
        navigation:true,
        margin: 40,
        loop: true,
        dots:false,
        autoplay:true,
        autoplaySpeed:1000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items:1,
                nav:true
            },
            481:{
                items:2,
                nav:true
            },
            768:{
                items:3,
                nav:true
            },
            1200:{
                items:4,
                nav:true
            }
        },
        navText: ["<img src='images/triangle-left.png' alt='triangle-left'>","<img src='images/triangle-right.png' alt='triangle-right'>"]
    });
})(jQuery);