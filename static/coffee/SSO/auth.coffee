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
            "<style>#SsoAuthLogin .login {\n  margin-top: 3em;\n  color: #9C847F; }\n\n  #SsoAuthLogin .login a {\n    color: #9C847F; }\n\n    #SsoAuthLogin {\n      height: 100%; }\n\n      #SsoAuthLogin .login a:hover {\n        color: #fff;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #fff; }\n\n        #SsoAuthLogin .content {\n          max-width: 600px;\n          margin: auto; }</style><i class=\"close icon\"></i><form ms-submit=\"submit\" id=\"SsoAuthLogin\"><div class=\"vc2\"><div class=\"vc1\"><div class=\"content\"><div class=\"description ui form\"><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.username\" name=\"username\"><label>昵称</label></div><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.mobilePhoneNumber\" name=\"mobilePhoneNumber\"><label>手机</label></div><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.email\" name=\"email\"><label>邮箱</label></div><div class=\"field\"><input autocomplete=\"off\" ms-duplex=\"o.password\" type=\"password\" ms-duplex=\"o.password\" name=\"password\"><label>密码</label></div><div class=\"one fluid ui inverted buttons\"><button type=\"submit\" class=\"ui green ok basic inverted button\">创建账号</button></div><div class=\"login\">已经注册 ？<a href=\"javascript:$$('SSO/auth.login');void(0)\">点此登录</a></div></div></div></div></div><input type=\"submit\" class=\"hideSubmit\"></form>"
            "red"
            "ssoAuthNew"
            (elem)->
                error_tip = $.error_tip(elem)
                m = {
                    o:{
                        email:""
                        mobilePhoneNumber:""
                        username:""
                        password:""
                    }
                    submit : ->
                        AV.Cloud.run "SSO.auth.new", m.o, {
                            success: (user) ->
                                AV.User.logIn(m.o.email, m.o.password, {
                                      success: (user) ->
                                        $.modal_alert """<h1><p>账号创建成功。</p><p>开始一段新的旅程吧！</p></h1>""", {
                                            onApprove:->
                                                location.reload()
                                        }
                                })
                            fail: (error) ->
                                error_tip.set error
                        }
                        false
                }
        )
    login: (url)->
        require_async(
            "/lib/store"
            ->
                self = modal(
                    "<style>#SsoAuthLogin .login {\n  margin-top: 3em;\n  color: #9C847F; }\n\n  #SsoAuthLogin .login a {\n    color: #9C847F; }\n\n    #SsoAuthLogin {\n      height: 100%; }\n\n      #SsoAuthLogin .login a:hover {\n        color: #fff;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #fff; }\n\n        #SsoAuthLogin .content {\n          max-width: 600px;\n          margin: auto; }</style><i class=\"close icon\"></i><form ms-submit=\"submit\" id=\"SsoAuthLogin\"><div class=\"vc2\"><div class=\"vc1\"><div class=\"content\"><div class=\"description ui form\"><div class=\"field\"><input spellcheck=\"false\" autocomplete=\"off\" ms-duplex=\"o.account\" name=\"account\" placeholder=\"请输入您的 昵称 或 手机 或 邮箱\"><label>账号</label></div><div class=\"field\"><input autocomplete=\"off\" ms-duplex=\"o.password\" type=\"password\" ms-duplex=\"o.password\" name=\"password\"><label>密码</label></div><div class=\"one fluid ui inverted buttons\"><button type=\"submit\" class=\"ui green ok basic inverted button\">开始使用</button></div><div class=\"login\">没有账号 ？<a href=\"javascript:$$('SSO/auth.new');void(0)\">点此注册</a></div></div></div></div></div><input type=\"submit\" class=\"hideSubmit\"></form>"
                    "green"
                    "ssoAuthLogin"
                    (elem)->
                        error_tip = $.error_tip(elem)
                        avalon.nextTick(
                            ->
                                elem.find('[name=account]').focus().select()
                        )
                        m = {
                            o:{
                                account:store.get('username') or ''
                                password:""
                            }
                            submit:->
                                account = m.o.account

                                if isNaN(account-0)
                                    login = AV.User.logIn
                                else
                                    login = AV.User.logInWithMobilePhone
                                
                                error = {}
                                if not account
                                    error.account = ""
                                if not m.o.password
                                    error.password = ""
                                if not error_tip.set error
                                    login(account, m.o.password,{
                                        success: (user)->
                                            store.set('username', user.getUsername())
                                            location.reload()
                                        error: (user, _error) ->
                                            if _error.code == 211
                                                error.account = "该账号不存在"
                                            else if _error.code == 210
                                                error.password = """密码错误。忘记密码了？<a href="javascript:$$('SSO.auth.reset_password', '#{m.o.account}');void(0)">点此找回。</a>"""
                                            error_tip.set error
                                    })
                                false
                        }
                )
        )
}
