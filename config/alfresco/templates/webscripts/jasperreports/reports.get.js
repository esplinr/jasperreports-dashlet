var dataListContainerName = "dataLists";

var siteId = url.templateArgs["siteId"];

var siteWithReports = siteService.getSite(siteId);
if (siteWithReports != null) { 
	if (siteWithReports != null) {
	   var dataLists;
	   if (siteWithReports.hasContainer(dataListContainerName)) {
		   dataLists = siteWithReports.getContainer(dataListContainerName);
	   } else {
		   dataLists = siteWithReports.createContainer(dataListContainerName);
	   }
	   if (dataLists != null) {
		   var query = "PATH:\"" + dataLists.qnamePath + "//*\" AND TYPE:\"{http://www.alfresco.org/model/jasperreports/1.0}report\" ";
		   
		   model.query = query;
		   
		   var results = search.luceneSearch(query);

		   model.results = results;
		   
		   var reports = [];   
		   var report;
		   
		   for each (report in results)
		   {
			  reports.push(
		      {
		         "report": report
		      });
		   }
		   
		   model.reports = reports;
	   }
	}
}
