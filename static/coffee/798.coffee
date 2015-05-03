###
@require /css/798.css
###
$ ->
    NProgress.done()

width = $(window).width()
min_width=414
if width<min_width
    document.write("""<style>body{zoom:#{(width/415).toFixed(4)}</style>""")

current_user = AV.User.current()
src=""

if current_user
    current_user.fetch()
    src = "/static/modules/798/login1.js"
else
    src = "/static/modules/798/login0.js"

document.write("""<script src="#{src}"></script><script>require("798/login#{!!current_user-0}")</script>""")




