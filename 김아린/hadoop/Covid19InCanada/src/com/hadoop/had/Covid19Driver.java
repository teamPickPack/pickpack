package com.hadoop.had;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class Covid19Driver {

    public static void main(String[] args) throws Exception {
   	 Configuration conf = new Configuration();
   	 Job job = Job.getInstance(conf, "Covid19PerMonthCanada");
   	 job.setJarByClass(com.hadoop.had.Covid19Driver.class);
   	 job.setMapperClass(com.hadoop.had.Covid19Mapper.class);

   	 job.setReducerClass(com.hadoop.had.Covid19Reducer.class);

   	 // TODO: specify output types
   	 job.setOutputKeyClass(Text.class);
   	 job.setOutputValueClass(IntWritable.class);

   	 // TODO: specify input and output DIRECTORIES (not files)
   	 FileInputFormat.setInputPaths(job, new Path(args[0]));
   	 FileOutputFormat.setOutputPath(job, new Path(args[1]));

   	 if (!job.waitForCompletion(true))
   		 return;
    }

}
