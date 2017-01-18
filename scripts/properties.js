define(['coolprop', 'properties.fluidlist'], function(cp, fluidlist){
//////////////////////////////////////////////////////////////////////////////
var ret = {};

ret.ENTHALPY = "H";
ret.TEMPERATURE = "T";
ret.PRESSURE = "P";
ret.DENSITY = "D";
ret.VAPOR_QUALITY = "Q";

ret.FLUIDS = fluidlist;

ret.__PropsSI = function(a,b,c,d,e,f){ return Module.PropsSI(a,b,c,d,e,f); };
ret.__Props1SI = function(a,b){ return Module.Props1SI(a,b); };
ret.__HAPropsSI = function(a,b,c,d,e,f){ return Module.HAPropsSI(a,b,c,d,e,f);};



return ret;
//////////////////////////////////////////////////////////////////////////////
});
