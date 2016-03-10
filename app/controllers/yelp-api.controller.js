var config = require('../../config/configuration'),
    mongoose = require('mongoose'),
    Vote = mongoose.model('Vote'),
    Result = mongoose.model('Result'),
    Yelp = require('yelp');

exports.update = function(req,res) {
    
    function findResult(doc) {
        Result.findOne({_id:doc.belongsTo._id}).populate('votes','count').exec(function(err,result) {
            if (err) {
                console.log(err);
            } else {
                result.votes.count = doc.count;
                result.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        Result.find({zip:result.zip}).populate('votes','count').exec(function(err,data) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({data});
                            }
                        });
                    }
                });
            }
        });
    };
    
    function checkIfVoted(doc,comparison,target) {
        if (comparison == target) {
            doc.count = (doc.count == 0)? doc.count : doc.count - 1;
            var ind = doc.votedOnBy.indexOf(target)
            doc.votedOnBy.splice(ind,1);
            console.log(ind, 'new dox', doc.votedOnBy);
        } else {
            doc.votedOnBy.push(target);
            doc.count += 1;
        }
        doc.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                findResult(doc);
            }
        });
    };
    
    console.log(req.body,'helllllooo');
    
    Vote.findOne({_id:req.body.choice}).populate('belongsTo', 'zip').exec(function(err,doc) {
        console.log('hello the doc',doc, doc.votedOnBy,doc.votedOnBy.length)
        if (doc.votedOnBy.length) {
            for (var i = 0; i < doc.votedOnBy.length; i++ ) {
                console.log(doc);
                checkIfVoted(doc,doc.votedOnBy[i], req.body.user);
            }
        } else {
            doc.votedOnBy.push(req.body.user);
            doc.count += 1;
            doc.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    findResult(doc);    
                }
            });
        }
    });
};

exports.search = function(req,res) {
    console.log('request= >' , req.body);
    
var client = new Yelp({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    token: config.token,
    token_secret: config.tokenSecret
});
    
var m = 0;

function checkIfExists(data,length) {
    
    Result.findOne({title:data.name}, function(err,doc) {
        if (err) {
            console.log(err);
        } else {
            if (!doc) {
               var result = new Result({title:data.name, description:data.snippet_text, image:data.image_url, url:data.url,zip:req.body.zip});
               var vote = new Vote({belongsTo:result._id, count:0});
               result.votes = vote._id;
               saveVote(vote,result,length);      
            } else {
                checkIfDone(length);
            }
        }
    });
}
    
function checkIfDone(length) {
    m+=1;
    if (m === length) {
        Result.find({zip:req.body.zip}).populate('votes','count').exec(function(err,data) {
            if (err) {
                console.log(err);
            } else {
                res.json({data});
            }
        });
    }
}
    
function saveResult(result,length) {
    result.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            checkIfDone(length);
        }
    });
}
    
function saveVote(vote,result,length) {
    vote.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            saveResult(result,length);
        }
    });
}
    
client.search({term:'bars', location:req.body.zip})
.then(function(data) {
    
    for (var prop in data) {
        if (prop === 'businesses') {
            var length = data[prop].length;
            for (var i = 0; i < data[prop].length; i++) {
                
                checkIfExists(data[prop][i],length);

        }; 
      }
    }
})
.catch(function(err) {
    console.log(err);
});
};