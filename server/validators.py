import utils

validation_constants = {
    'numPlaintexts': [4, 8],
    'numCiphertexts': [4, 8],
    'numRounds': [5, 6, 7, 8],
    'inv': ['inv1', 'inv3']
}

required_fields = {
    'speck': ['numPlaintexts', 'plaintexts', 'numRounds'],
    'demo': ['numCiphertexts', 'ciphertexts', 'numRounds'],
    'eval': ['inv']
}

# Common validation functions

def validate_required_fields(fields):
    def validate_required_fields_aux(req):
        missing_fields = []
        for field in fields:
            if field not in req:
                missing_fields.append(field)
        if len(missing_fields) == 0:
            return True, None
        return False, f"Missing fields {missing_fields}"
    return validate_required_fields_aux

def validate_num_plaintexts(req):
    valid_num_plaintexts = validation_constants['numPlaintexts']
    if req['numPlaintexts'] in valid_num_plaintexts:
        return True, None
    else:
        return False, f"`numPlaintexts` must be either of {valid_num_plaintexts}"

def validate_plaintexts(req):
    if len(req['plaintexts']) != req['numPlaintexts']:
        return False, "Number of plaintexts given does not match `numPlaintexts`"
    # Plaintexts should be 32-bit
    max_val = 2**32
    for plaintext in req['plaintexts']:
        plaintext_val = utils.parse_hex_string(plaintext)
        if not (plaintext_val <= max_val):
            return False, f"Plaintexts should be 32-bit: {plaintext}"
    return True, None

def validate_num_ciphertexts(req):
    valid_num_ciphertexts = validation_constants['numCiphertexts']
    if req['numCiphertexts'] in valid_num_ciphertexts:
        return True, None
    else:
        return False, f"`numCiphertexts` must be either of {valid_num_ciphertexts}"
    
def validate_ciphertexts(req):
    if len(req['ciphertexts']) != req['numCiphertexts']:
        return False, "Number of ciphertexts given does not match `numCiphertexts`"
    # Ciphertexts should be 32-bit
    max_val = 2**32
    for ciphertext in req['ciphertexts']:
        ciphertext_val = utils.parse_hex_string(ciphertext)
        if not (ciphertext_val <= max_val):
            return False, f"Ciphertexts should be 32-bit: {ciphertext}"
    return True, None

def validate_num_rounds(req):
    valid_num_rounds = validation_constants['numRounds']
    if req['numRounds'] in valid_num_rounds:
        return True, None
    else:
        return False, f"`numRounds` must be either of {valid_num_rounds}"

def validate_inv(req):
    valid_inv = validation_constants['inv']
    if req['inv'] in valid_inv:
        return True, None
    else:
        return False, f"`inv` must be either of {valid_inv}"

validation_flows = {
    'speck': [validate_required_fields(required_fields['speck']), validate_num_plaintexts, validate_plaintexts, validate_num_rounds],
    'demo': [validate_required_fields(required_fields['demo']), validate_num_ciphertexts, validate_ciphertexts, validate_num_rounds],
    'eval': [validate_required_fields(required_fields['eval']), validate_inv]
}

# Validation for each

def validate_speck_request(req):
    for validation in validation_flows['speck']:
        is_valid, err_msg = validation(req)
        if not is_valid:
            return False, err_msg
    return True, None

def validate_demo_request(req):
    for validation in validation_flows['demo']:
        is_valid, err_msg = validation(req)
        if not is_valid:
            return False, err_msg
    return True, None

def validate_eval_request(req):
    for validation in validation_flows['eval']:
        is_valid, err_msg = validation(req)
        if not is_valid:
            return False, err_msg
    return True, None