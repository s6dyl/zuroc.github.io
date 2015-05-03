require.css "798/login0", ->
    body = $('body').hide().html("<div id=\"particles-js\"></div><div id=\"_798\"><div class=\"head vc2\"><div class=\"vc1\"><div class=\"vc0\"><h1>797.SPACE</h1><h2>打造你自己的垂直社区</h2><h3><span>&nbsp;</span></h3><div class=\"bar\"><a data-wow-delay=\"1s\" href=\"javascript:$$('SSO/auth.new');void(0)\" class=\"ui primary button wow bounceInRight\">注册</a><a data-wow-delay=\"1s\" href=\"javascript:$$('SSO/auth.login');void(0)\" class=\"ui basic button wow bounceInLeft\">登录</a></div></div></div></div></div>")
    setTimeout(
        ->
            body.show()
            _798 = $("#_798")

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
        5000
    )
    require_async(
        "/lib/particles"
        ->



            win = $ window
            win_size = win.height() * win.width()
            win_point_base= parseInt(win_size/22000)
            particlesJS('particles-js', {
              particles: {
                color: '#fff',
                color_random: false,
                shape: 'circle', # "circle", "edge" or "triangle"
                opacity: {
                  opacity: .3,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0,
                    sync: false
                  }
                },
                size: 2.5,
                size_random: true,
                nb: win_point_base*3,
                line_linked: {
                  enable_auto: true,
                  distance: 130,
                  color: '#fff',
                  opacity: .7,
                  width: 1,
                  condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                  }
                },
                anim: {
                  enable: true,
                  speed: 1
                }
              },
              interactivity: {
                enable: true,
                mouse: {
                  distance: 250
                },
                detect_on: 'canvas', # "canvas" or "window"
                mode: 'grab', # "grab" of false
                line_linked: {
                  opacity: .5
                },
                events: {
                  onclick: {
                    enable: true,
                    mode: 'push', # "push" or "remove"
                    nb: 4
                  },
                  onresize: {
                    enable: true,
                    mode: 'out', # "out" or "bounce"
                    density_auto: false,
                    density_area: 800 # nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
                  }
                }
              },
              retina_detect: true
            })
    
    )

