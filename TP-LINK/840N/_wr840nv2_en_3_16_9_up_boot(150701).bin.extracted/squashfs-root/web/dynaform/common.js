var rateTable_150M = new Array(
	"1Mbps",	1,
    "2Mbps",	1,
    "5.5Mbps", 	1,
    "6Mbps", 	6,
    "9Mbps", 	6,
    "11Mbps", 	1,
    "12Mbps", 	6,
    "13Mbps", 	8,
    "15Mbps", 	16,
    "18Mbps", 	6,
    "19Mbps", 	6,
    "24Mbps", 	6,
    "26Mbps", 	8,
    "30Mbps", 	16,
    "36Mbps", 	6,
    "39Mbps", 	8,
    "45Mbps", 	16,
    "48Mbps", 	6,
    "52Mbps", 	8,
    "54Mbps", 	6,
    "58Mbps", 	16,
    "60Mbps", 	16,
    "65Mbps", 	8,
    "90Mbps", 	16,
    "120Mbps", 	16,
    "135Mbps", 	16,
    "150Mbps", 	16,
	0,0
);

var rateTable_300M = new Array(
	"1Mbps",		1,
	"2Mbps",		1,
	"5.5Mbps",	1,
	"6Mbps",		6,
	"7Mbps",		8,
	"9Mbps",		6,
	"11Mbps",		1,
	"12Mbps",		6,
	"13Mbps",		8,
	"15Mbps",		16,
	"18Mbps",		6,
	"21Mbps",		8,
	"24Mbps",		6,
	"26Mbps",		8,
	"30Mbps",		16,
	"36Mbps",		6,
	"39Mbps",		8,
	"45Mbps",		16,
	"48Mbps",		6,
	"52Mbps",		8,
	"54Mbps",		6,
	"60Mbps",		16,
	"65Mbps",		8,
	"72Mbps",		8,
	"78Mbps",		8,
	"90Mbps",		16,
	"104Mbps",	8,
	"117Mbps",	8,
	"120Mbps",	16,
	"130Mbps",	8,
	"135Mbps",	16,
	"150Mbps",	16,
	"180Mbps",	16,
	"240Mbps",	16,
	"270Mbps",	16,
	"300Mbps",	16, 
	0,0 );

var rateTable_450M = new Array(		
	"1Mbps",		5,
	"2Mbps",		5,
	"5.5Mbps", 	1,
	"6Mbps",		6,
	"9Mbps",		6,
	"11Mbps",		1,
	"12Mbps",		6,
	"18Mbps",		6,
	"19.5Mbps",	8,
	"21.7Mbps",	8,
	"24Mbps",		6,
	"36Mbps",		6,
	"39Mbps",		8,
	"40.5Mbps",	16,
	"43.3Mbps",	8,
	"45Mbps",		16,
	"48Mbps",		6,
	"54Mbps",		6,
	"58.5Mbps",	8,
	"65Mbps",		8,
	"78Mbps",		8,
	"81Mbps",		16,
	"86.7Mbps",	8,
	"90Mbps",		16,
	"117Mbps", 	8,
	"121.5Mbps",	16,
	"130Mbps", 	8,
	"135Mbps", 	16,
	"156Mbps", 	8,
	"162Mbps", 	16,
	"173.3Mbps",	8,
	"175.5Mbps",	8,
	"180Mbps", 	16,
	"195Mbps", 	8,
	"216.7Mbps",	8,
	"243Mbps", 	16,
	"270Mbps", 	16,
	"324Mbps", 	16,
	"360Mbps", 	16,
	"364.5Mbps",	16,
	"405Mbps", 	16,
	"450Mbps", 	16,
	0,0 );
	
var operModeNum = 9;
var minOperMode = 0;
var maxOperMode = operModeNum;
var operModeList = new Array(
//value	enabled	name
	0,		1,			"Access Point",
	1,		1,			"Multi-SSID",
	2,		0,			"Multi-Bss Plus VLAN",
	3,		1,			"Client",
	4,		1,			"WDS Repeater",
	5,		1,			"Universal Repeater",
	6,		1,			"Bridge with AP",	//(wds)
	7,		0,			"Bridge with AP",//(nawds)
	8,		0,			"Debug"
);
function getOperModeName(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return null;
	}
	else
	{
		return operModeList[modeIdx*3+2];
	}
}

function operModeEnable(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function getOperModeValue(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return null;
	}
	else
	{
		return operModeList[modeIdx*3];
	}
}
function getOperModeIdxByValue(modeValue)
{
	for(var i=0; i<operModeNum; i++)
	{
		if(operModeList[i*3] == modeValue)
			return i;
	}
	return null;
}

function disableTag(obj, tag, type)
{
	try
	{
		var items = obj.getElementsByTagName(tag);
	}
	catch(e)
	{
		return;
	}
	if (type == undefined)
	{
		for (var i = 0; i < items.length; i++)
		{
			items[i].disabled = true;
		}
	}
	else
	{
		for (var i = 0; i < items.length; i++)
		{
			if (items[i].type == type)
				items[i].disabled = true;
		}		
	}
}

//setTagStr(document,'ntw_common_js')
var str_pages = parent.pages_js;
var str_main = parent.str_main;

function setTagStr(obj,page)
{
	var e, ee;
	var i, n;
	var items;
	if( (undefined==str_pages) || (undefined == str_main) )
	{
		return;
	}
	if( (undefined == obj) || (undefined == page) )
	{
		return;
	}
	for ( tag in str_pages[page] )
	{
		try
		{
			if(!window.ActiveXObject)
			{
				items = obj.getElementsByName(tag);
				if(items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].innerHTML = str_pages[page][tag];
					}
				}
				else
				{
					obj.getElementById(tag).innerHTML = str_pages[page][tag];
				}
			}
			else
			{
				items = obj.all[tag];
				if(undefined != items.length && items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].innerHTML = str_pages[page][tag];
					}
				}
				else
				{
					items.innerHTML = str_pages[page][tag];
				}
			}
		}
		catch(e)
		{
			continue;
		}
	}

	for ( btn in str_main.btn )
	{
		try
		{
						if(!window.ActiveXObject)
			{
				items = obj.getElementsByName(btn);
				if(items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].value = str_main.btn[btn];
					}
				}
				else
				{
					obj.getElementById(btn).value = str_main.btn[btn];
				}
			}
			else
			{
				items = obj.all[btn];
				//Name or TagName
				if(undefined != items.length && items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].value = str_main.btn[btn];
					}
				}
				else
				{//Id
					items.value = str_main.btn[btn];
				}
			}
		}
		catch(e)
		{
			continue;
		}
	}
}

function GetMinWidth()
{
	var i=Math.ceil((window.screen.width - 182)*0.55) - 6;
    return i;
}

function LoadHelp(helpFileName) 
{
       if(window.parent != window)
	   {
		   	if (window.parent.topFrame.hl != helpFileName)
			{
		        window.parent.topFrame.hl = helpFileName;
				window.parent.helpFrame.location.href = "/help/" + helpFileName;
			}
	   }
       return true;   
	   }

function resize(obj)
{
var minWidth = GetMinWidth();
if (window.document.body.offsetWidth > minWidth)
    {
        obj.document.getElementById('autoWidth').style.width = "100%";
    }
 else
    {
        obj.document.getElementById('autoWidth').style.width = minWidth;
    }
        return true; 
}

function resizeHelp(obj)
{
if (window.document.body.offsetWidth > 290)
    {
        obj.document.getElementById('autoWidth').style.width = "100%";
    }
 else
    {
        obj.document.getElementById('autoWidth').style.width = 290;
    }
    return true; 
}

function elementDisplay(obj, tag, disStr)
{
    	try
        {		
    		if(!window.ActiveXObject)
            {
				items = obj.getElementsByName(tag);
				if(items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].style.display = disStr;
					}
				}
				else
				{
					obj.getElementById(tag).style.display = disStr;
				}				
    		}
			else
			{
				items = obj.all[tag];
				if(undefined != items.length && items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].style.display = disStr;
					}
				}
			}
		}
		catch(e)
		{
    		return;
		}
}

function enableTag(obj, tag, type)
{
	try
	{
		var items = obj.getElementsByTagName(tag);
	}
	catch(e)
	{
		return;
	}
	if (type == undefined)
	{
		for (var i = 0; i < items.length; i++)
		{
			items[i].disabled = false;
		}
	}
	else
	{
		for (var i = 0; i < items.length; i++)
		{
			if (items[i].type == type)
				items[i].disabled = false;
		}		
	}
}

function LoadNext(FileName)
{
if(window.parent != window)
	window.parent.mainFrame.location.href = FileName;
    return true; 
}

function lastipverify(lastip,nMin,nMax)
{
	var c;
	var n = 0;
	var ch = "0123456789";
	if(lastip.length == 0)
		return false;
	for (var i = 0; i < lastip.length; i++)
    {
        c = lastip.charAt(i);
        if (ch.indexOf(c) == -1)
            return false;
    }
	if (parseInt(lastip,10) < nMin || parseInt(lastip,10) > nMax)
		return false; 		
	return true;	
}

function is_lastip(lastip_string,nMin,nMax)
{
	if(lastip_string.length == 0)
    {
        alert(js_input_ip="Please input an IP address(1-254)!");
        return false;
    }
	if (!lastipverify(lastip_string,nMin,nMax))
    {
        alert(js_bad_ip="The IP address is invalid, please input another one(1-254)!");
		return false;
	}	
	return true;
}

function maskipverify(ip_string)
{
	var c;
	var n = 0;
	var ch = ".0123456789";
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;
	for (var i = 0; i < ip_string.length; i++)
    {
		c = ip_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
		else
        {
			if (c == '.')
            {
				if(ip_string.charAt(i+1) != '.')
					n++;
				else
					return false;
			}		
		}
	}
	if (n != 3)
		return false;
   
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false; 
		
	szarray = [0,0,0,0];
	var remain;
	var i;
	for(i = 0; i < 3; i++)
    {
		var n = ip_string.indexOf('.');
		szarray[i] = ip_string.substring(0,n);
		remain = ip_string.substring(n+1);
		ip_string = remain;
	}
	szarray[3] = ip_string;
	
	var correct_range={128:1, 192:1, 224:1, 240:1, 248:1, 252:1, 254:1, 255:1, 0:1};
	for(i = 0; i < 4; i++)
	{
		if(!(szarray[i] in correct_range))
		{
			return false;
		}
	}
	if((szarray[0]==0) || (szarray[0]!=255&&szarray[1]!=0) || (szarray[1]!=255&&szarray[2]!=0) || (szarray[2]!=255&&szarray[3]!=0))
	{
		return false;
	}		
	return true;	
}

function ipverify(ip_string)
{    
	var c;
	var n = 0;
	var ch = ".0123456789";
	if(ip_string.charAt(0) == '0')
		return false;
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;     
	for (var i = 0; i < ip_string.length; i++)
    {
        c = ip_string.charAt(i);
        if (ch.indexOf(c) == -1)
            return false;
        else
        {
            if (c == '.')
            {
                if(ip_string.charAt(i+1) != '.')
                n++;
                else
                return false;
            }		
        }
    }
	if (n != 3) 
		return false;
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false;
	szarray = [0,0,0,0];
	var remain;
	var i;
    for(i = 0; i < 3; i++)
    {
        var n = ip_string.indexOf('.');
        szarray[i] = ip_string.substring(0,n);
        remain = ip_string.substring(n+1);
        ip_string = remain;
    }
	szarray[3] = remain;
	for(i = 0; i < 4; i++)
	{
		if (szarray[i] < 0 || szarray[i] > 255)
		{
            return false;
		}
	}		
    if(szarray[0]==127)
    {
        return false;
    }
    if(szarray[0] >= 224 && szarray[0] <=239)
    {
        return false;
    }	
	return true;	
}

function is_ipaddr(ip_string)
{
	if(ip_string.length == 0)
	{
        alert(js_input_ip_2="Please input an IP address!");
		return false;
	}  
	if (!ipverify(ip_string))
	{  
        alert(js_bad_ip_2="The IP address is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_gatewayaddr(gateway_string)
{
	if(gateway_string.length == 0)
	{ 
        alert(js_input_gateway="Please input the Gateway!");
		return false;
	}
	if (!ipverify(gateway_string))
	{
        alert(js_bad_gateway="The gateway is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_dnsaddr(dns_string)
{
	if(dns_string.length == 0)
    {
        alert(js_input_dns="Please input the DNS server address!");
        return false;
    }
	if (maskipverify(dns_string))
	{
		alert(js_bad_dns="The DNS server address is invalid, please input another one!");
		return false;
	}
	if (!ipverify(dns_string))
    {
        alert(js_bad_dns="The DNS server address is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_domain(domain_string)
{
	var c;
	var ch = "-.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < domain_string.length; i++)
    {
        c = domain_string.charAt(i);
        if (ch.indexOf(c) == -1)
        {
            alert(js_illegal_input="The input value contains illegal characters, please input another one!");
            return false;
        }
    }		
		return true;
}

function is_digit(digit_string)
{
	var c;
	var ch = "0123456789";
	for (var i = 0; i < digit_string.length; i++)
	{
        c = digit_string.charAt(i);
        
        if(c == " " && i ==1)
        {
            continue;
        }
        
        if(i > 0)
        {
             if(digit_string.charAt(i-1) == " " && c == " ")
             {
                continue;
             }
            
            if(digit_string.charAt(i-1) != " " && c == " ")
            {
                alert(js_illegal_input="The input value contains illegal characters, please input another one!");
                return false;
            }
        }
        
		if(ch.indexOf(c) == -1 )
		{
           if(c !=" ")
           {
                alert(js_illegal_input="The input value contains illegal characters, please input another one!");
    			return false;
           }
		}
	}
	return true;
}

function portverify(port_string)
{
	var c;
	var ch = "0123456789";
	if(port_string.length == 0)
		return false;
	for (var i = 0; i < port_string.length; i++)
    {
		c = port_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
	}
	if (parseInt(port_string,10) <= 0 || parseInt(port_string,10) > 65535)
    {
		return false;
    }
	return true;
}

function is_port(port_string)
{
	if(port_string.length == 0)
    {
        alert(js_input_port="Please input the port number (1-65535)!");
		return false;
	}
	if (!portverify(port_string))
    {
        alert(js_bad_port="The port number is invalid, please input another one(1-65535)!");
		return false;
	}	
	return true;
}

function is_number(num_string,nMin,nMax)
{
	var c;
	var ch = "0123456789";
	
	if (num_string.length == 0)
	{
		return false;
	}
	
	for (var i = 0; i < num_string.length; i++)
    {
		c = num_string.charAt(i);
		if (ch.indexOf(c) == -1)
        {
            return false;
        }
	}
	if(parseInt(num_string,10) < nMin || parseInt(num_string,10) > nMax)
    {
		return false;
    }
	return true;
}

function is_maskaddr(mask_string)
{
	if(mask_string.length == 0)
    {
        alert(js_input_mask="Please input the Subnet Mask (for example: 255.255.255.0)!");
		return false;
	}
	if (!maskipverify(mask_string))
    {
        alert(js_bad_mask="The Subnet Mask is invalid, please input another one (for example: 255.255.255.0)!");
		return false;
	}	
	return true;
}

function macverify(mac_string)
{
	var c;
	var ch = "0123456789abcdef";
	var lcMac = mac_string.toLowerCase();
	
	if (lcMac == "ff-ff-ff-ff-ff-ff")
	{
		alert(js_broadcast_mac="The MAC address is a broadcast MAC address, please input again!");
		return false;
	}
	
	if (lcMac == "00-00-00-00-00-00")
	{
		 alert(js_invalid_mac="Invalid MAC address, please input another one!");
		return false;
	}
	
	if (mac_string.length != 17)
	{
        alert(js_bad_mac_format="The MAC address format is invalid! The valid format is 'XX-XX-XX-XX-XX-XX'.");
		return false;
	}
	for (var i = 0; i < lcMac.length; i++)
    {
		c = lcMac.charAt(i);
		if (i % 3 == 2)
		{
			if(c != '-')
			{
				alert(js_bad_mac_format="The MAC address format is invalid! The valid format is 'XX-XX-XX-XX-XX-XX'.");
				return false;
			}
		}
		else if (ch.indexOf(c) == -1)
        {
            alert(js_invalid_mac="Invalid MAC address, please input another one!");
			return false;
        }
	}
	c = lcMac.charAt(1);
	if (ch.indexOf(c) % 2 == 1)
	{
		alert(js_multi_mac="The MAC address is a multicast MAC address, please input again!");
		return false;
	}	
	return true;	
}

function is_macaddr(mac_string)
{
    if(mac_string.length == 0)
    {
        alert(js_input_mac="Please input the MAC address!");
		return false;
	}
	if (!macverify(mac_string))
	{
		return false;
	}
	return true;	
}

function charCompare(szname,limit)
{
	var c;
	var l=0;
	var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@^-_.><,[]{}?/+=|\\'\":;~!#$%()` & ";
	if(szname.length > limit)
		return false;
	for (var i = 0; i < szname.length; i++)
    {
		c = szname.charAt(i);
		if (ch.indexOf(c) == -1)
        {
			l += 2;
		}
		else
		{
			l += 1;
		}
		if ( l > limit)
		{
			return false;
		}
	}
	return true;
}

function is_hostname(name_string,limit)
{
    if(!charCompare(name_string,limit))
    {
        alert(js_input_msg="You can input up to 30 characters, please input again!");
        return false;
    }
    else
    return true;
}


function is_port_range(port_value)
{

	if(port_value < 0 || port_value > 65535)
	{
        alert(js_bad_port="Invalid port value! The port must be between 1~65535, please input another one!");
		return false;
	}
	else
	{
		return true;
	}
}


var tipMsgArray = new Array(
"Start",						"Working Mode",				"Internet Access",		"WAN / 3G/4G",
"WAN Connection Type",			"3G/4G",					"Wireless operMode",	"Dual Band Selection",
"Wireless&nbsp;&nbsp;2.4G",		"Wireless&nbsp;&nbsp;5G",	"Wireless",				"Network Settings",
"Finish"
);

var startIdx = 0;
var sysModeIdx = 1;
var netInIdx = 2;
var wanOr3gIdx= 3;
var wanTypeIdx= 4;
var net3gIdx= 5;
var wlanModeIdx= 6;
var wlanBandIdx= 7;
var wlan2gIdx = 8;
var wlan5gIdx = 9;
var wlanIdx = 10;
var wiredIdx = 11;
var endIdx = 12;

var startStep = 0;
var sysModeStep = 1;
var netInStep = 2;
var wanOr3gStep= 3;
var wanTypeStep= 4;
var net3gStep= 5;
var wlanModeStep= 6;
var wlanBandStep= 7;
var wlan2gStep = 8;
var wlan5gStep = 9;
var wlanStep = 10;
var netWorkStep = 11;
var endStep = 12;

var standardRouterMode = 1;/*标准无线路由模式*/
var normal3gMode = 2;/*3G路由模式*/
var apcMode = 4;/*AP Client模式*/
var apMode = 8;/*AP模式*/
var pure3gMode = 16;/*纯3G模式*/

var type3gFirst = 0;
var type3gOnly = 1;
var typeWanFirst = 2;
var typeWanOnly = 3;

/*
此函数打印快速设置向导中的流程信息。如：开始 >> 网络接入 >> WAN口连接类型 >> 3G >> 无线 >> 完成
参数使用：
isMultiSysMode：是否是多模式机型
sysMode：目前系统工作的模式
accessType:3G模式下入网方式，如3G优先等
isDualBand:是否是双频机型
labelId：要写入流程信息的HTM标签
stepId：目前所处第几步流程
*/
function showTipMsg(isMultiSysMode, sysMode, accessType, isDualBand, labelId, stepId)
{
	var tipMsg = "<B>";
	var i = 0;
	var nextLoop = 0;
	for (i = startIdx; i <= endIdx; i++)
	{
		nextLoop = 0;
		switch (i)
		{
		case sysModeIdx:/*非多模式产品去掉这一步*/
			if (isMultiSysMode != 1)
			{
				nextLoop = 1;
			}
			break;
		case netInIdx:/*非标准3G路由器去掉这一步*/
			if (sysMode != normal3gMode)
			{
				nextLoop = 1;
			}
			break;
		case wanOr3gIdx:/*非标准3G路由器或者超过这一步的时候也去掉这一步*/
			if (sysMode != normal3gMode || stepId > i)
			{
				nextLoop = 1;
			}
			break;
		case wanTypeIdx:
			if (sysMode != standardRouterMode /*AP和纯3G路由器去掉这一步*/
				&& sysMode != normal3gMode
				&& sysMode != apcMode)
			{
				nextLoop = 1;
			}
			if (sysMode == normal3gMode && /*3G only去掉这一步*/
				(stepId <= netInIdx || accessType == type3gOnly))
			{
				nextLoop = 1;
			}
			
			break;
		case net3gIdx:/**/
			if (sysMode != normal3gMode/*AP和纯3G路由器去掉这一步*/
				&& sysMode != pure3gMode)
			{
				nextLoop = 1;
			}
			/*WAN only去掉这一步*/
			if (sysMode == normal3gMode && accessType == typeWanOnly)
			{
				nextLoop = 1;
			}
			break;
		case wlanModeIdx:/*非AP去掉这一步*/
			if (sysMode != apMode)
			{
				nextLoop = 1;
			}
			break;
		case wlanBandIdx:/*非双频路由器去掉这三步*/
		case wlan2gIdx:
		case wlan5gIdx:
			if (isDualBand != 1)
			{
				nextLoop = 1;
			}
			break;
		case wlanIdx:/*双频路由器去掉这一步*/
			if (isDualBand == 1)
			{
				nextLoop = 1;
			}
			break;
		case wiredIdx:/*非AP路由器去掉这一步*/
			if (sysMode != apMode)
			{
				nextLoop = 1;
			}
			break;
		default:
			break;
		}
		if (nextLoop)
		{
			continue;
		}
		if (i != 0)
		{
			tipMsg += " &gt;&gt; ";
		}
		if (stepId == i)
		{
			tipMsg += "<span class=\"STYLE1\">" + tipMsgArray[i] + "</span>"
		}
		else
		{
			tipMsg += tipMsgArray[i];
		}
	}
	tipMsg += "</B>";
	document.getElementById(labelId).innerHTML = tipMsg;
}

//#########FOR IPV6############//
/*added by ZQQ, 2011.12.24*/
function checkIpAddressFormat(address) { 
   var i = 0, num = 0;
   var blankNum = 0;	/* the number of  "::" symbol */

   var patten = /[^a-fA-F0-9:]/ig;

	if (address[address.length - 1] == ':')
	{
		return false;
	}
   if (address.match(patten) != null)
	{
	  return false;
	}

	if (address.indexOf(":::") != -1)
	{
		return false;
	}

   addrParts = address.split(':');
   	
   if (addrParts.length < 3 || addrParts.length > 8)
      return false;

   for (i = 0; i < addrParts.length; i++) 
   {
   	  if (addrParts[i].length > 4)	/* the length of each part can be 0~4, that is both "::" and ":234:" is OK. */
	  	 return false;
      if (addrParts[i] != "")
      {
         if (i == 8)
		 	return false;
      }
	  else 
	  {
	     if (i != 0 & i != addrParts.length - 1)	/* only one "::" symbol is allow. */
	  	    blankNum += 1;
	  	 
	  	 if (blankNum > 1)
	  	 {	
	  	 	return false;
	  	 }
	  }
   }

   if (blankNum == 0)	/* if the address dost't contain "::" symbol to decrease the length, 8 parts are need to write. */
   {
      if (addrParts.length != 8)
	     return false;
   }
   else
   {
      if (addrParts.length > 9)	/* if the address contain "::" symbol, the number of parts need to be no more than 9. */
		 return false;
   }
   
   return true;
}


function isValidIPv6Prefix(prefix)
{
	var addrparts;
	var num;
	var patten = /[^a-fA-F0-9:]/ig;
	var val = 0;
	var i = 0;
	
	if(prefix.length == 0)
	{
		alert("Blank prefix, please input an IPv6 address prefix.");
		return false;
	}
	if (prefix.indexOf(":::") != -1)
	{
		alert("\"" + prefix + "\"" + " is an invalid IPv6 address prefix format, please check it.");
		return false;
	}
	
	if (prefix.match(patten) != null)
	{
		alert("\"" + prefix + "\"" + " has invalid characters, please check it.");
		return false;
	}

	if (prefix.charAt(prefix.length - 1) != ":" || prefix.charAt(prefix.length - 2) != ":")
	{
		alert("\"" + prefix + "\"" + " is an invalid IPv6 address prefix format, please check it.");
		return false;
	}
	addrParts = prefix.split('::');

	if (addrParts.length >=3)
	{
		alert("\"" + prefix + "\"" + " should not have more than two \"::\", please check it.");
		return false;
	}
	
   addrParts = prefix.split(':');
   if(addrParts.length >= 7 || addrParts.length < 3)
   {
		alert("\"" + prefix + "\"" + " is an invalid IPv6 address prefix format, please check it.");
		return false;
   }
 
   if (addrParts[0] == "2002")
   {
      alert("Prefix starting with \"2002\" is reserved for using in 6to4 network, please check it.");
      return false;
   }
  
	for(i = 0; i <addrParts.length; i++)
	{
		if(addrParts[i].length > 4)
		{
			alert("\"" + prefix + "\"" + " has an invalid section "+ addrParts[i] + ", please check it.");
			return false;
		}
	}
	
	val = parseInt(addrParts[0], 16);
	
	if (val >> 13 != 0x001)
   {
		alert("\"" + prefix + "\"" + " is not an IPv6 address prefix, please check it.");
		return false;
   }
	
	/*
	if (addrParts.length > 1)
	{
		if (0x2001 == val && 0x0db8 == parseInt(addrParts[1], 16))
   {
			alert("\"" + prefix + "\"" + " is a reserved public IPv6 address prefix, please fill up a valid address.");
		return false;
   }
	}
	*/
	
	if (0x2D00 == val || 0x2E00 == val || 0x3000 == val)
	{
		alert("\"" + prefix + "\"" + " is a reserved public IPv6 address prefix, please fill up a valid address.");
		return false;
	}
	
	/*
	if (0x3ffe == val)
	{
		alert("\"" + prefix + "\"" + " is an unused public IPv6 address prefix, please fill up a valid address.");
		return false;
	}
	*/
	
	return true;
}

function isGlobalUnicastAddressesPrefix(address)
{
	var addrparts;
	var num;
	var val = 0;
	addrParts = address.split(':');
	val = parseInt(addrParts[0], 16) >> 13;

	if (val != 0x001)
		return false;
	else
		return true;
}

function isValidPart(val)
{
	var patten = /[^a-fA-F0-9:]/ig;
	
	if (0 == parseInt(val, 16) || 0xFFFF == parseInt(val, 16))
		return false;
	if (val.match(patten) != null)
		return false;
	else
		return true;
}

function isPubIPv6Addr(address){
	var addrparts;
	var num;
	var patten = /[^a-fA-F0-9:]/ig;
	var val = 0;
	
   addrParts = address.split(':');

	/* check ::1/128 ::/128 ::/0 */
	if (addrParts[0] == "" & addrParts[1] == "")
	{	
		if (addrParts.length == 2)
		{
			return false;							/* ::/128 ::/0 */
		}
		
		if (parseInt(addrParts[2],16) == 1)
		{
			return false;							/* ::1/128 */
		}
			
		if (parseInt(addrParts[2], 16) == 0xFFFF)
		{
			return false;
	}
	}
	
	if (addrParts[addrParts.length - 1] == "" && addrParts[addrParts.length - 2] =="")
   {
		return false;
   }
	
	val = parseInt(addrParts[0], 16);
	if (val == 0x0100 || val == 0x0200 || val == 0x0400 || val ==0x0800 || val == 0x1000 || (val >= 0x4000 && val <= 0xC000) || val == 0xE000
	|| val == 0xF000 || val == 0xf800 || val == 0xFC00 || val == 0xFE00 || val == 0xFE80 || val == 0xFEC0 || val == 0xFF00)
	{
		return false;
	}
	
	if ((parseInt(addrParts[0], 16) >> 6) == 0x5f00)
	{
		return false;
	}
		
	/*
	if ((parseInt(addrParts[0], 16) >> 6) == 0x3ffe)
	{
		return false;
	}
	*/
	
	/* check fe80::/10 */
	if ((parseInt(addrParts[0], 16) >> 6) == 0x3fa)
	{
		return false;
	}
	
	/* check fc00::/7 */
	if ((parseInt(addrParts[0], 16) >> 9) == 0x7e )
	{
		return false;
	}
	
	/* check 2001:db8::/32 */
	//if (parseInt(addrParts[0], 16) == 0x2001 & parseInt(addrParts[1], 16) == 0xdb8 )
	//	return false;
	
	/* check 2001:10::/28 */
	//if (parseInt(addrParts[0], 16) == 0x2001 & (parseInt(addrParts[1], 16) >> 4) == 1 )
	//	return false;
		
	/* check ff00::/8 */
	if ((parseInt(addrParts[0], 16) >> 8) == 0xff)
	{
		return false;
	}
		
	/* check 64:ff9b::/96  
	 * three condition 64:ff9b::xxxx/96 64:ff9b::xxxx:xxxx/96 64:ff9b::/96*/
	if (parseInt(addrParts[0], 16) == 0x64 & parseInt(addrParts[1], 16) == 0xff9b & addrParts[2] == "")
	{
		if (addrParts.length <= 5)
		{
			return false;
	}
	}
		 
	return true;
}

function isReservedIpAddress(address)
{
	/*check the IP is reserverd ip address*/
	var addrparts;
	var num;
	var val = 0;
	addrParts = address.split(':');
	
	/*http://www.iana.org/assignments/ipv6-unicast-address-assignments/ipv6-unicast-address-assignments.xml*/
	/*2001:db8/32 documentation-only prefix  in the IPv6*/
	/* IPv6 Ready Logo is need this address
	val = parseInt(addrParts[0], 16);
	if (0x2001 == val && 0x0db8 == parseInt(addrParts[1], 16))
	{
		return true;
	}
	*/
	val = parseInt(addrParts[0], 16);
	if (0x2D00 == val || 0x2E00 == val || 0x3000 == val)
	{
		return true;
	}
	return false;
}
 
function isUnusedIpAddress(address)
{
	var addrparts;
	var num;
	var val = 0;
	addrParts = address.split(':');
	val = parseInt(addrParts[0], 16);
	/* ipv6 logo test need this ip
	if (0x3ffe == val)
	{
		return true;
	}
	*/
	return false;
}

function isGlobalIPv6Addr(address)
{
	var addrParts;
	addrParts = address.split(':');
	
	if (addrParts[0] == "2002")
	{
		alert("\"" + address + "\"" + " is a 6to4 tunnel address, it can not be configured manually, please fill up another address.");
		return false;
	}
	
	if (false == checkIpAddressFormat(address))
	{
		alert("\"" + address + "\"" + " is not an IPv6 address, please fill up a valid address.");
		return false;
	}
	else if (false == isPubIPv6Addr(address))
	{
		alert("\"" + address + "\"" + " is not a public IPv6 address, please fill up a valid address.");
		return false;
	}
	else if (false == isGlobalUnicastAddressesPrefix(address))
	{
		alert("\"" + address + "\"" + " is not a public IPv6 address, please fill up a valid address.");
		return false;
	}
	else if (true == isReservedIpAddress(address))
	{
		alert("\"" + address + "\"" + " is a reserved public IPv6 address, please fill up a valid address.");
		return false;
	}
	else if (true == isUnusedIpAddress(address)) 
	{
		alert("\"" + address + "\"" + " is an unused IPv6 address, please fill up a valid address.");
		return false;
	}
	
	return true;
}

var transMatrixHTML = new Array(
	/&/g, "&amp;",
	/\\/g, "&#92;",
	/'/g, "&#39;",
	/"/g, "&quot;",
	/</g, "&lt;",
	/>/g, "&gt;",
	/ /g, "&nbsp;"
);
function escapeHtml(str)
{
    var r = str.toString();
	for (var i = 0; i < transMatrixHTML.length; i+=2)
	{
		r = r.replace(transMatrixHTML[i], transMatrixHTML[i+1]);
	}
	return r;
}

