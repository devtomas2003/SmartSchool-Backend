'use strict';
const { versions } = require('../models');
module.exports = {
    async search(req, res){
        const { version } = req.body;
        const getversion = await versions.findOne({ where: { version }});
        if(!getversion){
            const newVersion = await versions.findAll({ raw: true });
            return res.status(200).json({
                "newVersion": newVersion[0].version,
                "forceDownload": newVersion[0].forceDownload,
                "status": "needUpdate"
            });
        }else{
            return res.status(200).json({
                "status": `appUpdated`
            });
        }
    }
};