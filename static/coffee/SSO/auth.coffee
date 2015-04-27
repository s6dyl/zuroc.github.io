$.SSO.auth = {
    login : ->
        self = $("""
<form class="ui basic modal" style="height:100%;" id="SsoAuthLogin">
<style>
#SsoAuthLogin .login{
margin-top:3em;color:#9C847F
}
#SsoAuthLogin .login a{
color:#9C847F
}
#SsoAuthLogin .login a:hover{
color:#fff;
padding-bottom:5px;
border-bottom:2px solid #fff;
}
</style>
<i class="close icon"></i>
<div class="vc2"><div class="vc1"><div style="max-width:600px;margin:auto">
<div class="content">
    <div class="description ui form">
        <div class="field">
            <input spellcheck="false" autocomplete="off"><label>邮箱</label>
        </div>
    </div>
</div>
<div class="one fluid ui inverted buttons">
    <button class="ui green ok basic inverted button" type="submit">
        创建账号 
    </button>
    <div class="login">
        已经注册 ？<a href="javascript:$$('SSO/auth.login');void(0)">点此登录</a>
    </div>
</div>
</div>
</div></div>
<input type="submit" class="hideSubmit">
</form>
""").modal({
        closable: false
        # allowMultiple:true
        dimmerSettings:{
            template : {
                dimmer: ->
                    return $('<div>').attr('class', 'ui dimmer red')
            }
        }
        onHidden:->
            @parentNode.remove()
        }).modal('show')
    new : (url)->
        alert 'new'
    logout : (url) ->
        $.cookie.set({S:0},{expires:-1})
        location.reload()
}
