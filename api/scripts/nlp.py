import sys
from spellchecker import SpellChecker


spell = SpellChecker()


def correctText(textArray):
    return [spell.correction(word) for word in textArray]


def test():
    textToCorrect1 = 'This is a wrrong sentrence'
    textToCorrect2 = 'My neme is Jonh.'
    textToCorrect3 = 'Hi there, hwo are you?'

    correctedText1 = " ".join(correctText(textToCorrect1.split(' ')))
    correctedText2 = " ".join(correctText(textToCorrect2.split(' ')))
    correctedText3 = " ".join(correctText(textToCorrect3.split(' ')))

    assert correctedText1 == 'This is a wrong sentence'
    assert correctedText2 == 'My name is john'
    assert correctedText3 == 'Hi there who are you'


def main(argv):
    if len(argv) == 2 and argv[1] == 'test':
        test()
    elif len(argv) > 1:
        correctedArray = correctText(argv[1:])
        resText = " ".join(correctedArray)
        print(resText)
    else:
        print('Invalid arguments')
        sys.exit(1)

    sys.stdout.flush()
    sys.exit(0)


if __name__ == '__main__':
    main(sys.argv)
