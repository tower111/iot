#include<stdio.h>
#include<assert.h>
 
int main()
{
	char a[]="aaaae";
	char b[]="";
	int i=strcmp(a,b);//不同返回-1相同返回0
	printf("%d\n",i);
	//相同返回-1不同返回0
	int j=strncmp(a,b,1);//只比较前n个字符
 
	printf("%d\n",j);
 
	return 0;
}
