package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class FlightTicket {
	
	public static class FlightMapper extends Mapper<LongWritable, Text, Text, Text> {

	public void map(LongWritable ikey, Text ivalue, Context context) throws IOException, InterruptedException {
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
		// date : 20230323 -> 2023-03-23
		String newdate = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
		
		// plus
		plus = StringUtils.removeFirst(plus, "\\+");

		// --Make key
		String keyStr = newdate + ", " + airName + ", " + codeShare + ", " + departureAirport + ", " + departureTime
				+ ", " + duration + ", " + destinationAirport + ", " + destinationTime + ", "
				+ plus + ", " + type;

		// *****Flight Detail *****
		String waiting;
		String route_departure_time;
		String route_departure_date;
		String route_departure_airport;
		String route_departure_code;
		String route_info_duration;
		String route_info_flight;
		String route_info_flight_share;
		String route_info_mid_waypoint;
		String route_destination_time;
		String plus_flight;
		String route_destination_date;
		String route_destination_airport;
		String route_destination_code;

		int flight_size = (flightData.length - 11) / 14;

		// 11~23, 24~36 ..
		for (int i = 0; i < flight_size; i++) {
			int start = 11 + (14 * i);

			waiting = flightData[start];
			route_departure_time = flightData[start + 1];
			route_departure_date = flightData[start + 2];
			route_departure_airport = flightData[start + 3];
			route_departure_code = flightData[start + 4];
			route_info_duration = flightData[start + 5];
			route_info_flight = flightData[start + 6];
			route_info_flight_share = flightData[start + 7];
			route_info_mid_waypoint = flightData[start + 8];
			route_destination_time = flightData[start + 9];
			plus_flight = flightData[start + 10];
			route_destination_date = flightData[start + 11];
			route_destination_airport = flightData[start + 12];
			route_destination_code = flightData[start + 13];

			// --processing
			// date
			String[] route_departure_date_str = route_departure_date.split(" ");
			route_departure_date = route_departure_date_str[0];
			route_departure_date = route_departure_date.replace("/", "-"); // 2023/03/23 -> 2023-03-23

			String[] route_destination_date_str = route_destination_date.split(" ");
			route_destination_date = route_destination_date_str[0];
			route_destination_date = route_destination_date.replace("/", "-"); // 2023/03/23 -> 2023-03-23

			// code
			route_departure_code = route_departure_code.replace("(", "");
			route_departure_code = route_departure_code.replace(")", "");
			route_destination_code = route_destination_code.replace("(", "");
			route_destination_code = route_destination_code.replace(")", "");

			// --Make key
			keyStr += ", " + waiting + ", " + route_departure_time + ", " + route_departure_date + ", "
					+ route_departure_airport + ", " + route_departure_code + ", " + route_info_duration + ", "
					+ route_info_flight + ", " + route_info_flight_share + ", " + route_info_mid_waypoint + ", "
					+ route_destination_time + ", " + plus_flight + ", " + route_destination_date + ", "
					+ route_destination_airport + ", " + route_destination_code;
		}

		// ***** write *****
		Text key = new Text(keyStr);
		Text value = new Text(price);
		context.write(key, value);
	}

}

	/*
	Text, IntWritable : input key type and the value type of input value list
	Text, IntWritable : output key-value pair type
	*/
	public static class FlightReducer
			extends Reducer<Text,IntWritable,Text,IntWritable> {

		// variables
		private IntWritable result = new IntWritable();

		// key : a disticnt word
		// values :  Iterable type (data list)
		public void reduce(Text key, Iterable<IntWritable> values, Context context) 
				throws IOException, InterruptedException {

		}
	}


	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
		if ( otherArgs.length != 2 ) {
			System.err.println("Usage: <in> <out>");
			System.exit(2);
		}
		Job job = new Job(conf,"flight ticket");
		job.setJarByClass(FlightTicket.class);

		// let hadoop know my map and reduce classes
		job.setMapperClass(FlightMapper.class);
		// job.setReducerClass(FlightReducer.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		// set number of reduces
		// job.setNumReduceTasks(2);

		// set input and output directories
		FileInputFormat.addInputPath(job,new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job,new Path(otherArgs[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1 );
	}
}

