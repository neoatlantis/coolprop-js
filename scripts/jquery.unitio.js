define(['jquery'], function($){
$.fn.unitio = function(arg1, arg2, arg3){
//////////////////////////////////////////////////////////////////////////////
var unitconf;
var unitid = 0;
var action = false;

var inited = this.data('unitio.inited');
if(!inited){
    unitconf = arg1;
    this.data('unitio.inited', true);
    this.data('unitio.conf', unitconf);
    this.data('unitio.id', unitid);

    this.empty();
    $('<input>', { type: 'text' }).appendTo(this);
    $('<button>', { type: 'button' })
        .appendTo(this)
        .click((function(me){
            return function(){
                me.unitio('switch');
            }
        })(this))
    ;
} else {
    unitconf = this.data('unitio.conf');
    unitid = this.data('unitio.id');
    action = arg1;
}

if('switch' == action){
    unitid += 1;
    if(unitid >= unitconf.list.length) unitid = 0;
    this.data('unitio.id', unitid);
}

var unitname = unitconf.list[unitid],
    unitinputFunc = unitconf.input[unitname],
    unitoutputFunc = unitconf.output[unitname];

if('disable' == action){
    return this
        .find('input')
        .attr('readonly', arg2)
        .toggleClass('unitio-readonly', arg2)
    ;
}

if('set' == action){
    var newvalue = arg2,
        isInternalValue = arg3;
    if(isInternalValue){
        this.data('unitio.value', newvalue);
    } else {
        this.data('unitio.value', unitinputFunc(newvalue));
    }
}

if('get' == action){
    return this.data('unitio.value');
}



if(undefined !== this.data('unitio.value')){
    var outputv = unitoutputFunc(this.data('unitio.value'));
    if(Math.abs(outputv) >= 0.001){
        this.find('input').val(Math.round(outputv * 10000.0) / 10000.0);
    } else {
        this.find('input').val(outputv);
    }
} else {
    this.find('input').val('');
}
this.find('button').text(unitname);
return this;

//////////////////////////////////////////////////////////////////////////////
}
});
