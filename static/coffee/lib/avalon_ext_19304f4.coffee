avalon.filters.txt2html = $.txt2html



$.fn.ajax_submit = (url, view, callback, failed) ->
    form = this[0]
    if form.tagName == "FORM"
        form = $ form
    else
        form = $(form).parents('form')
    form[0].errtip = errtip = form[0].errtip or $.errtip(form)
    form.find('input').each(->
        @value = @value
    )
    submit = form.find('input[type=submit]')

    disable = 'ui-button-disable'
    submit.addClass(disable)
    o = view.o
    $.postJSON1 url, o.$model or o, (r) ->
        submit.removeClass(disable)
        errtip.reset()
        if r.err
            errtip.set(r.err)
            failed?(r.err)
        else
            callback r
    return false


window.V = avalon.vmodels

window.View = (id, o, view)->
    o['$id'] = id
    v = avalon.define o
    avalon.scan()
    view?(v)
    v
