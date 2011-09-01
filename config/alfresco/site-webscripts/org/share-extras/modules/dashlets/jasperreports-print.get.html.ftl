<div id="jasperreport-Dialog" class="jasperreport">
	<div class="hd">${data.description}</div>
	<div class="bd">
		<form id="jasperreport-Dialog-form" action="" method="POST">
			<div class="yui-gd">
				<input type="hidden" name="file" id="file" value="${data.file}" />
				<input type="hidden" name="name" id="name" value="${data.name}" />
				<input type="hidden" name="datasource" id="datasource" value="${data.database}" />
				<input type="hidden" name="parameter" id="parameter"
					value="${data.parameter}" /> <input type="hidden"
					name="description" id="description" value="${data.description}" />
				<#list data.parameters as p>
				<div class="yui-u first">
					<label for="${p.parameter}">${p.parameter}:</label>
				</div>
				<div class="yui-u">
					<input type="text" id="${p.parameter}" name="${p.parameter}"
						style="width: 30em;" />
				</div>
				</#list>
			</div>
			<div class="bdft">
				<input type="submit" id="jasperreport-Dialog-ok" value="${msg("jasperreports.button.print")}" />
				<input type="button" id="jasperreport-Dialog-cancel" value="${msg("button.cancel")}" />
			</div>
			<div id="applet-print" style="display: none;"></div>
		</form>
	</div>
</div>