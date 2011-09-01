<import resource="classpath:alfresco/site-webscripts/org/alfresco/callutils.js">

var reportName = url.templateArgs["report"];
var siteId = url.templateArgs["site"];

// Get the reports definitions
var theUrlRep = "/jasperreports/report-info/" + siteId + "/" + reportName;
// 
model.data = doGetCall(theUrlRep);
model.siteId = siteId; 



