function checkControls(el) {
    $(el).parents(".counter").find(".counter__minus").removeClass("disabled")
    $(el).parents(".counter").find(".counter__plus").removeClass("disabled")

    if (Number($(el).val()) < Number($(el).attr("min"))) {
        $(el).val($(el).attr("min"))
        $(el).parents(".counter").find(".counter__minus").addClass("disabled")
    } 
    if (Number($(el).val()) == Number($(el).attr("min"))) {
        $(el).parents(".counter").find(".counter__minus").addClass("disabled")
    } 

    if (Number($(el).val()) > Number($(el).attr("max"))) {
        $(el).val($(el).attr("max"))
        $(el).parents(".counter").find(".counter__plus").addClass("disabled")
    }
    if (Number($(el).val()) == Number($(el).attr("max"))) {
        $(el).parents(".counter").find(".counter__plus").addClass("disabled")
    }
}

function markAsLastClick(el) {
    $(".counter__input").removeAttr("data-last-click")
    $(el).attr("data-last-click", "")

}

function checkBind(el) {
    
    if (!$(el).attr('data-bind-child') && !$(el).attr('data-bind-parent')) { return }

    let mainEl
    $(el).attr('data-bind-child') ? mainEl = $(el) : mainEl = $(`#${$(el).attr('data-bind-parent')}`)
    let bindEl = $(`#${mainEl.attr('data-bind-child')}`)

    if (bindEl.val() > mainEl.val()) {
        typeof mainEl.attr('data-last-click') !== 'undefined' ? bindEl.val(mainEl.val()) : mainEl.val(bindEl.val())
    }
    
    checkControls(mainEl[0])
    checkControls(bindEl[0])
}

$(".counter__input").on("input", function() {
    markAsLastClick(this)
    checkControls(this)
    checkBind(this)
})
$(".counter__input").each(function(i, el) {
    checkControls(el)
    checkBind(el)
})

$(".counter__minus").on("click", function() {
    if ($(this).hasClass("disabled")) { return }
    let input = $(this).parents(".counter").find(".counter__input"),
        val = Number(input.val()),
        min = Number(input.attr("min"))
    
    input.val(val - 1)
    $(this).parents(".counter").find(".counter__plus").removeClass("disabled")

    markAsLastClick($(this).parents(".counter").find(".counter__input"))
    checkBind($(this).parents(".counter").find(".counter__input"))


    if (val - 2 < min) { 
        $(this).addClass("disabled")
        return 
    }

})

$(".counter__plus").on("click", function() {
    if ($(this).hasClass("disabled")) { return }
    let input = $(this).parents(".counter").find(".counter__input"),
        val = Number(input.val()),
        max = Number(input.attr("max"))
    
    input.val(val + 1)
    $(this).parents(".counter").find(".counter__minus").removeClass("disabled")

    markAsLastClick($(this).parents(".counter").find(".counter__input"))
    checkBind($(this).parents(".counter").find(".counter__input"))

    if (val + 2 > max) { 
        $(this).addClass("disabled")
        return 
    }
})