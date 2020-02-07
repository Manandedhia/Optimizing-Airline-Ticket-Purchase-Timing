package codes;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
	public static Connection con= null;
	public static Connection getDBConnection(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con=DriverManager.getConnection("jdbc:mysql://localhost:3306/1232?useSSL=false", "root", "");
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return con;
		
	}
}
