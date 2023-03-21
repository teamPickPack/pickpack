package com.pickpack.flight;

import java.io.IOException;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

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
		
		//Make key
		String keyStr = date + ", " + airName + ", " + codeShare + ", " + departureAirport + ", " + departureTime + ", " + duration + ", " 
		+ destinationAirport + ", " + destinationTime + ", " + plus + ", " + type;
		
		//Make value
		//Remove won
		price = StringUtils.removeEnd(price, "원");
		
		//write
		Text key = new Text(keyStr);
       context.write(key, new IntWritable(Integer.parseInt(price)));
	}

}
