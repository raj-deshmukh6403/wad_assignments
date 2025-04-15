$(document).on("pagecreate", function() {
    // Global configuration for transitions
    $.mobile.defaultPageTransition = "slide";
    
    // Handle page transitions
    $(document).on("pagebeforeshow", function(event, ui) {
        console.log("Loading page: " + event.target.id);
    });
    
    // Handle device orientation changes
    $(window).on("orientationchange", function(event) {
        if (event.orientation === "portrait") {
            $(".content").css("padding", "10px");
        } else {
            $(".content").css("padding", "20px");
        }
    });
    
    // Initialize custom components
    $("[data-role='navbar']").navbar();
    $("[data-role='listview']").listview();
    $("[data-role='collapsible']").collapsible();
    $("[data-role='collapsible-set']").collapsibleset();
});