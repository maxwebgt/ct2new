ct_init();  // MAIN ACTIVATE

function ct_init() {

   //config
    mconf = {
        "enable" : true,
        "opened" : true
    };
    opt = {
        "opacity" : true
    };

    //main block name
    mbName = 'ct_main';

    $(document).on("click", (e) => {
        console.log(e.pageX + ' ' + e.pageY);

        // если клик по нашим элементам то не запускать функцию генерации элементов
        if ($(e.target).closest('#'+mbName).length) return;

        if ( mconf.enable ) {

            ct_highlight(e.target);
            cl_gElemControl(e);
        }

        //пишем функцию которая по клику на елемент будет подсвечивать его


    })
};


function cl_gElemControl(e) {
    mconf.opened = true;
    cl_gHtml(mbName, 'div', '', {"position" : "absolute", "left" : e.pageX, "top" : e.pageY, "width" : "300px"}, {"value":"123"}, document.body)

    if (opt.opacity) {

        cl_gHtml('cl_block-opacity', 'div', '', {"position" : "relative"}, {}, $("#" + mbName));

        cl_gHtml('', 'div', 'opacity', {}, {}, $("#cl_block-opacity"));

        cl_gHtml('', 'input', '', {}, {
            "type" : "text",
            "value" : getComputedStyle(e.target).opacity
        }, $("#cl_block-opacity")).on("input change", this, (event) => {
            $(e.target).css('opacity', event.target.value);
        })

        cl_gHtml('', 'input', '', {}, {
            "type" : "range",
            "min" : "0",
            "max" : "1",
            "step" : "0.01",
            "value" : getComputedStyle(e.target).opacity
        }, $("#cl_block-opacity")).on("input change", this, (event) => {
            $(e.target).css('opacity', event.target.value);
            $("#cl_block-opacity").children().attr("value", event.target.value);
        })
    }

}


function ct_highlight(e) {
    $('#' + mbName).remove();
    $('[clicktune-active-element]').removeAttr('clicktune-active-element').css('border', 'none');
    $(e).css('border','1px solid black').attr('clicktune-active-element', '');
}


function cl_gHtml(id, tag, html, css, attr, target) {
    console.log(target);
     return $(document.createElement(tag))
        .attr('id', id)
        .html(html)
        .css(css)
        .attr(attr)
        .appendTo(target);
}