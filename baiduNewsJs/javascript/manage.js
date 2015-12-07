$(document).ready(function(){

    var state = 5; //判断登陆验证的状态变量
    $('#exampleInputName').focus();
    // ajax发送用户名和密码至后台判断登陆凭证
    $('#loginBtn').unbind('click').click(function(e){
        
        if ($('#exampleInputName').val()&&$('#exampleInputPassword').val()) {
            e.preventDefault();  //组织默认刷新事件
            $.ajax({

                url:'http://127.0.0.1:3900/sql/login/'+$('#exampleInputName').val()+'/'+$('#exampleInputPassword').val(),
                
                dataType:'json',
                type:'get',
                success:function(data){

                    console.info(data);
                    if (data == '1') {
                        window.open('next/mian.html','_self');//若后台验证成功，跳转到管理页面
                    }else{
                        alert('密码错误!');
                        $('#exampleInputName').val('');
                        $('#exampleInputPassword').val('');
                        $('#exampleInputName').focus();
                    };
                    
                },
                error:function(data){
                    alert('没有该用户!');
                    $('#exampleInputName').val('');
                    $('#exampleInputPassword').val('');
                    $('#exampleInputName').focus();
                }
            })
        };
        
    });
});