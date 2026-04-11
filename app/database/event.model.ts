import {
  model,
  models,
  Schema,
  type HydratedDocument,
  type Model,
} from "mongoose";

export type EventModelType = {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

type EventDocument = HydratedDocument<EventModelType>;

const nonEmptyTrimmed = {
  validator: (value: string) => value.trim().length > 0,
  message: "Field cannot be empty",
};

const eventSchema = new Schema<EventModelType>(
  {
    title: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    slug: { type: String, unique: true, trim: true },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: nonEmptyTrimmed,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      validate: nonEmptyTrimmed,
    },
    image: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    venue: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    location: {
      type: String,
      required: true,
      trim: true,
      validate: nonEmptyTrimmed,
    },
    date: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    time: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    mode: { type: String, required: true, trim: true, validate: nonEmptyTrimmed },
    audience: {
      type: String,
      required: true,
      trim: true,
      validate: nonEmptyTrimmed,
    },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0),
        message: "Agenda must contain at least one non-empty item",
      },
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      validate: nonEmptyTrimmed,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0),
        message: "Tags must contain at least one non-empty item",
      },
    },
  },
  { timestamps: true },
);

eventSchema.index({ slug: 1 }, { unique: true });

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeDate(dateValue: string): string {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid date value");
  }
  // Keep a stable ISO date-only format for consistent storage.
  return parsed.toISOString().slice(0, 10);
}

function normalizeTime(timeValue: string): string {
  const value = timeValue.trim();
  const twentyFourHour = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  const twelveHour = /^(\d{1,2}):([0-5]\d)\s*([APap][Mm])$/;

  const match24 = value.match(twentyFourHour);
  if (match24) {
    const [, h, m] = match24;
    return `${h.padStart(2, "0")}:${m}`;
  }

  const match12 = value.match(twelveHour);
  if (match12) {
    let hour = Number.parseInt(match12[1], 10);
    const minutes = match12[2];
    const period = match12[3].toLowerCase();
    if (hour < 1 || hour > 12) {
      throw new Error("Invalid time value");
    }
    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  }

  throw new Error("Invalid time value");
}

eventSchema.pre("save", function () {
  const doc = this as EventDocument;

  // Only regenerate slug when title changes to keep stable URLs.
  if (doc.isModified("title")) {
    doc.slug = toSlug(doc.title);
  }

  // Normalize date/time before persisting for predictable reads.
  try {
    doc.date = normalizeDate(doc.date);
    doc.time = normalizeTime(doc.time);
  } catch (error) {
    throw error as Error;
  }

  // Extra guard to reject required strings that are only whitespace.
  const requiredStringFields: Array<keyof EventModelType> = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  const hasEmptyRequiredField = requiredStringFields.some((field) => {
    const value = doc[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (hasEmptyRequiredField) {
    throw new Error("Required fields must not be empty");
  }
});

const Event =
  (models.Event as Model<EventModelType> | undefined) ??
  model<EventModelType>("Event", eventSchema);

export default Event;
