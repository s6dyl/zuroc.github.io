###
@require /css/798.css
###
$ ->
    NProgress.done()



current_user = AV.User.current()
src=""

if current_user
    current_user.fetch()
    src = "/static/modules/798/login1.js"
else
    src = "/static/modules/798/login0.js"

document.write("""<script src="#{src}"></script><script>require("798/login#{!!current_user-0}")</script>""")




