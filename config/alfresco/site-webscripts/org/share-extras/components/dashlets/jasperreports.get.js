<import resource="classpath:alfresco/site-webscripts/org/alfresco/callutils.js">

// Get the reports definitions
var theUrlRep = "/jasperreports/reports/" + page.url.templateArgs.site;
 
model.data = doGetCall(theUrlRep);


