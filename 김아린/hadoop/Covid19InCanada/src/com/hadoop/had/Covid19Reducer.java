package com.hadoop.had;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.log4j.Logger;

public class Covid19Reducer extends Reducer<Text, IntWritable, Text, IntWritable> {
    static Logger logger = Logger.getLogger(Covid19Reducer.class);
    
    public void reduce(Text _key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
   	 int maxValue = Integer.MIN_VALUE;
   	 
   	 // process values
   	 for (IntWritable val : values) {
   		 maxValue = Math.max(maxValue, val.get());
   	 }
   	 context.write(_key, new IntWritable(maxValue));
    }

}

