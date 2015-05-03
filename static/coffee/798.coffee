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

width = $(window).width()
min_width=414
if width<min_width
    document.write("""<style>body{zoom:#{(width/415).toFixed(4)}</style>""")

current_user = AV.User.current()
current_user?.fetch()
src="798/login#{!!current_user-0}"



document.write("""<script src="/static/modules/#{src}.js"></script><script>require("#{src}")</script>""")




