import cv2
import qrcode

def decode(img_path):
    img = cv2.imread(img_path)
    QRCD = cv2.QRCodeDetector()
    decode_val, points, straight_qrcode = QRCD.detectAndDecode(img)
    parsedAnswer = decode_val.split('>')
    parsedAnswer = parsedAnswer[1:]
    return parsedAnswer

def encode(text):
    QR_img = qrcode.make(text)
    imgPath = "/home/privath/PycharmProjects/jsei2023_EleQ-Client/back/img/encoded.png"
    QR_img.save(imgPath)
    return imgPath