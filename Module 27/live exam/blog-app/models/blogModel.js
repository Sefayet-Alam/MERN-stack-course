import mongoose from 'mongoose';

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

export default blogModel;  // Default export
