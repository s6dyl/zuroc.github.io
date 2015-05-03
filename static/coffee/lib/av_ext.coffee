_run = AV.Cloud.run
AV.Cloud.run = (name, data, options)->
    if options.fail
        options.error = (error) ->
            options.fail(error.message)
    _run(name,data,options)

