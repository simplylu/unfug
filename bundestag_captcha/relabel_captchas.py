import os
import re
import subprocess

IMAGE_VIEWER = "loupe"

out_dir = os.path.join(os.getcwd(), "bundestag_captcha", "captchas")
images = sorted([os.path.join(out_dir, f) for f in os.listdir(out_dir) if re.match(r'^\d{3,4}$', f.split("/")[-1].split(".")[0])])
print("Images to label:", len(images))

for image in images:
    iid = image.split("/")[-1].split(".")[0]
    proc = subprocess.Popen([IMAGE_VIEWER, image])
    captcha = input("Captcha: ")
    proc.kill()
    new_image = image.replace(iid, captcha)
    os.rename(image, new_image)
