# wfuzz使用

测试
```
wfuzz -w./wordlist/general/common.txt http://testphp.vulnweb.com/FUZZ
```
运行结果
```
===================================================================
ID           Response   Lines    Word     Chars       Payload                                                                                                                                    
===================================================================

000000010:   404        7 L      12 W     168 Ch      "123"                                                                                                                                      
000000005:   404        7 L      12 W     168 Ch      "03"                                                                                                                                       
000000002:   404        7 L      12 W     168 Ch      "00"                                                                                                                                       
000000007:   404        7 L      12 W     168 Ch      "10"                                                                                                                                       
000000008:   404        7 L      12 W     168 Ch      "100"                                                                                                                                      
000000004:   404        7 L      12 W     168 Ch      "02"                                                                                                                                       
000000001:   404        7 L      12 W     168 Ch      "@"                                                                                                                                        
000000003:   404        7 L      12 W     168 Ch      "01"                                                                                                                                       
000000012:   404        7 L      12 W     168 Ch      "20"                                                                                                                                       
000000013:   404        7 L      12 W     168 Ch      "200"                                                                                                                                      
000000014:   404        7 L      12 W     168 Ch      "2000"                                                                                                                                     
000000016:   404        7 L      12 W     168 Ch      "2002"                                                                                                                                     
000000017:   404        7 L      12 W     168 Ch      "2003"                                                                                                                                     
000000019:   404        7 L      12 W     168 Ch      "2005"
```

```
ID：测试时的请求序号
Response：HTTP响应吗
Lines：响应信息中的行数
Word：响应信息中的字数
Chars：响应信息中的字符数
Payload：当前使用的payload
```

可用的categories包括：payloads,encoders,iterators,printers和scripts。
使用
```
 wfuzz -e payloads
```
可以查看帮助

**多个payload**
```
wfuzz -w /usr/share/wfuzz/wordlist/general/common.txt -w /usr/share/wfuzz/wordlist/general/common.txt -w /usr/share/wfuzz/wordlist/general/extensions_common.txt --hc 404 http://testphp.vulnweb.com/FUZZ/FUZ2ZFUZ3Z
```
用FU2Z,FU3Z占位
**过滤**
```
wfuzz -w /usr/share/wfuzz/wordlist/general/common.txt --hc 404 http://testphp.vulnweb.com/FUZZ 
```
通过--hc，--hl，--hw，--hh参数可以隐藏某些HTTP响应。