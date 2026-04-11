import {
  model,
  models,
  Schema,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

import Event from "./event.model";

export type BookingModelType = {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type BookingDocument = HydratedDocument<BookingModelType>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingModelType>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Invalid email address",
      },
    },
  },
  { timestamps: true },
);

bookingSchema.pre("save", async function () {
  const doc = this as BookingDocument;

  if (!emailRegex.test(doc.email)) {
    throw new Error("Invalid email address");
  }

  // Validate foreign key integrity before creating/updating a booking.
  if (doc.isNew || doc.isModified("eventId")) {
    const exists = await Event.exists({ _id: doc.eventId });
    if (!exists) {
      throw new Error("Referenced event does not exist");
    }
  }
});

const Booking =
  (models.Booking as Model<BookingModelType> | undefined) ??
  model<BookingModelType>("Booking", bookingSchema);

export default Booking;
