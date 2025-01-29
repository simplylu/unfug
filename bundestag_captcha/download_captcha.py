from time import sleep
from tqdm import tqdm
import requests
import os

out_dir = os.path.join(os.getcwd(), "bundestag_captcha" "captchas")

for i in tqdm(range(100, 1000)):
    fpath = os.path.join(out_dir, f"{str(i).rjust(3, '0')}.png")
    res = requests.get("https://www.bundestag.de/blueprint/servlet/captcha/getImage")
    if res.status_code % 100 != 2:
        sleep(5)
        with open(fpath, "wb") as f:
            f.write(res.content)