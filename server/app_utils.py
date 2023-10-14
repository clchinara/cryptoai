def construct_success_response(data, msg=None):
    return {
        'isSuccess': True,
        'data': data,
        'message': msg
    }

def construct_error_response(data=None, msg=None):
    return {
        'isSuccess': False,
        'data': data,
        'message': msg
    }

