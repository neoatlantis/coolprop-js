define([], function(){
//////////////////////////////////////////////////////////////////////////////

ret = {};

//----------------------------------------------------------------------------

ret.P = {
    list: ['Pa', 'kPa', 'MPa', 'bar', 'atm', 'psi'],
    input: {}, output: {}
};
ret.P.input["Pa"] = function(i){ return i; };
ret.P.output["Pa"] = function(o){ return o; };
ret.P.input["kPa"] = function(i){ return i * 1000.0; };
ret.P.output["kPa"] = function(o){ return o / 1000.0; };
ret.P.input["MPa"] = function(i){ return i * 1000000.0; };
ret.P.output["MPa"] = function(o){ return o / 1000000.0; };
ret.P.input["bar"] = function(i){ return i * 100000.0; };
ret.P.output["bar"] = function(o){ return o / 100000.0; };
ret.P.input["atm"] = function(i){ return i * 101325.0; };
ret.P.output["atm"] = function(o){ return o / 101325.0; };
ret.P.input["psi"] = function(i){ return i * 6894.757293168; };
ret.P.output["psi"] = function(o){ return o / 6894.757293168; };

//----------------------------------------------------------------------------

ret.T = {
    list: ['K', '\u00B0C', '\u00B0F'],
    input: {}, output: {}
};
ret.T.input["K"] = function(i){ return i; };
ret.T.output["K"] = function(o){ return o; };
ret.T.input["\u00B0C"] = function(i){ return 273.15 + i; };
ret.T.output["\u00B0C"] = function(o){ return o - 273.15; };
ret.T.input["\u00B0F"] = function(i){ return (459.67 + i) * 5.0 / 9.0; };
ret.T.output["\u00B0F"] = function(o){ return o * 9.0 / 5.0 - 459.67; };

//----------------------------------------------------------------------------

ret.D = {
    list: ['kg/m\u00B3', 'm\u00B3/kg'],
    input: {}, output: {},
};
ret.D.input["kg/m\u00B3"] = function(i){ return i; };
ret.D.output["kg/m\u00B3"] = function(o){ return o; };
ret.D.input["m\u00B3/kg"] = function(i){ return 1.0 / i; };
ret.D.output["m\u00B3/kg"] = function(o){ return 1.0 / o; };

//----------------------------------------------------------------------------

ret.Q = {
    list: ['%'],
    input: {}, output: {},
};
ret.Q.input["%"] = function(i){ return i / 100.0; };
ret.Q.output["%"] = function(o){ return o * 100.0; };

//----------------------------------------------------------------------------

ret.HumRat = {
    list: ['kg/kg', 'g/kg'],
    input: {}, output: {},
};
ret.HumRat.input["kg/kg"] = function(i){ return i; };
ret.HumRat.output["kg/kg"] = function(o){ return o; };
ret.HumRat.input["g/kg"] = function(i){ return i / 1000.0; };
ret.HumRat.output["g/kg"] = function(o){ return o * 1000.0; };


//----------------------------------------------------------------------------

ret.H = {
    list: ['kJ/kg'],
    input: {}, output: {},
};
ret.H.input["kJ/kg"] = function(i){ return i * 1000.0; };
ret.H.output["kJ/kg"] = function(o){ return o / 1000.0; };

//----------------------------------------------------------------------------

ret.S = {
    list: ['kJ/kg/K'],
    input: {}, output: {},
};
ret.S.input["kJ/kg/K"] = function(i){ return i * 1000.0; };
ret.S.output["kJ/kg/K"] = function(o){ return o / 1000.0; };

// ---------------------------------------------------------------------------

ret.cmass = {
    list: ['J/kg/K'],
    input: {}, output: {},
};
ret.cmass.input["J/kg/K"] = function(i){ return i; };
ret.cmass.output["J/kg/K"] = function(o){ return o; };

//----------------------------------------------------------------------------

ret.M = {
    list: ['g/mol'],
    input: {}, output: {},
};
ret.M.input["g/mol"] = function(i){ return i / 1000.0; };
ret.M.output["g/mol"] = function(o){ return o * 1000.0; };


return ret;
//////////////////////////////////////////////////////////////////////////////
});
