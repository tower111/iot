## 调试

系统模式：
```
qemu-system-mips -M malta -kernel vmlinux-3.2.0-4-4kc-malta -hda debian_squeeze_mips_standard.qcow2 -nographic -append "root=/dev/sda1 rw console=tty0 init=/linuxrc ignore_loglevel" -net nic,vlan=0 -net tap,vlan=0,ifname=tap0 -redir tcp:2333::2333 -redir tcp:8080::80
```
用户模式
```
qemu -L ./ -E LD_PRELOAD=/hook_mips ./usr/bin/httpd 
```
```
-L 指定命令运行的根目录
-E 添加环境变量
```
在system模式下还可以用`mount --bind /proc ./proc`减少很多错误


