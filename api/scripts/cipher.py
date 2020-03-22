import sys
import crc8
import json

LETTERS = 'abcdefghijklmnopqrstuvwxyz'


def createCrc(message):
    hash = crc8.crc8()
    hash.update(message)
    return hash.hexdigest()


def encrypt(message, prevCrc=0):
    translated = ''
    for symbol in message.lower():
        if symbol in LETTERS:
            num = LETTERS.find(symbol)
            num = num + prevCrc

            num = num % 26
            translated = translated + LETTERS[num]
        else:
            translated = translated + symbol

    crcValue = createCrc(message)
    crcToInt = int(crcValue, 16)
    return prevCrc + crcToInt, translated


def test():
    crcInt, message = encrypt('Hi there!')
    crcInt1, message1 = encrypt('How are you?', crcInt)
    crcInt2, message2 = encrypt('Super secret message', crcInt1)

    assert message == 'hi there!'
    assert message1 == 'xem qhu oek?'
    assert message2 == 'cezob combod wocckqo'
    print('All tests passed')


def main(argv):
    if len(argv) == 2 and argv[1] == 'test':
        test()
    elif len(argv) > 2:
        crc, message = encrypt(" ".join(argv[2:]), int(argv[1]))
        res = {
            'crc': crc,
            'message': message
        }
        print(json.dumps(res))
    else:
        print('Invalid arguments')
        sys.exit(1)

    sys.stdout.flush()
    sys.exit(0)


if __name__ == '__main__':
    main(sys.argv)
