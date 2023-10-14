from flask import Flask, request, jsonify
from flask_cors import CORS

from validators import validate_speck_request, validate_demo_request, validate_eval_request
from app_utils import construct_error_response, construct_success_response
import utils
import inv1_eval, inv3_eval

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

"""
{
    "numPlaintexts": 4,
    "plaintexts": ["0x00400000", "0x00400000", "0x00400000", "0x00400000"],
    "numRounds": 5
}
"""
@app.route('/speck', methods=['POST'])
def speck():
    data = request.get_json()
    is_valid, err_msg = validate_speck_request(data)
    if not is_valid:
        return jsonify(construct_error_response(msg=err_msg)), 400
    num_plaintexts = data['numPlaintexts']
    nr = data['numRounds']
    plaintexts = []
    for p in data['plaintexts']:
        plaintexts.append(utils.parse_hex_string(p))
    ciphertexts = None
    try:
        if num_plaintexts == 4:
            ciphertexts = inv1_eval.speck_func(nr, plaintexts)
        elif num_plaintexts == 8:
            ciphertexts = inv1_eval.speck_func(nr, plaintexts)
    except Exception as e:
        print(f'Error occurred: {e}')
        return jsonify(construct_error_response(msg='Internal error')), 500
    for i in range(len(ciphertexts)):
        ciphertexts[i] = hex(ciphertexts[i])[2:]
    res_data = {
        'ciphertexts': ciphertexts
    }
    print('res_data:', res_data)
    return jsonify(construct_success_response(data=res_data)), 200

"""
{
    "numCiphertexts": 4,
    "ciphertexts": ["0x00400000", "0x00400000", "0x00400000", "0x00400000"],
    "numRounds": 5
}
"""
@app.route('/demo', methods=['POST'])
def demo():
    data = request.get_json()
    is_valid, err_msg = validate_demo_request(data)
    if not is_valid:
        return jsonify(construct_error_response(msg=err_msg)), 400
    num_ciphertexts = data['numCiphertexts']
    nr = data['numRounds']
    ciphertexts = []
    for c in data['ciphertexts']:
        ciphertexts.append(utils.parse_hex_string(c))
    prob = None
    pred = None
    try:
        if num_ciphertexts == 4:
            prob, pred = inv1_eval.demo_func(nr, ciphertexts)
        elif num_ciphertexts == 8:
            prob, pred = inv3_eval.demo_func(nr, ciphertexts)
    except Exception as e:
        print(f'Error occurred: {e}')
        return jsonify(construct_error_response(msg='Internal error')), 500
    res_data = {
        'numCiphertexts': num_ciphertexts,
        'prob': str(prob),
        'pred': bool(pred)
    }
    print('res_data:', res_data)
    return jsonify(construct_success_response(data=res_data)), 200

@app.route('/eval', methods=['POST'])
def eval():
    data = request.get_json()
    is_valid, err_msg = validate_eval_request(data)
    if not is_valid:
        return jsonify(construct_error_response(msg=err_msg)), 400
    inv = data['inv']
    eval_result = None
    try:
        if inv == 'inv1':
            eval_result = inv1_eval.eval_func()
        elif inv == 'inv3':
            eval_result = inv3_eval.eval_func()
    except Exception as e:
        print(f'Error occurred: {e}')
        return jsonify(construct_error_response(msg='Internal error')), 500
    print('eval_result:', eval_result)
    return jsonify(construct_success_response(data=eval_result)), 200
