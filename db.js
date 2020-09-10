const Sequelize = require('sequelize');
const sequelize = new Sequelize('media','postgres', 'PASS', {
host: 'localhost',
dialect: 'postgres'
});

sequelize.authenticate().then(
function(){
console.log('Connected to media postgress database');
},
function(err){
console.log(err);
}
);

module.exports = sequelize;
