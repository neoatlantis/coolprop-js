define([], function(){
//////////////////////////////////////////////////////////////////////////////
// Given one or more variable, answer if this combination could be used to
// query, or more variables are required.

return function(givenVariables){
    var valid = [ // all valid combinations
        ['P', 'Q'],
        ['P', 'T'],
        ['T', 'Q'],
        ['D', 'P'],
        ['D', 'T'],
        ['H', 'P'],
        ['H', 'S'],
        ['T', 'S'],
        ['P', 'S'],
    ];

    var possibles = [];

    for(var i in valid){
        var match = true;
        for(var x in givenVariables){
            if(valid[i].indexOf(givenVariables[x]) < 0){
                match = false;
                break;
            }
        }
        if(!match) continue;
        possibles = possibles.concat(valid[i]);
    }

    if(possibles.length < 1) return false; // no matched schema

    var ret = [];
    for(var i in possibles){
        if(
            ret.indexOf(possibles[i]) < 0 &&
            givenVariables.indexOf(possibles[i]) < 0
        ){
            ret.push(possibles[i]);
        }
    }

    if(ret.length < 1) return true; // all satisfied
    return ret;
}
//////////////////////////////////////////////////////////////////////////////
});
