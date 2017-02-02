define([
    'properties',
], function(
    prop
){
//////////////////////////////////////////////////////////////////////////////

var eventFunc = function(){};
var data = [];

for(var name in prop.FLUIDS){
    for(var i in prop.FLUIDS[name]){
        data.push({
            name: prop.FLUIDS[name][i],
            value: name,
        });
    }
}

function onFluidSelected(fluidName){
    if(!fluidName) return;
    eventFunc(fluidName);
}



$(function(){

    var ms = $('#fluidname').magicSuggest({
        allowFreeEntries: false,
        data: data,
        valueField: 'value',
        resultAsString: true,
    });

    $(ms).on('selectionchange', function(){
        onFluidSelected(this.getValue()[0]);
        this.setSelection([]);
    });

});


return function register(func){
    eventFunc = func;
}

//////////////////////////////////////////////////////////////////////////////
});
