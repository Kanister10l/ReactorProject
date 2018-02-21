var WindowsSize = $(window).width();
if (WindowsSize  < 900){
 
    $(document).ready(function(){
    
    $(".menu_open").on('click', function(){
        $('.menu_close').css("display","block");
        $('.menu_open').css("display","none");
        $('nav').css('height','300px');
       
        
    });
    
    $(".menu_close").on('click', function(){
        $('.menu_open').css("display","block");
        $('.menu_close').css("display","none");
        $('nav').css('height','60px');
       
        
    });
});
    
}