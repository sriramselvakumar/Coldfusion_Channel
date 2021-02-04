const { getChannelSections } = require('./services');
const services = require('./services')


module.exports = {
    search: async(req,res) => {
        const {searchString} = req.params
        const {code,data} = await services.search(searchString)
        res.status(code).send(data)
    },
    getChannelData: async(req,res) => {
        const {channelUsername} = req.params
        const {code,data} = await services.getChannelData(channelUsername)
        res.status(code).send(data)
    },
    getChannelSections: async(req,res) => {
        const {code,data} = await services.getChannelSections()
        res.status(code).send(data)
    },
    getVideos: async(req,res) => {
        const {maxResults} = req.params
        const {code,data} = await services.getVideos(maxResults)
        res.status(code).send(data)
    },
    searchVideos: async(req,res) => {
        const {searchText} = req.params
        const {code,data} = await services.searchVideos(searchText)
        res.status(code).send(data)
    }
}