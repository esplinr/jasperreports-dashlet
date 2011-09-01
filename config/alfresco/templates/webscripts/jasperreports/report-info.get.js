var dataListContainerName = "dataLists";

var siteId = url.templateArgs["siteId"];
var reportName = url.templateArgs["report"];

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

		   for each (report in results) {
			   if (report.properties["jp:name"] == reportName) {
				   model.report = report;
				   model.parameters = report.properties["jp:parameter"].split(',');
			   }
		   }
	   }
	}
}
