const NodeCache = require('node-cache');
const cache= new NodeCache();

function handleJSONCache(){
    return ( req, res, next)=>{
        const key = '_express_'+req.originalUrl || req.url;
        const cachedRes = cache.get(key);

        if(cachedRes){
            return res.json(cachedRes);
        }
        else{
            res.sendJSONResponse = res.json;
            res.json = function(response){
                cache.set(key, response, 10);
                res.sendJSONResponse(response);
            }
            next();
        }
    }
}

module.exports={
    handleJSONCache,
}
