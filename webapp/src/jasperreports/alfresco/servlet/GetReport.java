package jasperreports.alfresco.servlet;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.StringBufferInputStream;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource;

/**
 * Servlet implementation class GetReport
 */
public class GetReport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetReport() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		ServletContext context = this.getServletConfig().getServletContext();

		System.out.println();

		String reporte = "";
		Map parameters = new HashMap();
		Enumeration params = request.getParameterNames();
		while (params.hasMoreElements()) {
			String name = (String) params.nextElement();
			String value = request.getParameter(name);
			if (name.indexOf("PARAM_") >= 0) {
				parameters.put(name.replaceAll("PARAM_", ""), value);
			}
		}
		reporte = request.getParameter("REPORT");

		String datasourceName = request.getParameter("DATASOURCE");

		String jrxmlData = request.getParameter("JRXML");

		JasperPrint jasperPrint = null;

		try {
			JasperReport jasperReport = JasperCompileManager
					.compileReport(new StringBufferInputStream(jrxmlData));

			if (datasourceName == null || datasourceName.trim().length() == 0) {
				Collection cllDatos = new ArrayList();
				cllDatos.add(parameters);
				JRMapCollectionDataSource datasource = new JRMapCollectionDataSource(
						cllDatos);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						parameters, datasource);
			} else {

				Context initContext = new InitialContext();
				Context envContext = (Context) initContext.lookup("java:/comp/env");
				DataSource ds = (DataSource) envContext.lookup(datasourceName);
				Connection conn = ds.getConnection();
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						parameters, conn);
				conn.close();
			}

			if (jasperPrint != null) {
				ObjectOutputStream out_ = new ObjectOutputStream(
						response.getOutputStream());
				out_.writeObject(jasperPrint);
			} else {
				response.setContentType("text/html");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}
	}

}
