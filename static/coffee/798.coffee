###
@require /lib/wow.js
@require /lib/jquery.lettering.js
@require /lib/jquery.textillate.js
@require /lib/jquery.typed.js
@require /css/798.css
@require /css/_base/typed.css
###
$ ->
    NProgress.done()
    _798 = $("#_798").show()


    _798.find('h1').textillate({ in: { effect: 'bounceInDown'}})
    setTimeout(
        ->
            _798.find('h2').css('visibility','visible').textillate({ in: { effect: 'rollIn'} })
            setTimeout(
                ->
                    h3 = _798.find("h3").css('visibility','visible')
                    h3.find("span").typed({
                        strings: ["创建独一无二的博客、论坛 和 SNS 就是如此简单"]
                        typeSpeed: 100
                    })
                1000
            )
        1600
    )
    new WOW().init()




