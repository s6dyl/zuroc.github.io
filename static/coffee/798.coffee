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

clientWidth = document.documentElement.clientWidth
if clientWidth < 414
    scale = (clientWidth/414).toFixed(3)
else
    scale = 1
document.querySelector("meta[name=viewport]").setAttribute(
    'content',
    "width=device-width, initial-scale=#{scale}, maximum-scale=#{scale}, user-scalable=0"
)

current_user = AV.User.current()
current_user?.fetch()
require_async "798/login#{!!current_user-0}"





