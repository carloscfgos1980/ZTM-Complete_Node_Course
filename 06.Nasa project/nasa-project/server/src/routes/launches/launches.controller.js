const {
    GetAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');


function httpGetAllLaunches(req, res){
    return res.status(200).json(GetAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "missing required property"
        })
    }

    launch.launchDate = new Date(launch.launchDate);
    
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'invalid launch date'
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id)

    // if launch doesnt exist
    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
        error:"Launch not found",
    })
    }

    // if launch does exist
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)
}




module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}