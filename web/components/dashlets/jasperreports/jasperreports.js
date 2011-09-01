/**
 * Copyright (C) 2005-2009 Alfresco Software Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

 * As a special exception to the terms and conditions of version 2.0 of 
 * the GPL, you may redistribute this Program in connection with Free/Libre 
 * and Open Source Software ("FLOSS") applications as described in Alfresco's 
 * FLOSS exception.  You should have recieved a copy of the text describing 
 * the FLOSS exception, and it is also available here: 
 * http://www.alfresco.com/legal/licensing
 */
 
/**
 * Dashboard Poll component.
 * 
 * @namespace Alfresco
 * @class Alfresco.dashlet.JasperReports
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML,
      $combine = Alfresco.util.combinePaths;

   /**
    * Preferences
    */
   var PREFERENCES_DASHLET = "org.alfresco.share.dashlet";


   /**
    * Dashboard JasperReports constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Alfresco.dashlet.JasperReports} The new component instance
    * @constructor
    */
   Alfresco.dashlet.JasperReports = function JasperReports_constructor(htmlId)
   {
      return Alfresco.dashlet.JasperReports.superclass.constructor.call(this, "Alfresco.dashlet.JasperReports", htmlId);
   };

   /**
    * Extend from Alfresco.component.Base and add class implementation
    */
   YAHOO.extend(Alfresco.dashlet.JasperReports, Alfresco.component.Base,
   {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * The component id.
          *
          * @property componentId
          * @type string
          */
         componentId: "",
      
         /**
          * The nodeRef to the poll to display
          *
          * @property nodeRef
          * @type string
          * @default ""
          */
         nodeRef: "",

         /**
          * ID of the current site
          * 
          * @property siteId
          * @type string
          * @default ""
          */
         siteId: ""
      },

      /**
       * Fired by YUI when parent element is available for scripting
       * @method onReady
       */
      onReady: function JasperReports_onReady()
      {
          Event.addListener(this.id + "-generate", "click", this.onGenerateClick, this, true);
      },
      
      onGenerateClick: function JasperReports_onGenerateClick(e)
      {
         var report = document.getElementById(this.id + "-report").value;
         var site = document.getElementById(this.id + "-siteId").value;
         
         var actionUrl = Alfresco.constants.URL_SERVICECONTEXT + "modules/jasperreports/report-print/" + site + "/" + report;
         
         Event.stopEvent(e);
         
     	 configDialog = new Alfresco.module.SimpleDialog("jasperreport-Dialog");
    	 configDialog.setOptions({
                   width: "50em",
                   templateUrl: Alfresco.constants.URL_SERVICECONTEXT + "modules/jasperreports/report-print/" + site + "/" + report,
                   actionUrl: actionUrl,
                   onSuccess:
                   {
                   },
                   doSetupFormsValidation:
                   {
                   },
                   doBeforeFormSubmit:
                   {
                       fn: function printApplet(e)
              			{
                  			var parameter = document.getElementById("parameter").value;
                    		var parameters = parameter.split(',');
                    	    var htmlApplet = '<APPLET CODE="jasperreports.alfresco.applet.PrintDashlet.class"';
                    	    htmlApplet += ' CODEBASE="/jasperreports/applet"'; 
                    	    htmlApplet += ' ARCHIVE="jasperreports-3.5.3-applet.jar,commons-logging-1.0.4.jar,commons-collections-2.1.1.jar,print-applet.jar"';
                    	    htmlApplet += ' WIDTH="3" HEIGHT="4">';
                    	    htmlApplet += '<PARAM NAME="CODE" VALUE="alfresco.applet.printer.PrintDashlet.class">';
                    	    htmlApplet += '<PARAM NAME="CODEBASE" VALUE="/jasperprint/applet/">';
                    	    htmlApplet += '<PARAM NAME="ARCHIVE" VALUE="jasperreports-3.5.3-applet.jar,commons-logging-1.0.4.jar,commons-collections-2.1.1.jar,print-applet.jar">';
                    	    htmlApplet += '<PARAM NAME="type" VALUE="application/x-java-applet;version=1.2.2">';
                    	    htmlApplet += '<PARAM NAME="scriptable" VALUE="false">';
                    	    htmlApplet += '<PARAM NAME="REPORT_URL" VALUE="' + window.location.protocol + '//' + window.location.host + '/jasperreports/getReport">';
                    	    htmlApplet += '<PARAM NAME="PARAMS" VALUE="' + parameters.length +'">';
                    	    htmlApplet += '<PARAM NAME="JRXML_FILE" VALUE="' + document.getElementById("file").value +'">';
                    	    htmlApplet += '<PARAM NAME="DATASOURCE" VALUE="' + document.getElementById("datasource").value + '">';
                    		for (i=0; i < parameters.length; i++) {
                    			htmlApplet += '<PARAM NAME="PARAM_' + i + '_NAME" VALUE="' + parameters[i] + '">';
                    			htmlApplet += '<PARAM NAME="' + parameters[i] + '" VALUE="' + document.getElementById(parameters[i]).value + '">';
                    		}
                    		htmlApplet += '</APPLET>';
                    		var ventimp = window.open(' ', 'popimpr');
                    		ventimp.document.write( htmlApplet );
                    		ventimp.document.close();
                    		eval(htmlApplet);
                   		},
                   	   scope: this
                   }
                });
    	 configDialog.show();

      }
      

   });
})();

