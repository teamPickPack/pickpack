package com.ssafy.sh;

import java.io.IOException;
import java.util.Arrays;
import java.util.regex.Pattern;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class Covid19Mapper extends Mapper<LongWritable, Text, Text, IntWritable> {

	static Logger logger = Logger.getLogger(Covid19Mapper.class);

	int total = 0;

	public void map(LongWritable ikey, Text ivalue, Context context) throws IOException, InterruptedException {
		// logger.info("ikey : " + ikey + ", ivalue : " + ivalue);
		PropertyConfigurator.configure("log4j.properties");
		Text date;

		String line = ivalue.toString();

		String CovidData[] = line.split(",");
		String pattern = "[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]";
		
		if (CovidData.length != 0 && Pattern.matches(pattern, CovidData[0].trim())) {
			// 1/20/2020
			String tempDate = CovidData[0].trim();
			String[] dateArr = tempDate.split("/");
			// date : 1/2020 = month/year
			date = new Text(dateArr[0] + "/" + dateArr[2]);
			StringBuilder sb = new StringBuilder();
			// sb : total number of covid19 per day
			if(CovidData[1].charAt(0) == '"') {
				int idx = 1;
				boolean q = true;
				sb.append(CovidData[1].replace("\"", "").trim());
				idx++;
				while(q) {
					String temp = CovidData[idx].trim();
					if(temp.charAt(temp.length()-1) == '"') {
						q = false;
						sb.append(temp.replace("\"", "").trim());
					}else {
						sb.append(temp);
					}
					idx++;
				}
				
			}else {
				sb.append(CovidData[1].trim());
			}

			if (isNumberic(sb.toString()) == true) {
				total = Integer.parseInt(sb.toString().trim());
				context.write(date, new IntWritable(total));
				logger.info("date : " + date + ", total : " + total);
			}

		}
	}

	public static boolean isNumberic(String strNum) {
		if (strNum == null) {
			return false;
		}
		try {
			double d = Double.parseDouble(strNum);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;

	}

}
