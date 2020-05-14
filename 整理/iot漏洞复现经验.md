# iot漏洞复现经验
## 说明
本文将讲述从复现的几个漏洞里面得到的一些经验。

## 关注函数

 - dohph 运行php函数
 - fwrite函数，可能吸入文件的是命令
 - ebsGetVar(wp, "delete_offline_client",""); 从wp这个web句柄中取值(一般是url表单)，取delete_offline_client的值。
 - getenv从环境变量中读取数据，c语言函数，一般用来读取输入的参数
 - xmldbc_ephp C语言函数运行php文件
 - system，exec


## 漏洞测试关注点
- 在后台的配置静态 ip 处 ，一般配置静态 ip 地址处，因为这里会执行较多的系统命令，所以最容易出现命令注入的风险。
- 输入变量的处理----直接拼接

## 经验点
- ACTIONS=SETCFG%2CACTIVATE
- dlink850L DEVICE.ACCOUNT.xml可以获取用户名密码（需要权限）
- 可以通过查看 /etc/passwd 文件或者 /etc/shadow 文件来得到登陆的账号和密码，从而登陆到 ssh 上
- /etc/banner ssh连上的输出，可以查看sdk版本
- /etc/dropbear 目录下存放着 dss key 和 host key
- 轻量级ssh服务dropbear

