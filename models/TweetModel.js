const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/twitter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    tweet: String,
    author: String
})

const TweetModel = mongoose.model('Tweet', tweetSchema);

module.exports = {
    getTweets: () => TweetModel.find().sort({_id: -1}),
    getTweet: _id => TweetModel.findOne({_id}),
    createTweet: args => TweetModel(args).save(),
    deleteTweet: args => {
        const {_id} = args;
        TweetModel.remove({_id}, error => {
            if(error) console.log('Error removing: ', error);
        })
        return args
    },
    updateTweet: args => {
        const {_id, tweet} = args;
        TweetModel.update({_id}, {
            $set: { tweet }
        },
        {upsert: true},
        error => {
            if(error) console.log('Error updating: ', error)
        }
        )
        args.author = 'User123';

        return args;

    }
}