db.entries.find({schema_version:"2.0.0"}).forEach(
    function(e) {
        var name = e.given_name +" "+ e.family_name;
        delete e.given_name;
        delete e.family_name;
        e.schema_version = "1.0.0";
        e.name = name;
        db.entries.save(e);
    }
);

