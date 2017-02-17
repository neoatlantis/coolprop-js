require([
    'properties',
    'units',

    'jquery.unitio',
    'bootstrap',
], function(
    cp,
    units
){
//////////////////////////////////////////////////////////////////////////////


// on condition selection changed

function onConditionUseClicked(){
    var isChecked = $(this).is(':checked');
    $(this)
        .parents('.condition')
        .toggleClass('condition-use', isChecked)
    ;

    var checkedConditions = [];
    $('.condition').each(function(){
        if($(this).hasClass('condition-use')){
            checkedConditions.push($(this).attr('data-name'));
        }
    });

    var canCalc = (3 == checkedConditions.length);
    $('#calc').attr('disabled', !canCalc);
}



// on calc button clicked

function onCalcClicked(){
    var args = [];
    $('.condition-use').each(function(){
        var varname = $(this).attr('data-name'),
            uservalue = $(this).find('input[type="text"]').val();
        args.push(varname);
        args.push(
            $(this).find('.unitio')
                .unitio('set', uservalue)
                .unitio('get')
        );
    });


    $('.condition:not(.condition-use)').each(function(){
        var varname = $(this).attr('data-name');
        var v = cp.__HAPropsSI(
            varname,
            args[0], args[1],
            args[2], args[3],
            args[4], args[5]
        );
        $(this).find('.unitio').unitio('set', v, true);
    });

}

// on page loaded

$(function(){

    $('#calc').click(onCalcClicked);


    $('.condition').find('input[type="checkbox"]')
        .click(onConditionUseClicked)
    ;

    $('.condition').each(function(){
//        var varname = $(this).attr('data-name');
        var unitname = $(this).attr('data-unit');
        $(this).find('.unitio').unitio(units[unitname]);
    });

    $('.characteristic').each(function(){
        var unitname = $(this).attr('data-unit');
        $(this).find('.unitio')
            .unitio(units[unitname]).unitio('disable', true)
        ;
    });


    $('.loading').hide();
    $('.loaded').show();
});


//////////////////////////////////////////////////////////////////////////////
});
