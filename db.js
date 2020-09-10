const Sequelize = require('sequelize');
const sequelize = new Sequelize('<database name>','postgres', '<password> ', {
host: 'localhost',
dialect: 'postgres'
});

sequelize.authenticate().then(
function(){
console.log('Connected to <database name>  postgress database');
},
function(err){
console.log(err);
}
);

module.exports = sequelize;
