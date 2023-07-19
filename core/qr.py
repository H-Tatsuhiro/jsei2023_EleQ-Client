import cv2
import qrcode

def decode(img_path):
    img = cv2.imread(img_path)
    QRCD = cv2.QRCodeDetector()
    success_decode, decode_val, points, straight_qrcode = QRCD.detectAndDecodeMulti(img)
    return decode_val

def encode(text):
    QR_img = qrcode.make(text)
    QR_img.save("img/encoded.png")

