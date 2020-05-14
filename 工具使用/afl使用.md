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