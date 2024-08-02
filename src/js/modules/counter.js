$(".counter__input").on("input", function() {
    if (Number($(this).val()) < Number($(this).attr("min"))) {
        $(this).val($(this).attr("min"))
        $(this).parents(".counter").find(".counter__minus").addClass("disabled")
    } else {
        $(this).parents(".counter").find(".counter__minus").removeClass("disabled")
    }
    
    if (Number($(this).val()) > Number($(this).attr("max"))) {
        $(this).val($(this).attr("max"))
        $(this).parents(".counter").find(".counter__plus").addClass("disabled")
    } else {
        $(this).parents(".counter").find(".counter__plus").removeClass("disabled")
    }

})

$(".counter__minus").on("click", function() {
    if ($(this).hasClass("disabled")) { return }
    let input = $(this).parents(".counter").find(".counter__input"),
        val = Number(input.val()),
        min = Number(input.attr("min")),
        max = Number(input.attr("max"))
    
    input.val(val - 1)
    $(".counter__plus").removeClass("disabled")

    if (val - 2 < min) { 
        $(this).addClass("disabled")
        return 
    }


})

$(".counter__plus").on("click", function() {
    if ($(this).hasClass("disabled")) { return }
    let input = $(this).parents(".counter").find(".counter__input"),
        val = Number(input.val()),
        min = Number(input.attr("min")),
        max = Number(input.attr("max"))
    
    input.val(val + 1)
    $(".counter__minus").removeClass("disabled")

    if (val + 2 > max) { 
        $(this).addClass("disabled")
        return 
    }


})