import mongoose from 'mongoose';

const timeLogsSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  entryTime: {
    type: Date,
  },

  exitTime: {
    type: Date,
  },

  totalTime: {
    type: String,
  },
});

const TimeLog = mongoose.model('timelogs', timeLogsSchema);

const createEntry = async (name, time) => {
  const data = {};
  data.name = name;
  data.entryTime = time;
  const timeLog = new TimeLog(data);
  return timeLog.save();
};

const checkEntry = async (name, time) => {
  const checkExit = await (await TimeLog.find({ name })).reverse();
  if (checkExit.length == 0) {
    await createEntry(name, time);
  }
  return checkExit;
};

const updateExit = async (id, time) => {
  const result = await TimeLog.findByIdAndUpdate(
    { _id: id },
    { exitTime: time },
    {
      new: true,
    }
  );
  return result;
};

const findName = async (name) => {
  const data = await (await TimeLog.find({ name })).reverse();
  return data[0];
};

const findAll = async (name) => {
  const data = await TimeLog.find({ name: name });
  console.log(data);
  return data;
};

export { createEntry, updateExit, findName, findAll, checkEntry };