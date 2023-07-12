import qrcode

img = qrcode.make(
    ">質問1\n>q2\n"
)

img.save("./test.png")