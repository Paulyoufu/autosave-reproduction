Meteor.publish('Collection1', function() {
    return Collection1.find();
});


Meteor.publish('Collection2', function() {
    return Collection2.find();
});

Collection1.before.update(
    function(userId, doc, fieldNames, modifier, options) {
        console.log('#### Collection 1 Update ####', userId, doc, fieldNames, modifier, options);
    }
);

Collection2.before.update(
    function(userId, doc, fieldNames, modifier, options) {
        console.log('#### Collection 2 Update ####', userId, doc, fieldNames, modifier, options);
    }
);