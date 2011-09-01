<#macro dateFormat date>${date?string("dd MMM yyyy HH:mm:ss 'GMT'Z '('zzz')'")}</#macro>
<#escape x as jsonUtils.encodeJSONString(x)>
{
   "name":"${report.properties["jp:name"]}",
   "description":"${report.properties["jp:description"]}",
   "file":"${report.properties["jp:file"]}",
   "database":"${report.properties["jp:database"]}",
   "parameter":"${report.properties["jp:parameter"]}",
   "parameters":
		[
	<#list parameters as parameter>
 		{      
   			"parameter":"${parameter}"
 		}<#if (parameter_has_next)>,</#if>   
	</#list> 
		]
}
</#escape>

