modal = (html, color, id, callback)->
    $.modal(
        html
        {
            dimmerClassName : 'form '+color
        }
        id
        callback
    )

$.SSO.auth = {
    new : ->
        self = modal(
            "<style>#SsoAuthLogin .login {\n  margin-top: 3em;\n  color: #9C847F; }\n\n  #SsoAuthLogin .login a {\n    color: #9C847F; }\n\n    #SsoAuthLogin {\n      height: 100%; }\n\n      #SsoAuthLogin .login a:hover {\n        color: #fff;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #fff; }\n\n        #SsoAuthLogin .content {\n          max-width: 600px;\n          margin: auto; }</style><i class=\"close icon\"></i><form ms-submit=\"submit\" id=\"SsoAuthLogin\"><div class=\"vc2\"><div class=\"vc1\"><div class=\"content\"><div class=\"description ui form\"><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.username\" name=\"username\"><label>昵称</label></div><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.phone\" name=\"phone\"><label>手机</label></div><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.email\" name=\"email\"><label>邮箱</label></div><div class=\"field\"><input autocomplete=\"off\" ms-duplex=\"o.password\" type=\"password\" ms-duplex=\"o.password\" name=\"password\"><label>密码</label></div><div class=\"one fluid ui inverted buttons\"><button type=\"submit\" class=\"ui green ok basic inverted button\">创建账号</button></div><div class=\"login\">已经注册 ？<a href=\"javascript:$$('SSO/auth.login');void(0)\">点此登录</a></div></div></div></div></div><input type=\"submit\" class=\"hideSubmit\"></form>"
            "red"
            "ssoAuthNew"
            (elem)->
                error_tip = $.error_tip(elem)
                m = {
                    o:{
                        email:""
                        phone:""
                        username:""
                        password:""
                    }
                    submit : ->
                        AV.Cloud.run "SSO.auth.new", m.o, {
                            success: (user) ->
                                console.log user
                                $.modal_alert """<h1><p>激活邮件已发送到 <a target="_blank" href="http://#{d.o.mail.split('@')[1]}">#{$.escape d.o.mail}</a></p><p>请查收邮箱以完成注册。</p><p>没有收到邮件？<a href="javascript:$$('SSO/mail_resend');void(0)">点此重新发送</a></p></h1>"""
                            fail: (error) ->
                                error_tip.set error
                        }
                        false
                }
        )
    login: (url)->
        self = modal(
            "<style>#SsoAuthLogin .login {\n  margin-top: 3em;\n  color: #9C847F; }\n\n  #SsoAuthLogin .login a {\n    color: #9C847F; }\n\n    #SsoAuthLogin {\n      height: 100%; }\n\n      #SsoAuthLogin .login a:hover {\n        color: #fff;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #fff; }\n\n        #SsoAuthLogin .content {\n          max-width: 600px;\n          margin: auto; }</style><i class=\"close icon\"></i><form ms-submit=\"submit\" id=\"SsoAuthLogin\"><div class=\"vc2\"><div class=\"vc1\"><div class=\"content\"><div class=\"description ui form\"><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.username\" placeholder=\"请输入您的 昵称 或 手机 或 邮箱\"><label>账号</label></div><div class=\"field\"><input autocomplete=\"off\" ms-duplex=\"o.password\" type=\"password\" ms-duplex=\"o.password\"><label>密码</label></div><div class=\"one fluid ui inverted buttons\"><button type=\"submit\" class=\"ui green ok basic inverted button\">开始使用</button></div><div class=\"login\">没有账号 ？<a href=\"javascript:$$('SSO/auth.new');void(0)\">点此注册</a></div></div></div></div></div><input type=\"submit\" class=\"hideSubmit\"></form>"
            "green"
            "ssoAuthLogin"
            (elem)->
                d = {
                    o:{
                        account:""
                    }
                    submit:0
                }
                return [
                    d
                    (v)->
                        v.submit = (v)->
                            alert 3
                            return false
                ]
        )
    logout : (url) ->
        $.cookie.set({S:0},{expires:-1})
        location.reload()
}
