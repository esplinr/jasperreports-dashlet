package jasperreports.alfresco.applet;

import java.applet.Applet;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.util.JRLoader;

public class PrintDashlet extends Applet {

	private URL url;
	private JasperPrint jasperPrint;

	@Override
	public void init() {
		String strUrl = getParameter("REPORT_URL");
		String strJRXML = getParameter("JRXML_FILE");
		String params = getParameter("PARAMS");
		for (int i = 1; i <= Integer.parseInt(params); i++) {
			String name = getParameter("PARAM_" + i + "_NAME");
			String value = getParameter("PARAM_" + name);
			if (strUrl.indexOf("?") == -1)
				strUrl += "?";
			strUrl += URLEncoder.encode("PARAM_" + name) + "=" + URLEncoder.encode(value) + "&";
		}
		String jrxmlData = "";
		
		try {
			URL urlJRXML = new URL(strJRXML);
			URLConnection urlConnJRXML = urlJRXML.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(urlConnJRXML.getInputStream()));
			String inputLine;
			while ((inputLine = in.readLine()) != null) 
			    jrxmlData += inputLine;
			in.close();
			strUrl += "JRXML=" + URLEncoder.encode(jrxmlData, "UTF-8");
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		strUrl += "&DATASOURCE=" + getParameter("DATASOURCE");
		System.out.println(getCodeBase());
		System.out.println(strUrl);
        
		System.out.println(jrxmlData);
		
		if (strUrl != null) {
			try {
				url = new URL(getCodeBase(), strUrl);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
		}
	}

	@Override
	public void start() {
		try {
			jasperPrint = (JasperPrint) JRLoader.loadObject(url);
			Thread thread = new Thread(new Runnable() {
				public void run() {
					try {
						JasperPrintManager.printReport(jasperPrint, true);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			});

			thread.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
