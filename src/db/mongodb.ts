import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function init() {
  function connect() {
    mongoose.connect('mongodb://localhost:27017/admin',
      { useNewUrlParser: true })
      .then(() => console.log('connected to mongodb'))
      .catch(e => console.error(e));
  }

  connect();
}
export default init;
