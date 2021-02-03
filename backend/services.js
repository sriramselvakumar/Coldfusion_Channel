

const {google} = require('googleapis');
require("dotenv").config();

const channelId = "UC4QZ_LsYcvcq7qOsOhpAX4A"

//const playlistId = 'PL0iVR8sl9TiW19HcR0NcxTnC54K_AycTY'
const playlistId = "UU4QZ_LsYcvcq7qOsOhpAX4A"

const yt = google.youtube({
    version: 'v3',
    auth: process.env.yt_key
})

const returnErr = (code,message) => {
    return {
        code,
        data: {
            error: 1, 
            message
        }
    }
}

module.exports = {
    search: async (searchString) => {
        try {
            const data = await yt.search.list(
                {
                    part: "snippet",
                    q: searchString
                }
            )    
            return ( 
                {
                    code: 200,
                    data
                }
            )
        } catch (error) {
            return ( 
                returnErr(500,`Could not retrieve search results for ${searchString}`)
            )
        }
        
        
    },
    getChannelData: async(username) => {
        try {
            const data= await yt.channels.list({
                part: [
                  "snippet,contentDetails,statistics"
                ],
                forUsername: username
            })
    
            return({
                code: 200,
                data
            })
            
        } catch (error) {
            return(
                returnErr(500,`could not retrieve channel details for ${username}`)
            )
            
        }
        
    },
    getChannelSections: async() => {
        try {
            const data = await yt.channelSections.list({
                part: [
                    'snippet,contentDetails'
                ],
                channelId
            })
            return({
                code: 200, 
                data
            })
            
        } catch (error) {
            return(
                returnErr(500,`could not retrieve channel sections`)
            )
        }
    },
    getVideos: async(maxResults) => {
        try {
            maxResults = parseInt(maxResults)
            const data = await yt.playlistItems.list({
                part: [
                    "snippet,contentDetails"
                ],
                playlistId,
                maxResults
            })
            return({
                code: 200,
                data
            })
            
        } catch (error) {
            return(
                returnErr(500,`could not retrieve playlist info for ${playlistId}`)
            )
        }
    }
}