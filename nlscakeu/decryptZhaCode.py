import urllib.parse

def decrypt_data(data, passkey):
    # Caesar cipher decryption
    result = ''
    for char in data:
        if char.isalpha():
            if char.isupper():
                result += chr((ord(char) - 65 - len(passkey)) % 26 + 65)
            else:
                result += chr((ord(char) - 97 - len(passkey)) % 26 + 97)
        else:
            result += char
    return result

def decompress_data(data):
    # Decompress the data if necessary
    # For simplicity, we assume the data is not compressed in this example
    return data

def decode_special_code(special_code, passkey):
    decoded_data = urllib.parse.unquote(special_code)  # URL decode the data
    decompressed_data = decompress_data(decoded_data)  # Decompress the data
    decrypted_data = decrypt_data(decompressed_data, passkey)  # Decrypt the data
    return decrypted_data

# Example usage
special_code = input('CODE: ')
passkey = 'nlscake'
decoded_data = decode_special_code(special_code, passkey)
print(decoded_data)  # Output: 'sprinkles chocolate sprinkles'
