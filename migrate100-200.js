//db.entries.find({schema_version:{$exists:false}}).forEach(printjson);

db.entries.find({
    $or: [
        {schema_version:{$exists:false}},
        {schema_version:"1.0.0"}
    ]}).forEach(
    function(e) {
        var name = ""+e.name; //makes field a string
        var splitname = name.split(" ");// array of name separated by <space>
        if(splitname.length == 2) { //assume  user has input given_name <space> family_name
            e.family_name = splitname[0];
            e.given_name = splitname[1];
        }else{
            if(splitname.length == 1) { //assume  user has input given_name and no family name
                e.family_name = "";
                e.given_name = e.name;
            }else{
                if(splitname.length >=3){ //assume  user has input given_name1 <space> given_name2 <space> family_name
                    e.family_name = splitname[splitname.length-1];
                    var given_names = "";
                    for(var i = 0; i<splitname.length-1 ; i++){
                        given_names += splitname[i] + " ";
                    }
                    e.given_name = given_names.trim();
                }
            }
        }
        delete e.name;
        e.schema_version = "2.0.0";
        db.entries.save(e);
    }
);