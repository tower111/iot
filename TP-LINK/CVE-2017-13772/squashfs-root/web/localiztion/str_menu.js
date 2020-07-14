var str_menu =   new Object()

str_menu.status							=  "Status";				
str_menu.wizard							=  "Quick Setup"; 
//added by zqq,07.11.22
str_menu.wpsCfg                        =   "WPS";
	
//end	
str_menu.band							= "Dual Band Selection";
str_menu.ntwMain						=  "Network";
str_menu.ntwConnMode					=  "Internet Access"; 
str_menu.ntwMobile						=  "3G/4G";			
str_menu.ntwWan							=  "WAN";
str_menu.ntwIptv						=	"IPTV"; 		
str_menu.ntwService						=  "Network Service Detection";  											
str_menu.ntwMacClone					=  "MAC Clone";
str_menu.ntwLan							=  "LAN";
//added by kuangguiming 24Oct13
str_menu.ntwRussiaVlan					=	"IPTV"; 
//end add by kuangguiming 24Oct13		 
str_menu.ntwFlowBalace					=  "Flow Balance";		
str_menu.ntwBandWidth					=  "Bandwidth"; 		
str_menu.ntwVlan						=  "VLAN"; 			
str_menu.ntwPrtMonitor					=  "Port Mirror";		
str_menu.ntwPrtPara						=  "WAN Port Parameter";
str_menu.wlanMain						=  "Wireless";
//add by zhanglipeng 2010-01-06
str_menu.workingModeRpm					=  "Working Mode";
//end add 2010-01-06
str_menu.wlanNetwork					=  "Wireless Settings";
str_menu.wlanMacFlt						=  "Wireless MAC Filtering";
//added by zqq,07.11.22
str_menu.wlanAdvCfg                     =  "Wireless Advanced";
//end
str_menu.wlanStation					=  "Wireless Statistics";
str_menu.wlanSecurityRpm                =  "Wireless Security";
                                         		
//add by Rugemeng 20120903
//str_menu.guestNetwork					=  "Guest Network";
//end add        

//add for Guest_Network
str_menu.guestNetCfg					=  "Guest Network";
str_menu.guestNetWirelessCfg			=  "Wireless Settings";
str_menu.guestNetUsbCfg					=  "Storage Sharing";
//end for add

str_menu.dhcpServerMain					=  "DHCP";				
str_menu.dhcpServer						=  "DHCP Settings";	
str_menu.dhcpList						=  "DHCP Client List";
str_menu.dhcpFixMap						=  "Address Reservation";  

/* added by kuangguiming 26Sep12 for WR842ND2.0 VPN */
str_menu.vpnMain						=  "VPN";
str_menu.vpnIke							=  "IKE";
str_menu.vpnIpsec						=  "IPsec";
str_menu.vpnSaList						=  "Security Alliance List";
/* end add by kuangguiming 26Sep12 */

// modified by HouXB
str_menu.nasMain						=	"USB Settings";
str_menu.nasCfg							= 	"Storage Sharing";
//added by Zhao C.F.
str_menu.nasFtpCfg						=	"FTP Server";
str_menu.nasUserCfg						= 	"User Accounts";
                                         
/* add media server menu by HouXB, 16Sep10 */
str_menu.nasMediaSvCfg					=	"Media Server";
/* end add by HouXB, 16Sep10 */

/* added by tf, 110421 */
str_menu.nasPrintSvCfg					=	"Print Server";
/* end added */

//added by hwz,2010-11-22 
str_menu.nat							=	"NAT";

// port mirror
str_menu.portMirror                     =	"Port Mirror";

str_menu.frwVrtMain						=  "Forwarding"; 			
str_menu.frwVrtServer					=  "Virtual Servers";	
str_menu.frwSpcApp						=  "Port Triggering"; 
str_menu.frwDMZ							=  "DMZ";
/* for Smart DMZ */
str_menu.frwSmartDMZ					=  "DMZ/Smart DMZ";                                	                        
str_menu.frwUpnp						=  "UPnP";	
                                         	
// Added by WSY
str_menu.securityMain					=	"Security";
str_menu.basicSecurity					=	"Basic Security";
str_menu.localManageControl				=	"Local Management";	
                                         	
str_menu.scrWzdFrwMain					=  "Security";		
str_menu.scrWzdFrw						=  "Firewall WzdN"; 
str_menu.scrFrwMain                     =  "Security"; 			
str_menu.scrFrw							=  "Firewall";
str_menu.scrWanIpFlt					=  "IP Filtering";
str_menu.scrDomainFlt					=  "Domain Filtering"		
str_menu.scrmacFlt						=  "MAC Filtering";
str_menu.scrMagControl					=  "Remote Management";			
str_menu.scrScreen						=  "Screen"; 	
str_menu.scrAdvScr						=  "Advanced Security";
str_menu.scrPing						=  "Ping"; 		                       		                  
str_menu.scrWanPing						=  "WANPingN";	
                                         		
//add by caishaoji, 08.11.31
str_menu.parentCtrl					=	"Parental Control";
str_menu.yandexDns					=	"Yandex DNS";

str_menu.accCtrlMain					=	"Access Control";
str_menu.accCtrlHost					=	"Host";
str_menu.accCtrlTarget					=	"Target";
str_menu.accCtrlTime					=	"Schedule";
str_menu.accCtrlMan					=	"Rule";
//add end	
                                         		
str_menu.staRoute						=  "Advanced Routing";
str_menu.staRouteTable                  =   "Static Routing List";
str_menu.sysRouteTable					=   "System Routing Table";
                                         	
str_menu.sessionMain					=  "Session Limit";	
str_menu.sessionLimit					=  "Session Limit";
str_menu.sessionList					=  "Session List"; 
   
str_menu.QosCfgMain						=  "Bandwidth Control";	
str_menu.QosCfg							=  "Control Settings";	
str_menu.QosRuleList					=  "Rule List";
      
str_menu.lanArpMain						=  "IP & MAC Binding";		
str_menu.lanArpBind						=  "Binding Settings"; 	
str_menu.lanArpList						=  "ARP List"; 		
         
str_menu.ddnsAddMain					=  "Dynamic DNS";
   
                                         	
str_menu.swtMain						=  "Switch Settings"; 	
str_menu.swtPortSta						=  "Port Statistics"; 	
str_menu.swtPortMirror					=  "Port Mirror"; 		
str_menu.swtPortRateSet					=  "Port Rate Setting";
str_menu.swtPortPara					=  "Port Setting";		
str_menu.swtPortStatus					=  "Port Status";		
     
str_menu.swtPortBaseVlan				=  "Port VLAN";
                                         		
//For IPv6 functions, added by ZQQ, 11.03.17
str_menu.ipv6Conf						=	"IPv6 Support";
str_menu.ipv6Lan						=	"IPv6 Status";
str_menu.ipv6Wan						=	"IPv6 Setup";
//end add by ZQQ, 11.02.17

                                         		
str_menu.systoolMain					=  "System Tools";	
str_menu.sysTime						=  "Time Settings";			
str_menu.sysDiagnostic					=  "Diagnostic";
str_menu.sysSoftUpgrade					=  "Firmware Upgrade";
str_menu.sysRstDefault					=  "Factory Defaults";
                                         
str_menu.sysBackupRst					=  "Backup & Restore";
                                        		
str_menu.sysReboot						=  "Reboot";
str_menu.tr069Settings					=  "TR069";
str_menu.sysPassword					=  "Password";
str_menu.sysLog							=  "System Log";
str_menu.sysWatchDog				=  "Ping Watch Dog";
str_menu.snmp							= "SNMP";
                                         
str_menu.sysLogSet						=  "Syslog Setting";

str_menu.sessionRefresh                 =  "Session Refresh";
                                         
str_menu.sysManageCnt					=  "Remote Management";
                                         
str_menu.sysSta							=  "Statistics";

str_menu.wanSpdDet						= "WAN Speed Detect";

str_menu.natShow						=  "NAT Show";

str_menu.natSrcPortSetting				= "NAT Source Port Configuration";
                                       
str_menu.ProductMain					=  "ProductN";

str_menu.wanBalancePolicy				= "Balance Policy";
str_menu.logout							= "Logout";
