

const {google} = require('googleapis');
const { pagespeedonline } = require('googleapis/build/src/apis/pagespeedonline');
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

const performPagination = (items,numColumns) => {
    let paginated = []
    let elements = 3 * numColumns
    for(let a = 0; a < items.length; a+=elements){
        let page = [] 
        for(let b = a; b < a+elements; b++){
            if( b == items.length) break
            else page.push(items[b])
        }
        paginated.push(page)
    }
    return paginated
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

            const {data} = await yt.playlistItems.list({
                part: [
                    "snippet,contentDetails"
                ],
                playlistId,
                maxResults
            })

            const {items} = data;
            const paginatedThreeItems = performPagination(items,3)
            const paginatedFourItems = performPagination(items,4)
            
            return({
                code: 200,
                data: {
                    items,
                    paginatedThreeItems,
                    paginatedFourItems
                }
            })
            
        } catch (error) {
            console.log(error)
            return(
                returnErr(500,`could not retrieve playlist info for ${playlistId}`)
            )
        }
    }
}