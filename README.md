# Idle Defense

Idle Defense is a tower defense game mixed with idle elements. The player will take over map after map of enemies, dealing with resource management and optimization in order to continually accelerate their rate of progression. 

The game is free, ad-free, doesn't have a premium currency, is open source, and open to PRs. In addition there will never be ads or even a donate link. The game is meant to be enjoyed, and that's that. 

The game is still in development and isn't hosted anywhere online yet, but you can clone the source and navigate your web browser to the `index.html` file and it should all work out. 

It's also currently using Kenney's amazing assets. You can check out his amazing stuff [here](https://kenney.itch.io/). 

## Design

There are several different maps of increasing difficulty. Difficulty increases through unmovable obstacles on the map and stronger enemies. In exchange, they drop more gold. The maps have dynamic maps (player creates the map with towers), on a grid. Maps will have one of a variety of game modes, including some where you need to "take over" e.g. a lighthouse to unlock more of the world map (with more map levels in it).

There are three forms of currency: Gold, Gems, and Research. Gold is earned by killing enemies. A lot of the maps will involve gem extractors, that give you a gem after the map is completed. Research is generated in a building. Gold is used for building and upgrading towers and buildings. Each upgrade also requires n gems, where n is the current level. The gold cost of towers increases with the number of those towers there already are built, across all maps. Selling towers gives 100% return. Research can be used to unlock and "augment" towers, with branching decisions like SC2's campaign research mechanic. Some of these "augments" unlock combos when towers are near each other, like Onslaught TD. Research can also be used to do things like make enemies stronger (and drop more gold), decrease time between waves, number of creeps per wave, etc. 

When you complete a map, the statistics for that run are used as if the same run was going consistently. So if there is a map that gives a gem at the end and it took the player 20 minutes to complete, they're now gaining a gem *every* 20 minutes. Runs can be replaced so the player can optimize their run or focus on research generation or something. 

Each building has an amount of health, and can be destroyed (returning 0 money). When an enemy reaches the end of the map it damages the buildings on that map for the remainder of its health. This can even destroy the maze the player has created, if the wall buildings reach 0 health. 

There are achievements for getting a certain amount of money, a certain level of tower, etc. that increase universal stat increases, unlock towers, or even maps. 

To make sure the player can continue even if all their towers are destroyed and they have no money, make it so players can directly damage enemies by clicking on them. 

In addition to the single player mode outline above, consider making a multiplayer "battle mode" where two players each get an empty map, and the new ability of sending creeps over to the other player. Each player gets an amount of money after each wave dependent on how many creeps they've sent to the other player (more creeps = more money per wave). 
