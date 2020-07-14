# preeny 使用

## 简介

用于自动生成so文件。

使用LD_PRELOAD来劫持一些函数（fork，socket等）

可以用来测试网络程序和hook掉一些阻塞。


## 安装

官网查看
```
安装依赖
apt-get install libseccomp-dev

git clone https://github.com/zardus/preeny.git
make
```
编译其他架构
```
make -i CC=mips-malta-linux-gnu-gcc
```



## 使用

测试

```
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main()
{
    int s = socket(AF_INET, SOCK_STREAM, 0);
    char buf[1024]={0};
    char send_msg[] = "hello, send by send() :\n";
    send(s, send_msg, strlen(send_msg), 0);
    recv(s, buf, 1024, 0);
    printf("recv from recv() : %s\n", buf);
}
```
编译`gcc sock_test.c -o sock_test
LD_PRELOAD="/home/haclh/vmdk_kernel/preeny/x86_64-linux-gnu/desock.so" ./sock_test`


```
root@c7c87f16a29d:~# LD_PRELOAD="/root/preeny/x86_64-linux-gnu/desock.so" wget localhost:6666 -q -O result < <(echo "success");
GET / HTTP/1.1
User-Agent: Wget/1.17.1 (linux-gnu)
Accept: */*
Accept-Encoding: identity
Host: localhost:6666
Connection: Keep-Alive

root@c7c87f16a29d:~# more result 
success
```
我们看到result文件中包含了"success"字符串,说明preeny已经将我们的输入转化成了http response返回结果,说明我们preeny安装配置无误

## 实例

使用wget 1.19

```
wget https://ftp.gnu.org/gnu/wget/wget-1.19.1.tar.gz
tar zxvf wget-1.19.1.tar.gz
cd wget-1.19.1
CXX=afl-g++ CC=afl-gcc ./configure --prefix=/root/wget1 CFLAGS="$CFLAGS -static-libasan -fsanitize=address" LDFLAGS="$LDFLAGS -Wl,--no-undefined -static-libasan -fsanitize=address"
AFL_USE_ASAN=1 make
make install
```
验证编译成功
```
cd /root/wget1/bin
./wget --version

GNU Wget 1.19.1 built on linux-gnu.
```

准备执行fuzz
```
echo core >/proc/sys/kernel/core_pattern
```




