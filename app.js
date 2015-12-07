var restify = require('restify');                //创建restify服务器框架
var Db = require('mysql-activerecord');          //使用mysql-activerecord数据库

var db = new Db.Adapter({
    server: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'news',
    reconnectTimeout: 2000
  });

if(!db){
  console.log('Mysql connecting error !');
}


var server = restify.createServer();              //创建服务
server.use(restify.queryParser());                //启用数据解析查找服务

server.get('/sql',respond);                       //欢迎测试
server.get('/sql/get',query);                     //查询接口
server.get('/sql/select/:index',select);          //精确查询接口
server.get('/sql/insert',insert);                 //插入接口
server.get('/sql/update',update);                 //修改接口
server.get('/sql/delete/:index2',deleteOne);      //删除接口
server.get('/sql/login/:name/:password',login);   //登陆验证接口

server.listen(3900, function() {                  //启动3900端口监听
  console.log('%s listening at %s', server.name, server.url);
});

//html字符转义过滤函数
function htmlEncode(str) {  
    return str.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;");  
}  


//欢迎测试函数
function respond(req, res, next) {

  res.charSet('utf-8');                               //避免乱码
  res.setHeader('Access-Control-Allow-Origin','*');   //跨域通信
  res.send('hello ! welcome to the world ! ');
}


//登陆用户密码验证函数
function login(req, res, next) {

  var msg;
  // 过滤用户名和密码
  var namex = htmlEncode(req.params['name']);
  var passwordx = htmlEncode(req.params['password']);

  db.where({ 'name': namex}).get('login', function(err, results, fields) {

    res.charSet('utf-8');
    res.setHeader('Access-Control-Allow-Origin','*');

    if (passwordx == results[0].password) {
        msg = '1';
      }else{
        msg = '0';
    }
    res.send(msg);
    // res.send(req.params['password']);
  });
}


// 查询函数
function query(req, res, next) {

  db.where(true).get('newslist', function(err, results, fields) {

    res.charSet('utf-8');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(results);
  });
}


// 精确查找函数
function select(req, res, next) {

  // 过滤索引
  var idx = htmlEncode(req.params['index']);

  db.where({ 'id': idx}).get('newslist', function(err, results, fields) {

    res.charSet('utf-8');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(results);
  });
}


// 记录函数
function insert(req, res, next) {

  // 过滤前端通过ajax传递过来的数据
  var urlx = htmlEncode(req.params['url']);
  var picx = htmlEncode(req.params['pic']);
  var titlex = htmlEncode(req.params['title']);
  var contentx = htmlEncode(req.params['content']);
  var timex = htmlEncode(req.params['time']);
  var topicx = htmlEncode(req.params['topic']);

  db.insert('newslist', { 'url': urlx, 'pic': picx,'title' :titlex ,'content' :contentx ,'time' :timex ,'topic' :topicx }, function(err,info) {
    if (!err) {
      console.log('INSERT success !');
    }
  });

}


// 修改函数
function update(req, res, next) {

  // 过滤前端通过ajax传递过来的数据
  var urlx = htmlEncode(req.params['url']);
  var picx = htmlEncode(req.params['pic']);
  var titlex = htmlEncode(req.params['title']);
  var contentx = htmlEncode(req.params['content']);
  var timex = htmlEncode(req.params['time']);
  var topicx = htmlEncode(req.params['topic']);
  var idx = htmlEncode(req.params['id']);

  db.where({ 'id': idx}).update('newslist', { 'url': urlx, 'pic': picx,'title' :titlex ,'content' :contentx ,'time' :timex ,'topic' :topicx }, function(err,info) {
    if (!err) {
      console.log('UPDATE success !');
    }
  });

}


// 删除函数
function deleteOne(req, res, next) {

  // 过滤索引
  var index = htmlEncode(req.params['index2']);

  db.where({ 'id': index}).delete('newslist', function(err) {
    if (!err) {
      console.log('Deleted success !');
    }
  });

}




