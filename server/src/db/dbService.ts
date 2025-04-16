const ENVIRONMENT: string = process.env.NODE_ENV || "development";

const connectToDb = (): void => {
  if (ENVIRONMENT === "development") {
    require("./mongodb/connectToLocal");
  }
  if (ENVIRONMENT === "production") {
    require("./mongodb/connectToAtlas");
  }
};

export default connectToDb;
