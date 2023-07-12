import qrcode

img = qrcode.make(
    "<1>質問1\n<2>q2\n"
)

img.save("./test.png")