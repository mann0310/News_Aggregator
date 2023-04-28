import express from 'express';
import {getUserFromToken} from './UserFunctions.js';
import Vote from './models/Vote.js';

const router= express.Router();

router.get('/vote/:commentId/:direction', (req, res) =>{
    const token=req.cookies.token;
    if(!token){
        res.status(400);
    }
    getUserFromToken(req.cookies.token)
    .then(userInfo => {
        console.log(req.params);
        // const val=Vote.findOne({commentId: req.params.commentId, author: userInfo.username});
        // console.log(val);
        // console.log(Vote.findOne({commentId: req.params.commentId, author: userInfo.username}).count)
        //     res.status(404);
        // }
        if(Vote.findOne({commentId: req.params.commentId, author: userInfo.username})===null) {
            res.status(404);
        }
        Vote.deleteOne({commentId: req.params.commentId, author: userInfo.username})
        .then( () => {

            if(['up','down'].indexOf(req.params.direction) === -1){
                res.status(404).json(true);
                return; 
            }

            const vote = new Vote({
                author: userInfo.username,
                direction: req.params.direction === 'up' ? 1 : -1,
                commentId: req.params.commentId,
            });
            vote.save().then(() => {
                res.status(200).json(true);
            }).catch(err =>{
                res.status(404);
            });

        }).catch(err =>{
            res.status(404);
        });

    }).catch(err =>{
        res.status(404);
    });
});

router.post('/votes', (req, res)=>{
    const {commentsIds}= req.body;
    getUserFromToken(req.cookies.token).then(userInfo => {
        Vote.find({ commentId: { '$in': commentsIds } })
            .then(votes => {
                let commentsTotals = {};
                votes.forEach(vote => {
                    if (typeof commentsTotals[vote.commentId] === 'undefined') {
                        commentsTotals[vote.commentId] = 0;
                    }
                    commentsTotals[vote.commentId] += vote.direction;
                });
                let userVotes={};
                votes.forEach(vote => {
                    if(vote.author === userInfo.username){
                        userVotes[vote.commentId]= vote.direction;
                    }
                });
                res.status(200).json({ commentsTotals , userVotes});
            }).catch(err => {
                res.status(403);
            });
    }).catch(err => {
        res.status(404);
    });
});

export default router; 