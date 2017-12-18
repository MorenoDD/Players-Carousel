(function($) {

    var $mddShare = $('#mdd-share'),
        $mddShareOpen = $('#mdd-share--open'),
        $mddShareClose = $('#mdd-share--close'),
        $mddShareLayer = $('#mdd-share--layer');

    $mddShareOpen.on('click', function(){
        $mddShare.addClass('in');
        return false;
    });

    $mddShareClose.on('click', function(){
        $mddShare.removeClass('in');
        return false;
    });

    $mddShareLayer.find('.md-share').on('click', function(){
        window.open(jQuery(this).attr('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });
    
    var $window = $(window),
        $playersCarousel = $('#players-carousel'),
        $currentPlayer = $playersCarousel.find('.nav a').eq(0).data('player'),
        $newPlayer = false,
        $playerName = false,
        $playerLastName = false,
        $navClass = false,
        $isRotating = false;

    function _setCircle(){
        var $length;

        if($window.width() >= $window.height()){
            $length = $window.width();
        } else {
            $length = $window.height();
        }

        $playersCarousel.find('.circle').css({
            width: $length,
            height: $length,
            left: -$length*.5,
            top: -($length - $window.height())*.5
        });

        $playersCarousel.find('.slide').css({
            width: $length,
            height: $length,
            right: -$length*.5,
            top: -($length - $window.height())*.5
        });

        $playersCarousel.find('.player').css({
            height: $window.height()
        });
    }
    $window.resize(function(){
        _setCircle();
    }).trigger('resize');



    $playersCarousel.find('.nav a').on('click', function(){
        if(!$isRotating){
            $isRotating = true;
            $playersCarousel.addClass('rotate');
            $newPlayer = $(this).data('player');
            $playerName = $(this).data('name');
            $playerLastName = $(this).data('lastname');
            $navClass = $(this).data('nav');

            if($newPlayer !== $currentPlayer){

                setTimeout(function(){
                    $playersCarousel.removeClass($currentPlayer).addClass($newPlayer);
                    $playersCarousel.find('h2').html($playerName+'<br />'+$playerLastName);
                    $playersCarousel.find('.player img').attr('src', 'assets/images/'+$newPlayer+'.png');
                    $playersCarousel.find('.nav').removeClass().addClass('nav '+$navClass);
                    $currentPlayer = $newPlayer;
                }, 400);

                setTimeout(function(){
                    $playersCarousel.removeClass('rotate');
                    $isRotating = false;
                }, 1200);

            }
        }
    });

})(jQuery);