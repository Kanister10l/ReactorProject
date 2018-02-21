var WindowsSize = $(window).width();
if(WindowsSize > 900){
    $(window).scroll(
    
    function() {
        
    var scroll = $(window).scrollTop();
        
    if (scroll >= 200) {
        $("nav").addClass("nav2");
        $("#home img").addClass("name2");
        $("#imgup").addClass("upslide2");
    } else {
        $("nav").removeClass("nav2");
        $("#home img").removeClass("name2");
        $("#imgup").removeClass("upslide2");
    }    
}
);
}