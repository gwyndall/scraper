var scrape = require('../scripts/scrape');
var makeDate = require('../scripts/date');

var Headline = require('../models/Headlines');

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (let index = 0; index < articles.length; index++) {
                articles[index].date = makeDate();
                articles[index].saved = false;

            }
            Headline.collection.insertMany(articles, {
                ordered: false
            }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cd);
    },
    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Headline.update({
            _id: query._id
        }, {
            $set: query
        }, {}, cb);
    }
}