

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import codes.StaticKeys;

/**
 * Servlet implementation class searchData
 */
@WebServlet("/searchData")
public class searchData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DateFormat dateFormat=new SimpleDateFormat("MM/dd/yyyy"); 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public searchData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		try {
			//System.out.println("in SearchData servlet");
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			String tempDate="";
			String source=request.getParameter("from");
			String destination=request.getParameter("to");
			String travelDate=request.getParameter("travelDate");
			
			Date newDate;
			newDate = new SimpleDateFormat("yyyy-MM-dd").parse(travelDate);
			//System.out.println(newDate);
			String date1=dateFormat.format(newDate);
			//System.out.println(date1);
			//TestPythonScript.sendData(source, destination, date1);
			TestPythonScript.sendDataSet(source, destination, date1);
			
			if(StaticKeys.dataInsertFlag.equals("flagSet")){
			out.println("<script type=\"text/javascript\">");
			out.println("location=index.jsp");
			out.println("</script>");
			}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
	}

}
