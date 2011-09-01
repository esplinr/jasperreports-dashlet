<#macro dateFormat date>${date?string("dd MMM yyyy HH:mm:ss 'GMT'Z '('zzz')'")}</#macro>
<#escape x as jsonUtils.encodeJSONString(x)>
{
   "reports":
   [
   <#list reports as r>
      <#assign report = r.report>
      {
      	  "name":"${report.properties["jp:name"]}",
      	  "description":"${report.properties["jp:description"]}"
      }<#if r_has_next>,</#if>
   </#list>
   ]
}
</#escape>

