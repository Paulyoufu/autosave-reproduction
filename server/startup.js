Meteor.startup(
    function() {
        if (Collection1.find().count() === 0) {
            Collection1.insert({
                "_id": "HHetzpkuqukhFr4i4",
                "title": "some title",
                "key1": "value1"
            });
        }

        if (Collection2.find().count() === 0) {
            Collection2.insert({
                "_id": "g7tXpujEj8aHqNXA5",
                "key2": "some value"
            });
        }
    }
);