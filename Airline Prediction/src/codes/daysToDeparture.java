package codes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class daysToDeparture {
	static Connection con = Database.getDBConnection();
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*try{
			String sql="Select id,flight_duration from flightDataset";
			String s1="";
			String words[];
			int hrsArray[] = new int[3];
			int totalHours;
			PreparedStatement ps=con.prepareStatement(sql);
			ResultSet rs=ps.executeQuery();
			while(rs.next()){
				System.out.println(rs.getString(1));
				System.out.println(rs.getString(2));
				s1=rs.getString(2);
				words=s1.split("\\s");
				hrsArray[0]=Integer.parseInt(words[0]);
				hrsArray[1]=Integer.parseInt(words[2]);
				hrsArray[2]=Integer.parseInt(words[4]);
				totalHours=(hrsArray[0]*1440)+(hrsArray[1]*60)+hrsArray[2];
					System.out.println(totalHours);
					System.out.println();
				String sql1="update flightDataset set flight_duration = "+totalHours+" where id="+rs.getString(1);
				PreparedStatement ps1=con.prepareStatement(sql1);
				int res=ps1.executeUpdate();
			}
		}catch(Exception e){
			e.printStackTrace();
		}*/
		
		try {
			String sql="select distinct(plane_code) from flightDataset";
			PreparedStatement ps=con.prepareStatement(sql);
			ResultSet rs=ps.executeQuery();
			while(rs.next()){
				
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

}
//Queries

