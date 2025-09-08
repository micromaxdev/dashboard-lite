const mongoose = require("mongoose");

const servicePipelineSchema = new mongoose.Schema(
  {
    call_id: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    business_partner_code: {
      type: String,
      required: true,
    },
    business_partner_name: {
      type: String,
      required: true,
    },
    sales_employee_name: {
      type: String,
      required: true,
    },
    creation_date: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      default: "",
    },
    managed_by: {
      type: String,
      required: true,
    },
    business_partner_ref_no: {
      type: String,
      default: "",
    },
    quoted_or_estimated_amount: {
      type: Number,
      default: 0,
    },
    job_status: {
      type: String,
      required: true,
      enum: [
        "Open",
        "Dispatched",
        "Waiting Parts",
        "Ready for A/R Inv",
        "Ready for A/P Inv",
        "Pending",
        "Cancelled",
      ],
    },
    calltype: {
      type: String,
      required: true,
      enum: [
        "Solution",
        "Contract",
        "Hardware",
        "RMA",
        "Warranty",
        "Traffic Survey",
        "Software",
        "Customer Site Audit",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create index on call_id for faster lookups
servicePipelineSchema.index({ call_id: 1 });

// Create index on business_partner_code for filtering
servicePipelineSchema.index({ business_partner_code: 1 });

// Create index on job_status for status filtering
servicePipelineSchema.index({ job_status: 1 });

// Create index on calltype for type filtering
servicePipelineSchema.index({ calltype: 1 });

// Create compound index for date range queries
servicePipelineSchema.index({ creation_date: 1, due_date: 1 });

module.exports = mongoose.model("ServicePipeline", servicePipelineSchema);
