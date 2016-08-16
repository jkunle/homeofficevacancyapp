var express = require('express');

function router(controller, dataService) {

    var homeRouter = express.Router();
    
    var homeController = controller(dataService);

    homeRouter.route('/')
        .get(homeController.getIndex);

    return homeRouter;

}

module.exports = router;