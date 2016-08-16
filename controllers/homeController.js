var homeController = function(dataService){
     
     function getIndex(req, res) {
            
            dataService.getAllApplicants(function (err, applicantlist) {
                res.render('index', {
                    title: 'Home',
                    applicants: applicantlist
                });
            });

        }
    return {
        getIndex : getIndex
    }
}
module.exports = homeController;