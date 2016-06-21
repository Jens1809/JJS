var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Builder1', { role: 'builder' } );
//Game.spawns.Spawn1.createCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig', { role: 'harvester' } );

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);

    if((harvester.length + upgrader.length) < 6) {
        if(Game.spawns.Spawn1.energy >= 200){
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            //var newName = Game.spawns.Spawn1.createCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], 'HarvesterBig', { role: 'harvester' } );
            console.log('Spawning new harvester: ' + newName);
        }
    }
    if(builder.length < 2){
        if(Game.spawns.Spawn1.energy >= 200){
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}/**
 * Created by jjostwerner on 21.06.2016.
 */
