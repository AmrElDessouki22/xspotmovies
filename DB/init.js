const mongoose = require('mongoose');
//'mongodb://localhost:27017/XspotTv'
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});
module.exports = mongoose