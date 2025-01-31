const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const ProductSchema = new Schema(
    {
            name: { type: String, required: true, maxlength: 100 },
            price: { type: Number, required: true, min: 0 },
            description: { type: String, required: true, maxlength: 500 },
            category: { type: Types.ObjectId, ref: "Category", required: true }, // اتصال به مدل Category
            images: { type: [String], default: [] },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true } }
);

module.exports = model("Product", ProductSchema);
