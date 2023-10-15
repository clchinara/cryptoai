import unittest
import numpy as np
import sys
from os import urandom

sys.path.append('../')

from inv1_speck import make_train_data, convert_to_binary, encrypt, expand_key

NUM_PLAINTEXTS = 4
TOTAL_BITS = 32 * NUM_PLAINTEXTS

class TestInv1SpeckFunctions(unittest.TestCase):

    def test_convert_to_binary_positive(self):
        print('TEST test_convert_to_binary_positive:')
        # Positive case: len(ciphertexts_lr) // 2 == NUM_PLAINTEXTS
        ciphertexts_lr = [0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16, 0x4100]
        n = 20
        ciphertexts_lr_npy = []
        for clr in ciphertexts_lr:
            ciphertexts_lr_npy.append(np.array([clr] * n))
        actual = convert_to_binary(ciphertexts_lr_npy)
        self.assertTrue(np.all(np.logical_or(actual == 0, actual == 1)))
        print('√ It should only contain 0s or 1s')
        self.assertEqual(actual.shape[0], n)
        self.assertEqual(actual.shape[1], len(ciphertexts_lr) // 2 * 32)
        self.assertEqual(actual.shape[1], TOTAL_BITS)
        print(f'√ It should have the shape (n, {TOTAL_BITS})')
        print("PASSED test_convert_to_binary_positive.")
    
    def test_convert_to_binary_negative(self):
        print('TEST test_convert_to_binary_negative:')
        # Negative case: len(ciphertexts_lr) // 2 != NUM_PLAINTEXTS
        ciphertexts_lr = [0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16]
        n = 20
        ciphertexts_lr_npy = []
        for clr in ciphertexts_lr:
            ciphertexts_lr_npy.append(np.array([clr] * n))
        with self.assertRaises(IndexError):
            convert_to_binary(ciphertexts_lr_npy)
        print('√ It should raise error for invalid number of input ciphertexts')
        print("PASSED test_convert_to_binary_negative.")

    def test_make_train_data_positive(self):
        print('TEST test_make_train_data_positive:')
        # Positive case: Valid number of rounds
        n = 20
        num_rounds = [5, 6, 7, 8]
        for nr in num_rounds:
            actualX1, actualY1 = make_train_data(n, nr)
            actualX2, _ = make_train_data(n, nr)
            self.assertFalse(np.array_equal(actualX1, actualX2))
            self.assertTrue(np.any(actualY1 == 0) and np.any(actualY1 == 1))
            self.assertTrue(np.all(np.logical_or(actualX1 == 0, actualX1 == 1)))
            self.assertEqual(actualX1.shape[0], actualY1.shape[0])
            self.assertEqual(actualX1.shape[0], n)
            self.assertEqual(actualX1.shape[1], TOTAL_BITS)
        print('√ It should be non-deterministic')
        print('√ Y should only contain 0s or 1s')
        print('√ Y must at least have a 0 and a 1')
        print('√ X.shape[0] must be equal to Y.shape[0], and they must be equal to n')
        print(f'√ X.shape[1] must be equal to {TOTAL_BITS}')
        print("PASSED test_make_train_data_positive.")
    
    def test_make_train_data_negative(self):
        print('TEST test_make_train_data_negative:')
        # Negative case: Invalid number of rounds
        n = 20
        nr = 0
        with self.assertRaises(IndexError):
            make_train_data(n, nr)
        print('√ It should raise error for invalid number of input rounds')
        print("PASSED test_make_train_data_negative.")

    def test_encrypt_positive(self):
        print('TEST test_encrypt_positive:')
        # Positive case: Valid number of rounds
        n = 20
        num_rounds = [5, 6, 7, 8]
        for nr in num_rounds:
            keys = np.frombuffer(urandom(8*n),dtype=np.uint16).reshape(4,-1);
            plainl = np.frombuffer(urandom(2*n),dtype=np.uint16);
            plainr = np.frombuffer(urandom(2*n),dtype=np.uint16);
            ks = expand_key(keys, nr);
            actuall, actualr = encrypt((plainl, plainr), ks);
            self.assertEqual(actuall.shape[0], n)
            self.assertEqual(actualr.shape[0], n)
            self.assertTrue(np.all(actuall <= 2 ** 32))
            self.assertTrue(np.all(actualr <= 2 ** 32))
        print('√ left.shape[0] and right.shape[0] must be equal to n')
        print('√ Every value in left and right must be 32-bit')
        print("PASSED test_encrypt_positive.")
    
    def test_encrypt_negative(self):
        print('TEST test_encrypt_positive:')
        # Negative case: Invalid number of rounds
        n = 20
        nr = 0
        keys = np.frombuffer(urandom(8*n),dtype=np.uint16).reshape(4,-1);
        plainl = np.frombuffer(urandom(2*n),dtype=np.uint16);
        plainr = np.frombuffer(urandom(2*n),dtype=np.uint16);
        with self.assertRaises(IndexError):
            ks = expand_key(keys, nr);
            encrypt((plainl, plainr), ks);
        print('√ It should raise error for invalid number of input rounds')
        print("PASSED test_encrypt_negative.")

if __name__ == '__main__':
    unittest.main()