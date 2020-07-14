# afl使用

## 测试

test.c
```
#undef _FORTIFY_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void vulnerable_function() {
	char buf[128];
	read(STDIN_FILENO, buf, 256);
}

int main(int argc, char** argv) {
	vulnerable_function();
	write(STDOUT_FILENO, "Hello, World\n", 13);
}
```
不插桩编译
```
gcc test.c -o test
```
插桩编译
```
afl-gcc -fno-stack-protector -z execstack test.c -o test_afl
关闭canary和NX保护
```
一个必要设置

在执行afl-fuzz前，如果系统配置为将核心转储文件（core）通知发送到外部程序。
```
cho core >/proc/sys/kernel/core_pattern
```

运行

LD_PRELOAD用来劫持库函数，@@表示test_afl从命令行获取输入
```
LDPRELOAD=/root/wget1/bin/preeny/x86_64-linux-gnu/desock.so afl-fuzz -i testcase_dir -o findings_dir ./test_afl @@
```


afl参数
```
-U -- python3  在fuzz python程序的时候设置运行的解释器
/root/github/AFLplusplus/afl-fuzz -i ./afl_inputs -o ./afl_outputs -m none -U -- python3 ./fuzz_x8664_linux.py @@
```


抓取数据包
```
POST /ajax/login/backend/?b0QHe3bMd9fNm57=$$$K17GUKsYaGNxIHiFehHlOhNfyy_B9944oJJ8DW_2tsQgytxlxiHVKrGP362pXExTBoA0VwdqYDkheIat1EeiQymXPjk6ZNRPTkjyIo2W63tdF$$$ HTTP/1.1
Host: 10.10.66.132
Content-Length: 25
Accept: */*
Origin: http://10.10.66.132
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Referer: http://10.10.66.132/ajax/login/
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7
Cookie: csrftoken=fVYWMCFUG6gW4ONjm48179CsKAiamipA; send_log_path=%2Ftmp%2Flog%2Fnew%2Faccess.log.1; FSSBBIl2UgzbN7NCSRF=qDWzcpd3KP1mAw5r0gbsg06pu4TSyuYU; b0QHe3bMd9fNm57=K17GUKsYaGNxIHiFehHlOhNfyy_B9944oJJ8DW_2tsQgytxlxiHVKrGP362pXExTBoA0VwdqYDkheIat1EeiQymXPjk6ZNRPTkjyIo2W63tdF
Connection: close
username=1e&password=1212
```
其中`$$$`标记之后
```
K17GUKsYaGNxIHiFehHlOhNfyy_B9944oJJ8DW_2tsQgytxlxiHVKrGP362pXExTBoA0VwdqYDkheIat1EeiQymXPjk6ZNRPTkjyIo2W63tdF$$$ HTTP/1.1
```
应当做seed作为变异使用 	 