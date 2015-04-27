#_buffer = []
$.modal_alert = (html, option={}) ->
    if html.indexOf("<") == -1
        html = "<h1>#{$.txt2html(html)}</h1>"

    option.closable = option.closable or false
    $.modal("""<div class="ui basic modal">#{html}<div class="actions">
<div class="one fluid ui inverted buttons">
<div class="ui green ok basic inverted button">
<i class="checkmark icon"></i>
我知道了
</div>
</div>
</div>
</div>""", option)


$.modal = (html,  option, id,  callback)->
    if id
        html = $ "<div>#{html}</div>"
        html.attr("ms-view",id)
    option = option or {}
    real = option.onHidden

    onHidden = ->
        $(@parentNode).remove()
        if id and id in V
            delete V[id]
       # alert html.html()

    if real
        option.onHidden = ->
            real.apply @
            onHidden.apply @
    else
        option.onHidden = onHidden

    elem = $(html)
#    option.queue
#    if not option.allowMultiple
#        while 1
#            p = _buffer.pop()
#            if p
#                p.modal('remove')
#            else
#                break
#    _buffer.push elem
    show = ->
        elem.modal(option).modal('show')

        if id and callback
            r = callback(elem)
            if $.isArray(r)
                [o, view] = r
            else
                o = r
                view = undefined
            View(
                id,
                o,
                view
            )
        
    if not option.allowMultiple
        ui = $(".ui.modal")
        if ui.length
            ui.modal('hide all', show)
        else
            show()



