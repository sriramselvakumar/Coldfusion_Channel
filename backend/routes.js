const express = require("express");
const router = express.Router();
const controller = require('./controller')

router.get('/search/:searchString', controller.search )
router.get('/channels/:channelUsername', controller.getChannelData)
router.get('/channel/channelSections', controller.getChannelSections)
router.get('/videos/:maxResults', controller.getVideos)
router.get('/searchvideos/:searchText',controller.searchVideos)
module.exports = router