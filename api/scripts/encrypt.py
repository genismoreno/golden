import crc8

LETTERS = 'abcdefghijklmnopqrstuvwxyz'


def createCrc(message):
    hash = crc8.crc8()
    hash.update(message)
    return hash.hexdigest()


def encrypt(message, prevCrc=0):
    crcValue = createCrc(message)
    crcToInt = int(crcValue, 16)

    translated = ''
    for symbol in message.lower():
        if symbol in LETTERS:
            num = LETTERS.find(symbol)
            num = num + prevCrc

            num = num % 26
            translated = translated + LETTERS[num]
        else:
            translated = translated + symbol

    return prevCrc + crcToInt, translated


def test():
    crcInt, message = encrypt('Hi there!')
    crcInt1, message1 = encrypt('How are you?', crcInt)
    crcInt2, message2 = encrypt('Super secret message', crcInt1)

    assert message == 'hi there!'
    assert message1 == 'xem qhu oek?'
    assert message2 == 'cezob combod wocckqo'
    print('All tests passed')


if __name__ == '__main__':
    test()
