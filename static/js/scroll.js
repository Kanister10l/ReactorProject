$(document).ready(function(){
    
    $("a").on('click', function(){ // au clic sur les liens
        
        var cible = $(this).attr('href'); //cible au scroll
       
        $("html,body").animate({ //animation du scroll
            scrollTop: $(cible).offset().top
        },1000);
        
        return false;
    });
});