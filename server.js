const md5 = require("md5");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "12345", {
  host: process.env.HOST,
  dialect: "postgres",
});

const user = sequelize.define("user", {
  fname: {
    type: DataTypes.STRING,
  },
  lname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

const userprofile = sequelize.define("userprofile", {
  dob: {
    type: DataTypes.DATE,
  },
  Mobile_no: {
    type: DataTypes.INTEGER,
  },
});

user.hasOne(userprofile);
userprofile.belongsTo(user);

let userData = [
  {
    fname: "aditya",
    email: "adi@test.com",
    lname: "kumar",
    password: md5("12345"),
  },
  {
    fname: "john",
    email: "john@test.com",
    lname: "doe",
    password: md5("12345"),
  },
  {
    fname: "abcd",
    email: "abcd@test.com",
    lname: "kumar",
    password: md5("12345"),
  },
  {
    fname: "efgh",
    email: "adi@test.com",
    lname: "singh",
    password: md5("12345"),
  },
  {
    fname: "ijkl",
    email: "adi@test.com",
    lname: "mishra",
    password: md5("12345"),
  },
];

let userProfileData = [
  { dob: new Date("1990-01-01"), Mobile_no: 123456 },
  { dob: new Date("1995-01-01"), Mobile_no: 123457 },
  { dob: new Date("1997-01-01"), Mobile_no: 123458 },
  { dob: new Date("1998-01-01"), Mobile_no: 123459 },
  { dob: new Date("1996-01-01"), Mobile_no: 123450 },
];

async function main() {
  try {
    await sequelize.authenticate();
    console.log("connect to database");
  } catch (err) {
    console.log("an error occurred: ", err);
  }
  await user.sync({ force: true });
  await userprofile.sync({ force: true });
  await user.bulkCreate(userData);
  await userprofile.bulkCreate(userProfileData);
  let foundUser = await user.findAll();
  console.log(foundUser);
  let foundData = await userprofile.findAll();
  console.log(foundData);
  await getAvg();
}
async function getAvg() {
  let dob = await userprofile.findAll({
    attributes: ["dob"],
    raw: true,
  });
  console.log(dob);
}

main();
