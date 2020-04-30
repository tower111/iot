## 调试

**系统模式：**
```
qemu-system-mips -M malta -kernel vmlinux-3.2.0-4-4kc-malta -hda debian_squeeze_mips_standard.qcow2 -nographic -append "root=/dev/sda1 rw console=tty0 init=/linuxrc ignore_loglevel" -net nic,vlan=0 -net tap,vlan=0,ifname=tap0 -redir tcp:2333::2333 -redir tcp:8080::80
```
****
**用户模式**
```
qemu -L ./ -E LD_PRELOAD=/hook_mips ./usr/bin/httpd 
```
```
-L 指定命令运行的根目录
-E 添加环境变量
```
在system模式下还可以用`mount --bind /proc ./proc`减少很多错误

****
镜像每次使用都要下载比较麻烦，整理成一个脚本一次趁某天夜里一次下载
```
mkdir ./arm64
wget -c -P ./arm64 https://people.debian.org/~aurel32/qemu/amd64/README.txt
wget -c -p ./arm64 https://people.debian.org/~aurel32/qemu/amd64/debian_squeeze_amd64_standard.qcow2 
wget -c -p ./arm64 https://people.debian.org/~aurel32/qemu/amd64/debian_wheezy_amd64_standard.qcow2


mkdir ./armel
wget -c -P ./armel https://people.debian.org/~aurel32/qemu/armel/README.txt
wget -c -P ./armel https://people.debian.org/~aurel32/qemu/armel/debian_squeeze_armel_standard.qcow2 
wget -c -P ./armel https://people.debian.org/~aurel32/qemu/armel/debian_wheezy_armel_standard.qcow2
wget -c -P ./armel https://people.debian.org/~aurel32/qemu/armel/initrd.img-2.6.32-5-versatile 
wget -c -P ./armel https://people.debian.org/~aurel32/qemu/armel/vmlinuz-3.2.0-4-versatile 


mkdir ./i386 
wget -c -P ./i386 https://people.debian.org/~aurel32/qemu/i386/README.txt
wget -c -P ./i386 https://people.debian.org/~aurel32/qemu/i386/debian_squeeze_i386_standard.qcow2
wget -c -P ./i386 https://people.debian.org/~aurel32/qemu/i386/debian_wheezy_i386_standard.qcow2

mkdir ./armhf
wget -c -P ./armhf https://people.debian.org/~aurel32/qemu/armhf/README.txt
wget -c -P ./armhf https://people.debian.org/~aurel32/qemu/armhf/debian_wheezy_armhf_standard.qcow2
wget -c -P ./armhf https://people.debian.org/~aurel32/qemu/armhf/initrd.img-3.2.0-4-vexpress
wget -c -P ./armhf https://people.debian.org/~aurel32/qemu/armhf/vmlinuz-3.2.0-4-vexpress


mkdir ./kfreebsd-amd64
wget -c -P ./kfreebsd-amd64 https://people.debian.org/~aurel32/qemu/kfreebsd-amd64/README.txt
wget -c -P ./kfreebsd-amd64 https://people.debian.org/~aurel32/qemu/kfreebsd-amd64/debian_squeeze_kfreebsd-amd64_standard.qcow2
wget -c -P ./kfreebsd-amd64 https://people.debian.org/~aurel32/qemu/kfreebsd-amd64/debian_wheezy_kfreebsd-amd64_standard.qcow2

mkdir ./kfreebsd-i386
wget -c -P ./kfreebsd-i386 https://people.debian.org/~aurel32/qemu/kfreebsd-i386/README.txt
wget -c -P ./kfreebsd-i386 https://people.debian.org/~aurel32/qemu/kfreebsd-i386/debian_squeeze_kfreebsd-i386_standard.qcow2
wget -c -P ./kfreebsd-i386 https://people.debian.org/~aurel32/qemu/kfreebsd-i386/debian_wheezy_kfreebsd-i386_standard.qcow2

mkdir ./mips
wget -c -P ./mips https://people.debian.org/~aurel32/qemu/mips/README.txt
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/debian_squeeze_mips_standard.qcow2
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/debian_wheezy_mips_standard.qcow2
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/vmlinux-2.6.32-5-4kc-malta
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/vmlinux-2.6.32-5-5kc-malta
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/vmlinux-3.2.0-4-4kc-malta
wget -c -P ./mipshttps://people.debian.org/~aurel32/qemu/mips/vmlinux-3.2.0-4-5kc-malta

mkdir ./mipsel
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/README.txt
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/debian_squeeze_mipsel_standard.qcow2
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/debian_wheezy_mipsel_standard.qcow2
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/vmlinux-2.6.32-5-4kc-malta
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/vmlinux-2.6.32-5-5kc-malta
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/vmlinux-3.2.0-4-4kc-malta
wget -c -P ./mipsel https://people.debian.org/~aurel32/qemu/mipsel/vmlinux-3.2.0-4-5kc-malta











```


