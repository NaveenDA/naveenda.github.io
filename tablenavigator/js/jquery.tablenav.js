
/*
*
*
* author : NaveenDA
* github : github.com/NaveenDA/tablenav
* demo   : github.io/NaveenDA/tablenav
*
*/
(function ($) {
  "use strict";
    $.fn.tablenav = function( options ) {

        // Default options
        var settings = $.extend({
            input:false,
            click:true,
            background:'#e7fac6',
			cclick:false,
			zindex:12,
            class:'grid-table-clicked',
            select:true,
			row:false
        }, options); 

var selector    = this.selector;
$(this.selector+" tr").each(function(row, el) {
	$(this).attr('data-row', "row_"+row);
	$(this).children().each(function(col, el) {
		$(this).attr('data-col', "col_"+col).attr('data-element', 'row_'+row+'_col_'+col);
	});
});

$("body").append('<style>.'+settings.class+'{background: '+settings.background+' !important;z-index:'+settings.zindex+'}</style>');

document.addEventListener("keydown", function(event) {
var code = event.which;
var current_el = $(selector+ " ."+settings.class);
if(current_el.length == 0){
current_el = $(selector+"[data-element=row_0_col_1]");
}

if(code =='40' ){
	gridTable(current_el,'bottom');
}else if(code =='38' ){
	gridTable(current_el,'top');
}else if(code =='37' ){
	gridTable(current_el,'left');
}else if(code =='39' ){
	gridTable(current_el,'right');
}
});

function gridTable(element,movement){
	

	var current = '';
	var column	= element.data('col') ;
    var row	=element.parent().data('row') ;
	var row_count = row.replace( /^\D+/g, ''); 
	var col_count = column.replace( /^\D+/g, ''); 
	
	    if(movement=='top'){
		row_count -=1;
  		current = "[data-element=row_"+row_count+"_"+column+"]" ;
  		}else if(movement=='bottom'){
		row_count = parseInt(row_count)+ 1;		
  		current = "[data-element=row_"+row_count+"_"+column+"]" ;
  		}else if(movement=='left'){
		col_count  -=1;
  		current = "[data-element="+row+"_col_"+col_count+"]";
  		}else if(movement=='right'){
		col_count  = parseInt(col_count) + 1;
  		current = "[data-element="+row+"_col_"+col_count+"]";  		
  		}
  		if(settings.click){
  			$(current).click();
  		}else{
  			$(selector+" th").removeClass(settings.class);
		$(selector+" td").removeClass(settings.class);		
		$(current).addClass(settings.class);
  		}
		
		if(settings.input){
			if(settings.select){
				$(current).find('input').focus();
			}
			
		}
		if(settings.cclick){
			
				$(current).children().click();
			
		}
	}


if(settings.click){
$("[data-element]").click(function(event) {
	$("[data-element]").removeClass(settings.class);
	$(this).addClass(settings.class);
});
}

 };

}(jQuery));
