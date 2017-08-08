const Promise = require('bluebird')
const clog = require('fbkt-clog')
const skidmarks = require('./skidmarks.json')
const getDbContacts = require('./actions/getDbContacts')
const saveSkidmark = require('./actions/saveSkidmark')
const saveSkidmarkComment = require('./actions/saveSkidmarkComment')
const saveSkidmarkCommentReaction = require('./actions/saveSkidmarkCommentReaction')

function saveSkidmarkCommentReactionSet(knex, comment, contacts, commentReactionInfos){
  return Promise.mapSeries(
    commentReactionInfos,
    commentReactionInfo => {
      return saveSkidmarkCommentReaction(knex, comment.id, contacts, commentReactionInfo)
    }
  )
    .then(comments => {
      return Object.assign(comment, {
        comments: comments
      })
    })
}

function saveSkidmarkCommentSet(knex, skidmark, contacts, commentInfos){
  return Promise.mapSeries(
    commentInfos,
    commentInfo => {
      return saveSkidmarkComment(knex, skidmark.id, contacts, commentInfo)
        .then(comment => {
          return saveSkidmarkCommentReactionSet(knex, comment, contacts, commentInfo.commentReactions)
        })
    }
  )
    .then(comments => {
      return Object.assign(skidmark, {
        comments: comments
      })
    })
}

function saveSkidmarkSet(knex, contacts, skidmarkSet){
  return Promise.mapSeries(
    skidmarks.skidmarks,
    skidmarkInfo => {
      return saveSkidmark(knex, skidmarkInfo, contacts)
        .then(skidmark => {
          return saveSkidmarkCommentSet(knex, skidmark, contacts, skidmarkInfo.comments)
        })
    }
  )
}

exports.seed = function (knex, Promise) {
  return getDbContacts(knex)
    .then(contacts => {
      return saveSkidmarkSet(knex, contacts, skidmarks)
    })
    .then(skidmarks => {
      clog('SKIDMARKS', skidmarks)
    })
}
