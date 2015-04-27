$.txt2html = (txt)->
    r = []
    for i in txt.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")
        r.push($.escape i)
    return "<p>" + (r.join("</p><p>")) + "</p>"

window.devicePixelRatio = window.devicePixelRatio or 1



$.extend({
    escape : (txt) -> $('<div/>').text(txt).html()
})


$( document ).ajaxError ->
      $.modal_alert '<h1><p>出错了 !</p><p><a href=".">点此这里</a> 刷新页面试试？</p></h1>'



