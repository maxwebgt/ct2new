ct_init();  // MAIN ACTIVATE

function ct_init() {

   //main block name
   mbName = 'ct_main';

    $(document).on("click", "", (e) => {
        console.log(e.pageX + ' ' + e.pageY);
        //пишем функцию которая по клику на елемент будет подсвечивать его
        // $('[clicktune-active-element]').removeAttr('clicktune-active-element').css('border', 'none');
        // $(e.target).css('border','1px solid black').attr('clicktune-active-element', '');

        ct_highlight(e.target);

        // $(document.createElement('div'))
        //     .css({"position" : "absolute", "left" : e.pageX, "top" : e.pageY})
        //     .appendTo(document.body)
        //     .attr('id', mbName)
        //     .html('asdasdasd');


        cl_gHtml(mbName, 'div', 'zz', {"position" : "absolute", "left" : e.pageX, "top" : e.pageY}, {"value":"123"}, document.body)
        cl_gHtml('hztestid', 'input', '', {}, {"type":"range","value":""}, $("#" + mbName))
    })
};





function ct_highlight(e) {
    $('[clicktune-active-element]').removeAttr('clicktune-active-element').css('border', 'none');
    $(e).css('border','1px solid black').attr('clicktune-active-element', '');
}


function cl_gHtml(id, tag, html, css, attr, target) {
    console.log(target);
    $(document.createElement(tag))
        .attr('id', id)
        .html(html)
        .css(css)
        .attr(attr)
        .appendTo(target);
}