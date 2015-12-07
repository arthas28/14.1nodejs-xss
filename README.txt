一，启动方式

1，news.sql为作业的数据库，node app.js启动服务端，通过14.1nodejs-xss/baiduNewsJs/manage.html文件进行登录，用户（admin），密码（123）。

2，登录后main.html为后台系统管理页面。

3，baiduNews.html为手机端页面。


一，完善安全性漏洞部分

前端部分：1：14.1nodejs-xss/baiduNewsJs/javascript/main.js里从服务端获取数据内容进行filterXSS过滤，有效预防了xss存储型注入攻		     击。
	  2：14.1nodejs-xss/baiduNewsJs/javascript/baiduNews.js里从服务端获取数据内容进行filterXSS过滤。
	  3：定义了htmlDecode将数据库被转义的符号反转义，以便在html页面中可正确显示。在main.js末尾处运用。

后台部分：1：14.1nodejs-xss/app.js 定义了html字符转义过滤函数htmlEncode，可将前端传来的数据过滤处理后再保存至数据库。
