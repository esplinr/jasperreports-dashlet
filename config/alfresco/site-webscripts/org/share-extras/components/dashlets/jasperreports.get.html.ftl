<script type="text/javascript">//<![CDATA[
   new Alfresco.dashlet.JasperReports("${args.htmlid}").setOptions(
   {
      "siteId": "${page.url.templateArgs.site!''}",
      "componentId": "${instance.object.id}",
      "nodeRef": "${args.nodeRef!''}"
   }).setMessages(
      ${messages}
   );
//]]></script>

<div class="dashlet poll">
	<div class="title">${msg("header.jasperreports")}</div>
	<div class="body">
		<div class="msg">
			<h3 class="pollName" id="${args.htmlid}-poll-title"></h3>
			<div id="${args.htmlid}-poll-body">
				<p id="${args.htmlid}-poll-message" style="display: none;"></p>
				<form action="#" method="post" id="${args.htmlid}-form"
					class="poll-form">
					<input type="hidden" name="${args.htmlid}-siteId" id="${args.htmlid}-siteId" value="${page.url.templateArgs.site!''}"> 
					<select name="${args.htmlid}-report" id="${args.htmlid}-report" style="width: 30em;">
						<#if data.reports?size &gt; 0>
						<option value="-">${msg("jasperreports.label.selec")}</option>
						<#list data.reports as report>
						<option value="${report.name}">${report.description}</option>
						</#list> <#else>
						<option value="-">${msg("jasperreports.label.no-reports")}</option>
						</#if>
					</select>

					<div id="${args.htmlid}-poll-options" class="poptions"></div>
					<input type="button" value="${msg("jasperreports.button.generate")}" name="action"
						id="${args.htmlid}-generate" />
				</form>
			</div>
		</div>
	</div>
</div>
