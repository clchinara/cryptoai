import unittest
import sys
import os

sys.path.append('../')

from inv1_eval import speck_func, demo_func, eval_func

class TestInv1EvalFunctions(unittest.TestCase):

    def test_speck_func_positive(self):
        num_rounds = [5, 6, 7, 8]
        plaintexts = [0x5b024900, 0x5b424900, 0x5b564100, 0x5b164100]
        for nr in num_rounds:
            actual1 = speck_func(nr, plaintexts)
            actual2 = speck_func(nr, plaintexts)
            self.assertNotEqual(actual1, actual2)
            self.assertEqual(len(actual1), len(plaintexts))
            for ciphertext in actual1:
                self.assertTrue(ciphertext <= 2 ** 32)
        print("All assertions passed successfully in test_speck_func_positive")
    
    def test_speck_func_negative(self):
        nr = 0
        plaintexts = [0x5b024900, 0x5b424900, 0x5b564100, 0x5b164100]
        with self.assertRaises(IndexError):
            speck_func(nr, plaintexts)
        print("All assertions passed successfully in test_speck_func_negative")
    
    def test_demo_func_positive(self):
        num_rounds = [5, 6, 7, 8]
        ciphertexts = [0x4df6db95, 0xa4804793, 0xdbf273ac, 0x53c8af14]
        for nr in num_rounds:
            try:
                # Change working directory just for this bit
                new_directory = "../"
                os.chdir(new_directory)
                actual1 = demo_func(nr, ciphertexts)
                actual2 = demo_func(nr, ciphertexts)
                self.assertEqual(actual1, actual2)
                self.assertTrue(0 <= actual1[0] <= 1)
                self.assertTrue((actual1[0] > 0.5) == actual1[1])
            finally:
                # Change back to tests directory
                os.chdir('./tests')
        print("All assertions passed successfully in test_demo_func_positive")
    
    def test_demo_func_negative(self):
        nr = 0
        ciphertexts = [0x4df6db95, 0xa4804793, 0xdbf273ac, 0x53c8af14]
        try:
            # Change working directory just for this bit
            new_directory = "../"
            os.chdir(new_directory)
            with self.assertRaises(IOError):
                demo_func(nr, ciphertexts)
        finally:
            # Change back to tests directory
            os.chdir('./tests')
        print("All assertions passed successfully in test_demo_func_negative")
    
    def test_eval_func_positive(self):
        expected_rounds = [5, 6, 7, 8]
        expected_fields = ['rounds', 'acc', 'tpr', 'tnr', 'mse']
        try:
            # Change working directory just for this bit
            new_directory = "../"
            os.chdir(new_directory)
            actual = eval_func()
            self.assertTrue(len(actual) == len(expected_rounds))
            for res in actual:
                for field in expected_fields:
                    self.assertTrue(field in res)
        finally:
            # Change back to tests directory
            os.chdir('./tests')
        print("All assertions passed successfully in test_eval_func_positive")

if __name__ == '__main__':
    unittest.main()