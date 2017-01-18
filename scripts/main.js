require([
    'jquery',
    'properties',
    'queryschema',
], function(
    $,
    cp,
    qs
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

        $(this).find('input')
            .attr('readonly', disabled)
            .attr('disabled', disabled)
        ;
    });

    $('#calc').attr('disabled', !canCalc);
}



// on calc button clicked

function onCalcClicked(){
    var fluidName = $('#fluidname').val();
    var args = [];
    $('.condition-use').each(function(){
        args.push($(this).attr('data-name'));
        args.push(
            parseFloat( $(this).find('input[type="text"]').val() )
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
        $(this).find('input[type="text"]').val(v);
    });

//    var H = cp.__PropsSI('H', args[0], args[1], args[2], args[3], fluidName);
//    console.log(H);
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


    $('.condition').find('input[type="checkbox"]').click(onConditionUseClicked);



});


//////////////////////////////////////////////////////////////////////////////
});
