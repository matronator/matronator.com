$(function(){

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose: false
        });
    });

    $(".menuitem").click(function(e) {
        if ($(this).hasClass("toggled") == true) {
            if (e.target == this) {
                $(".menuitem").not(this).each(function() {
                    $(this).removeClass("toggled");
                });
    
                $(this).toggleClass("toggled");
    
    
                $(".menuitem").each(function() {
                    $(this).find(".contentdiv").addClass("hidden");
                });
                $(".toggled").find(".contentdiv").removeClass("hidden");
            }
        } else {
            $(".menuitem").not(this).each(function() {
                $(this).removeClass("toggled");
            });

            $(this).toggleClass("toggled");


            $(".menuitem").each(function() {
                $(this).find(".contentdiv").addClass("hidden");
            });
            $(".toggled").find(".contentdiv").removeClass("hidden");
        }
    });

});