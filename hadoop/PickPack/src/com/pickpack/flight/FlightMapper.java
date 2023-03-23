package com.pickpack.flight;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class FlightMapper extends Mapper<LongWritable, Text, Text, IntWritable> {

	static Logger logger = Logger.getLogger(FlightMapper.class);

	public void map(LongWritable ikey, Text ivalue, Context context) throws IOException, InterruptedException {
		logger.info("ikey : " + ikey + ", ivalue : " + ivalue);
		PropertyConfigurator.configure("log4j.properties");

		String line = ivalue.toString();
		String flightData[] = line.split(", ");

		// *****Flight*****
		String date;
		String airName;
		String codeShare;
		String departureAirport;
		String departureTime;
		String duration;
		String destinationAirport;
		String destinationTime;
		String plus;
		String type;
		String price;

		date = flightData[0];
		airName = flightData[1];
		codeShare = flightData[2];
		departureAirport = flightData[3];
		departureTime = flightData[4];
		duration = flightData[5];
		destinationAirport = flightData[6];
		destinationTime = flightData[7];
		plus = flightData[8];
		type = flightData[9];
		price = flightData[10];

		// --processing
		//date : 20230323 -> 2023-03-23
		String newdate = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
		
		// duration
		String durationStr[] = duration.split("시간 ");
		int hour = Integer.parseInt(durationStr[0]);
		String minuteStr = StringUtils.removeEnd(durationStr[1], "분");
		int minute = Integer.parseInt(minuteStr);

		// totalMinute
		int totalMinute = hour * 60 + minute;

		//plus
		plus = StringUtils.removeFirst(plus, "\\+");
		
		//type
		if(type.equals("직항")) {
			type = "0";
		}else {
			type = StringUtils.removeFirst(type, "경유");
		}

		// Remove won
		price = StringUtils.removeEnd(price, "원");

		// --Make key
		String keyStr = newdate + ", " + airName + ", " + codeShare + ", " + departureAirport + ", " + departureTime + ", "
				+ duration + ", " + totalMinute + ", " + destinationAirport + ", " + destinationTime + ", " + plus
				+ ", " + type;

		// *****Flight Detail *****
		String waiting;
		String route_departure_time;
		String route_departure_date;
		String route_departure_airport;
		String route_departure_code;
		String route_info_duration;
		String route_info_flight;
		String route_info_flight_share;
		String route_destination_time;
		String plus_flight;
		String route_destination_date;
		String route_destination_airport;
		String route_destination_code;

		int flight_size = (flightData.length - 11) / 13;

		// 11~23, 24~36 ..
		for (int i = 0; i < flight_size; i++) {
			int start = 11 + (13 * i);

			waiting = flightData[start];
			route_departure_time = flightData[start + 1];
			route_departure_date = flightData[start + 2];
			route_departure_airport = flightData[start + 3];
			route_departure_code = flightData[start + 4];
			route_info_duration = flightData[start + 5];
			route_info_flight = flightData[start + 6];
			route_info_flight_share = flightData[start + 7];
			route_destination_time = flightData[start + 8];
			plus_flight = flightData[start + 9];
			route_destination_date = flightData[start + 10];
			route_destination_airport = flightData[start + 11];
			route_destination_code = flightData[start + 12];

			// --processing
			//date
			String[] route_departure_date_str = route_departure_date.split(" ");
			route_departure_date = route_departure_date_str[0];
			route_departure_date = route_departure_date.replace("/", "-"); // 2023/03/23 -> 2023-03-23
			
			String[] route_destination_date_str = route_destination_date.split(" ");
			route_destination_date = route_destination_date_str[0];
			route_destination_date = route_destination_date.replace("/", "-"); // 2023/03/23 -> 2023-03-23

			//code
			route_departure_code = route_departure_code.replace("(", "");
			route_departure_code = route_departure_code.replace(")", "");
			route_destination_code = route_destination_code.replace("(", "");
			route_destination_code = route_destination_code.replace(")", "");

			// --Make key
			keyStr += ", " + waiting + ", " + route_departure_time + ", " + route_departure_date + ", "
					+ route_departure_airport + ", " + route_departure_code + ", " + route_info_duration + ", "
					+ route_info_flight + ", " + route_info_flight_share + ", " + route_destination_time + ", "
					+ plus_flight + ", " + route_destination_date + ", " + route_destination_airport + ", "
					+ route_destination_code;
		}

		// ***** write *****
		Text key = new Text(keyStr);
		context.write(key, new IntWritable(Integer.parseInt(price)));
	}

}
