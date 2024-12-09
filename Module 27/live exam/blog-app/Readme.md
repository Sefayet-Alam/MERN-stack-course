Following is a schema model given below. 



`

const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(

  {

    title: { type: String },

    short_des: { type: String },

    des: { type: String },

    img: { type: String },

  },

  {

    versionKey: false,

    timestamps: true,

  }

);



const blogModel = mongoose.model("blogs", DataSchema);



module.exports = blogModel;



`



Requirements:  

Now generate the codes on how to Create a blog.

Generate the codes for how to Read the data of a single blog.

Generate codes on how to Delete a blog based on a specific ID.

Generate codes on how to Update a blog based on a specific ID.




Submission Guidelines:

Submit all generated codes here only
