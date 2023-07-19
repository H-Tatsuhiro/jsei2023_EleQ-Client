from core import qr, parse

question = qr.decode('img/test.png')
q_text = parse.textParse(question[0])

