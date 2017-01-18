require([
    'jquery',
    'properties',
    'queryschema',
    'units',

    'jquery.unitio',
], function(
    $,
    cp,
    qs,
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

    var canCalc = false;

    var possibleConditions = qs(checkedConditions);
//    console.log('-->', checkedConditions, possibleConditions);
    if(false === possibleConditions){
        // wrong combination selected, disable calc function
        $('.condition').each(function(){
            $(this)
                .removeClass('condition-possible')
                .addClass('condition-impossible')
            ;
        });
    } else if(true === possibleConditions){
        // combination determined, disable selection of condition
        $('.condition').each(function(){
            $(this)
                .removeClass('condition-possible')
                .addClass('condition-impossible')
            ;
        });
        canCalc = true;
    } else {
        $('.condition').each(function(){
            var possible = (
                possibleConditions.indexOf($(this).attr('data-name')) >= 0)
            ;
            $(this)
                .toggleClass('condition-possible', possible)
                .toggleClass('condition-impossible', !possible)
            ;
        });
    }

    $('.condition').each(function(){
        var disabled = (
            !$(this).hasClass('condition-use') &&
            $(this).hasClass('condition-impossible')
        );

        $(this).find('input[type="checkbox"]')
            .attr('disabled', disabled)
        ;
        $(this).find('.unitio').unitio('disable', disabled);
    });

    $('#calc').attr('disabled', !canCalc);
}



// on calc button clicked

function onCalcClicked(){
    var fluidName = $('#fluidname').val();
    var args = [];
    $('.condition-use').each(function(){
        var varname = $(this).attr('data-name'),
            uservalue = parseFloat($(this).find('input[type="text"]').val());
        args.push(varname);
        args.push(
            $(this).find('.unitio')
                .unitio('set', uservalue)
                .unitio('get')
        );
    });

    $('.condition:not(.condition-use)').each(function(){
        var varname = $(this).attr('data-name');
        var v = cp.__PropsSI(
            varname,
            args[0], args[1],
            args[2], args[3],
            fluidName
        );
        $(this).find('.unitio').unitio('set', v, true);
    });

    $('.characteristic').each(function(){
        var varname = $(this).attr('data-name');
        var v = cp.__Props1SI(varname, fluidName);
        $(this).find('.unitio').unitio('set', v, true);
    });
}



// on page loaded

$(function(){

    $('#fluidname').empty();
    for(var key in cp.FLUIDS){
        $('<option>', {
            value: key,
        }).text(key).appendTo('#fluidname');
    };


    $('#calc').click(onCalcClicked);


    $('.condition').find('input[type="checkbox"]')
        .click(onConditionUseClicked)
    ;

    $('.condition').each(function(){
        var varname = $(this).attr('data-name');
        $(this).find('.unitio').unitio(units[varname]);
    });

    $('.characteristic').each(function(){
        var unitname = $(this).attr('data-unit');
        $(this).find('.unitio')
            .unitio(units[unitname]).unitio('disable', true)
        ;
    });

});


//////////////////////////////////////////////////////////////////////////////
});
