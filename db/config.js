const dbShop = "mongodb://localhost:27017/MyFans";
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
module.exports = { dbShop, options };
