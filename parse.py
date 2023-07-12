text = ">質問1\nあいうえ>q2\nかきくけ"

splitted_text = text.split('>')

print(splitted_text)

for i in range(1, len(splitted_text)):
    print(splitted_text[i])

