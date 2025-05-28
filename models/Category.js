const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserExp",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: [50, "Le nom de la catégorie ne peut pas dépasser 50 caractères."],
        },
        status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
        icon: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.index({ name: 1, user: 1, status: 'active' }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
