import unittest
import sys 

sys.path.append('../')

from utils import parse_hex_string, extract_left_right, combine_left_right

class TestUtilsFunctions(unittest.TestCase):
    def test_parse_hex_string_positive(self):
        # Positive case: Valid hex
        hex_string = "1A3"
        expected = 419
        actual = parse_hex_string(hex_string)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_parse_hex_string_positive")

    def test_parse_hex_string_negative(self):
        # Negative case: Invalid hex
        hex_string = "1G3"
        with self.assertRaises(ValueError):
            parse_hex_string(hex_string)
        print("All assertions passed successfully in test_parse_hex_string_negative")

    def test_parse_hex_string_boundary(self):
        # Boundary case: 0
        hex_string_low = "0"
        expected = 0
        actual = parse_hex_string(hex_string_low)
        self.assertEqual(actual, expected)
        # Boundary case: Large hex
        hex_string_high = "FFFFFFFF"
        expected = 4294967295
        actual = parse_hex_string(hex_string_high)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_parse_hex_string_boundary")

    def test_extract_left_right_positive(self):
        # Positive case: 32-bit
        val = 0x5b024900
        expected = (0x5b02, 0x4900)
        actual = extract_left_right(val)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_extract_left_right_positive")

    def test_extract_left_right_negative(self):
        # Negative case: Exceeds 32-bit
        val = 0x15b0249003
        expected = (0x15b02, 0x49003)
        actual = extract_left_right(val)
        self.assertTrue(actual[1] >= 2 ** 16)
        self.assertNotEqual(actual, expected) # expected to give incorrect result
        print("All assertions passed successfully in test_extract_left_right_negative")

    def test_extract_left_right_boundary(self):
        # Boundary case: 0
        val_low = 0
        expected = (0, 0)
        actual = extract_left_right(val_low)
        self.assertEqual(actual, expected)
        # Boundary case: Large number
        val_high = 0xffffffff
        expected = (0xffff, 0xffff)
        actual = extract_left_right(val_high)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_extract_left_right_boundary")

    def test_combine_left_right_positive(self):
        # Positive case: Left and right are both 16-bit
        left_val = 0x5b56
        right_val = 0x4100
        expected = 0x5b564100
        actual = combine_left_right(left_val, right_val)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_combine_left_right_positive")

    def test_combine_left_right_negative(self):
        # Negative case: Left and right are not 16-bit
        left_val = 0x76b56
        right_val = 0x34100
        expected = 0x76b5634100
        actual = combine_left_right(left_val, right_val)
        self.assertNotEqual(actual, expected) # expected to give incorrect result
        print("All assertions passed successfully in test_combine_left_right_negative")

    def test_combine_left_right_boundary(self):
        # Boundary case: Left and right are both 0
        left_val_low = 0
        right_val_low = 0
        expected = 0
        actual = combine_left_right(left_val_low, right_val_low)
        self.assertEqual(actual, expected)
        # Boundary case: Left and right are both large
        left_val_high = 0xffff
        right_val_high = 0xffff
        expected = 0xffffffff
        actual = combine_left_right(left_val_high, right_val_high)
        self.assertEqual(actual, expected)
        print("All assertions passed successfully in test_combine_left_right_boundary")

if __name__ == '__main__':
    unittest.main()
