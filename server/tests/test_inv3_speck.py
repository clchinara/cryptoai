import unittest
import numpy as np
import sys
from os import urandom

sys.path.append('../')

from inv3_speck import make_train_data, convert_to_binary, encrypt, expand_key

NUM_PLAINTEXTS = 8
TOTAL_BITS = 32 * NUM_PLAINTEXTS

class TestInv3SpeckFunctions(unittest.TestCase):

    def test_convert_to_binary_positive(self):
        # Positive case: len(ciphertexts_lr) // 2 == NUM_PLAINTEXTS
        ciphertexts_lr = [0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16, 0x4100, 0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16, 0x4100]
        n = 20
        ciphertexts_lr_npy = []
        for clr in ciphertexts_lr:
            ciphertexts_lr_npy.append(np.array([clr] * n))
        actual = convert_to_binary(ciphertexts_lr_npy)
        self.assertTrue(np.all(np.logical_or(actual == 0, actual == 1)))
        self.assertEqual(actual.shape[0], n)
        self.assertEqual(actual.shape[1], len(ciphertexts_lr) // 2 * 32)
        self.assertEqual(actual.shape[1], TOTAL_BITS)
        print("All assertions passed successfully in test_convert_to_binary_positive")
    
    def test_convert_to_binary_negative(self):
        # Negative case: len(ciphertexts_lr) // 2 != NUM_PLAINTEXTS
        ciphertexts_lr = [0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16, 0x5b02, 0x4900, 0x5b42, 0x4900, 0x5b56, 0x4100, 0x5b16]
        n = 20
        ciphertexts_lr_npy = []
        for clr in ciphertexts_lr:
            ciphertexts_lr_npy.append(np.array([clr] * n))
        with self.assertRaises(IndexError):
            convert_to_binary(ciphertexts_lr_npy)
        print("All assertions passed successfully in test_convert_to_binary_negative")

    def test_make_train_data_positive(self):
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
        print("All assertions passed successfully in test_make_train_data_positive")
    
    def test_make_train_data_negative(self):
        # Negative case: Invalid number of rounds
        n = 20
        nr = 0
        with self.assertRaises(IndexError):
            make_train_data(n, nr)
        print("All assertions passed successfully in test_make_train_data_negative")

    def test_encrypt_positive(self):
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
        print("All assertions passed successfully in test_encrypt_positive")
    
    def test_encrypt_negative(self):
        # Negative case: Invalid number of rounds
        n = 20
        nr = 0
        keys = np.frombuffer(urandom(8*n),dtype=np.uint16).reshape(4,-1);
        plainl = np.frombuffer(urandom(2*n),dtype=np.uint16);
        plainr = np.frombuffer(urandom(2*n),dtype=np.uint16);
        with self.assertRaises(IndexError):
            ks = expand_key(keys, nr);
            encrypt((plainl, plainr), ks);
        print("All assertions passed successfully in test_encrypt_negative")

if __name__ == '__main__':
    unittest.main()