//import Monster from './monster';

class Monster {
	constructor(){
		this.monsterName = "Default";
		this.monsterType = "Default";
		this.currentHealth = 0;
		this.attack1Min = 0;
		this.attack1Max = 0;
		this.attack1Description = "Default";
		this.attack2Min = 0;
		this.attack2Max = 0;
		this.attack2Description = "Default";
		this.attack3Min = 0;
		this.attack3Max = 0;
		this.attack3Description = "Default";
		this.initialHealth = 0;
		this.fainted = false;
	};
	outputMonster(){
		let output = "\nName: " + this.monsterName + "\nType: " + this.monsterType +
					"\nHealth: " + this.currentHealth + "\nMoves: \n1. " + attack1Description +
					"\n2. " + attack2Description + "\n3. " + attack3Description;
		return output;
	};
	attack1(){
		let damage = Math.floor(Math.random() * (this.attack1Max-this.attack1Min+1)) + this.attack1Min;
		return damage; 
	};
	attack2(){
		let damage = Math.floor(Math.random() * (this.attack2Max-this.attack2Min+1)) + this.attack2Min;
		return damage; 
	};
	attack3(){
		let heal = Math.floor(Math.random() * (this.attack3Max-this.attack3Min+1)) + this.attack3Min;
		if(heal + this.currentHealth >= this.initialHealth){
			this.currentHealth = this.initialHealth;
		}
		else
		{
			this.currentHealth += heal;
		}
		return heal;
	};
	takeDamage(damage){
		if (this.currentHealth - damage <= 0){
			this.fainted = true;
			this.currentHealth = 0;
		}
		else {
			this.currentHealth -= damage;
		}
		return this.currentHealth;
	};
	returnHealth(){
		return this.currentHealth;
	};
	returnFainted(){
		return this.fainted;
	};
};

let statusMessageText = document.getElementById('status-message'),
	storyMessageText = document.getElementById('story-message'),
	enemyMessageText = document.getElementById('enemy-message'),
	playerMessageText = document.getElementById('player-message'),
	attackMessageText = document.getElementById('attack-message'),
	aquarexButton = document.getElementById('aquarex-button'),
	infernosaurButton = document.getElementById('infernosaur-button'),
	pterowindButton = document.getElementById('pterowind-button'),
	inventoryButton = document.getElementById('inventory-button'),
	attack1Button = document.getElementById('attack1-button'),
	attack2Button = document.getElementById('attack2-button'),
	attack3Button = document.getElementById('attack3-button'),
	newGameButton = document.getElementById('new-game-button'),
	continueButton = document.getElementById('continue-button'),
	quitButton = document.getElementById('quit-button');

let enemyMonster = new Monster(),
	playerMonster = new Monster(),
	aquarex = new Monster(),
	infernosaur = new Monster(),
	pterowind = new Monster();

let score = 0;

let movePick = 0;

function newGameSetup(){
	aquarexButton.style.display = 'none';
	infernosaurButton.style.display = 'none';
	pterowindButton.style.display = 'none';
	inventoryButton.style.display = 'none';
	attack1Button.style.display = 'none';
	attack2Button.style.display = 'none';
	attack3Button.style.display = 'none';
	continueButton.style.display = 'none';
	quitButton.style.display = 'none';

	newGameButton.style.display = 'block';

	statusMessageText.innerText = "Press 'New Game' to Start!";
	storyMessageText.innerText = "";
	enemyMessageText.innerText = "";
	playerMessageText.innerText = "";
	attackMessageText.innerText = "";
}

function randomAdventure(){
	let adventures = ["You walk for hours, almost ready to turn back when: ",
                      "You turn right, facing a stone cliff: ",
                      "Your monster drags you forward: ",
                      "You don't even take two steps when: ",
                      "You feel like you walk in a circle through fog: ",
                      "You sit down to shut your eyes for a couple minutes, when: ",
                      "You backtrack through the field: ",
                      "You enter a dark forest: ",
                      "You sit down to sketch your previous foe when: ",
                      "You run and run, finally you stop, but: ",
                      "You find a hollow tree and hope to hide in it, however: ",
                      "You climb a thick oak, finally stopping to take a breath on a big branch when: ",
                      "You aren't careful and in your hurry slip and slide into a ravine: ",
                      "It's getting dark and your feet hurt, you drag yourself to rest under a fallen tree, but: ",
                      "You are out of water. You find a small stream. It gleams red, but thirst urges you to drink: ",
                      "You turn left, sharp drop off is only steps away: "
                     ];
    let pick =  Math.floor(Math.random() * (adventures.length - 1));
    return adventures[pick];
}

function randomStory(){
	let stories = ["Suddenly a giant shadow covers you!\n",
                   "You see a bush rustle!\n",
                   "You see a shadow above, you look up...\n",
                   "You feel a presence behind you, you turn around!\n",
                   "You smell something attrocious...\n",
                   "You step on something... It's a tail!\n",
                   "You feel uneasy...\n",
                   "Your monsters start growling.\n",
                   "Shiver runs down your body...\n",
                   "You hear a menacing screach.\n",
                   "Ground shakes under your feet!\n",
                   "Startled birds fly away...\n",
                   "Pleasant aroma surrounds you...\n",
                   "Suddenly it's hard to breathe!\n",
                   "You feel dropplets of water on your skin.\n",
                   "There is a bright light!\n",
                   "The skies darken...\n",
                   "Intricate snowflakes land on your hair...\n",
                   "You feel crushing pressure!\n",
                   "A feeling of total dismay washes over you...\n",
                   "Claws dig in into your shoulder!\n",
                   "Dropplets of sweat form on your forehead...\n"
                   ];
    let pick =  Math.floor(Math.random() * (stories.length - 1));
    return stories[pick];
}

newGameButton.addEventListener('click', function(){
	enemyMonster = randomMonster();
	storyMessageText.innerText += "You walk into the field:\n" + randomStory() + "\nA wild " +
								enemyMonster.monsterName + " (" + enemyMonster.monsterType + 
								" type) appears!";
	statusMessageText.innerText = "Score: " + score;
	enemyMessageText.innerText = "";
	playerMessageText.innerText = "";
	attackMessageText.innerText = "";
	displayMonsters();
});

function randomMonster(){
	let monster = new Monster();
	monster.monsterType = randomType();
	monster.monsterName = randomName(monster.monsterType);
	monster.initialHealth = Math.floor(Math.random() * 71) + 80;
	monster.currentHealth = monster.initialHealth;
	monster.attack1Min = Math.floor(Math.random() * 4) + 10;
	monster.attack1Max = Math.floor(Math.random() * 12) + 14;
	monster.attack1Description = 'Long Range Attack';
	monster.attack2Min = Math.floor(Math.random() * 8) + 13;
	monster.attack2Max = Math.floor(Math.random() * 12) + 24;
	monster.attack2Description = 'Short Range Attack';
	monster.attack3Min = Math.floor(Math.random() * 4) + 5;
	monster.attack3Max = Math.floor(Math.random() * 3) + 10;
	monster.fainted = false;
	return monster;
}	

function randomType(){
	let types = ['Fire', 'Ice', 'Dark', 'Grass', 'Water', 'Bug', 'Ground', 'Space', 'Magic', 'Flying', 
	'Wind' , 'Fighting'];
	let pick = Math.floor(Math.random() * (types.length-1));
	return types[pick];
}

function randomName(type){
	let prefix = "Default";
	let suffix = "saur";
	let fire_name_prefix = [ 'Fire','Heat','Melt','Lava','Hot','Steam','Magma','Explodo','Flame','Inferno'];
	let fire_name_suffix = [ 'rock','steel','steam','soot','ash','saur','rex','sear','burn','smoke','fry'];
	let ice_name_prefix = [ 'Ice','Icicle','Frost','Freeze','Snow','Cold','Chill','Hale'];
	let ice_name_suffix = [ 'storm','wind','y','icer','mare','saur','rex','ray',' Beast',' Bird', ' Bear'];
	let dark_name_prefix = [ 'Evil','Devil','Dark','Dread','Fear','Sorrow','Broken','Shadow','Shade','Black','Grey','Fright','Horror'];
	let dark_name_suffix = [ ' Devil',' Raven',' Bat',' Wolf','beast',' Abomination',' King',' Viper', 'rey','saur','rex'];
	let grass_name_prefix = [ 'Leaf','Branch','Tree','Greene','Bloom','Aroma','Polen','Honey','Sweet','Fresh'];
	let grass_name_suffix = [ ' Flower', 'stick','grow','root','fruit','berry','sprout'];
	let water_name_prefix = [ 'Flow','Spring','River','Sea','Ocean','Dive','Wave','Splash','Serene','Aqua','Coral','Reef','Float'];
	let water_name_suffix = [ 'bubble','stream','deapth','stormer','rainy','row','fin','gills','deep','er','ay','saur','rex','fei'];
	let bug_name_prefix = [ 'Fire', 'Manywing','Golden','Stripe','Shine','Horn','Centi','Butter','Dragon'];
	let bug_name_suffix = [ 'buzz','fly','wing','pede','soar','crawl','ezz','flap','ula','bite','sting'];
	let ground_name_prefix = [ 'Rock','Sedament','Sand','Stone','Lime','Lava','Earth','Minera','Granite','Mud','Clay','Dust','Marble'];
	let ground_name_suffix = [ 'stomper','or','quake','shake','storm','dig','dug','mantle','melt','saur','rex','ren','more'];
	let space_name_prefix = [ 'Gravity','Float','Cosmos','Alien','Space','Specimen','Abduct','Extraterestrial','Mars','Venus','Saturn','Pluto','Titan'];
	let space_name_suffix = [ 'invader','pilot','destroyer','or','er','man','void','matter','leader','soldier'];
    let magic_name_prefix = [ 'Magic','Enchant','Mystery','Secret','Mana','Potion','Wizard','Witch','Wiz'];
    let magic_name_suffix = [ 'cultist','ed','ment','robed','mage','mirage','trick'];
    let flying_name_prefix = [ 'Fly','Soar','Feather','Blue','Red','Golden','Ptero','Split','Roam','Caw','Raven'];
    let flying_name_suffix = [ 'wing','puff','beak','claw','tail'];
    let wind_name_prefix = [ 'Wind','Gull','Breath','Breathe','Gust','Flow','Storm','Twister'];
    let wind_name_suffix = [ 'blow','er','ex','fresh','free','sky','atmos','air','ozoner'];
    let fighting_name_prefix = [ 'Fist','Kick','Knock','Punch','Uppercut','Martial','Melee'];
    let fighting_name_suffix = [ 'fighter','puncher','out','soldier','knight','hitter'];

    if (type == 'Fire')
    {
    	prefix = fire_name_prefix[Math.floor(Math.random() * (fire_name_prefix.length-1))];
    	suffix = fire_name_suffix[Math.floor(Math.random() * (fire_name_suffix.length-1))];
    }
    else if (type == 'Ice')
    {
    	prefix = ice_name_prefix[Math.floor(Math.random() * (ice_name_prefix.length-1))];
    	suffix = ice_name_suffix[Math.floor(Math.random() * (ice_name_suffix.length-1))];
    }
    else if (type == 'Dark')
    {
    	prefix = dark_name_prefix[Math.floor(Math.random() * (dark_name_prefix.length-1))];
    	suffix = dark_name_suffix[Math.floor(Math.random() * (dark_name_suffix.length-1))];
    }
    else if (type == 'Grass')
    {
    	prefix = grass_name_prefix[Math.floor(Math.random() * (grass_name_prefix.length-1))];
    	suffix = grass_name_suffix[Math.floor(Math.random() * (grass_name_suffix.length-1))];
    }
    else if (type == 'Water')
    {
    	prefix = water_name_prefix[Math.floor(Math.random() * (water_name_prefix.length-1))];
    	suffix = water_name_suffix[Math.floor(Math.random() * (water_name_suffix.length-1))];
    }
    else if (type == 'Bug')
    {
    	prefix = bug_name_prefix[Math.floor(Math.random() * (bug_name_prefix.length-1))];
    	suffix = bug_name_suffix[Math.floor(Math.random() * (bug_name_suffix.length-1))];
    }
    else if (type == 'Ground')
    {
    	prefix = ground_name_prefix[Math.floor(Math.random() * (ground_name_prefix.length-1))];
    	suffix = ground_name_suffix[Math.floor(Math.random() * (ground_name_suffix.length-1))];
    }
    else if (type == 'Space')
    {
    	prefix = space_name_prefix[Math.floor(Math.random() * (space_name_prefix.length-1))];
    	suffix = space_name_suffix[Math.floor(Math.random() * (space_name_suffix.length-1))];
    }
    else if (type == 'Magic')
    {
    	prefix = magic_name_prefix[Math.floor(Math.random() * (magic_name_prefix.length-1))];
    	suffix = magic_name_suffix[Math.floor(Math.random() * (magic_name_suffix.length-1))];
    }
    else if (type == 'Flying')
    {
    	prefix = flying_name_prefix[Math.floor(Math.random() * (flying_name_prefix.length-1))];
    	suffix = flying_name_suffix[Math.floor(Math.random() * (flying_name_suffix.length-1))];
    }
    else if (type == 'Wind')
    {
    	prefix = wind_name_prefix[Math.floor(Math.random() * (wind_name_prefix.length-1))];
    	suffix = wind_name_suffix[Math.floor(Math.random() * (wind_name_suffix.length-1))];
    }
    else if (type == 'Fighting')
    {
    	prefix = fighting_name_prefix[Math.floor(Math.random() * (fighting_name_prefix.length-1))];
    	suffix = fighting_name_suffix[Math.floor(Math.random() * (fighting_name_suffix.length-1))];
    }
    return prefix + suffix;
}

function initiatePlayerMonsters(){
	aquarex.monsterName = "Aquarex";
    aquarex.monsterType = "Water";
    aquarex.currentHealth = 110;
    aquarex.attack1Min = 15;
    aquarex.attack1Max = 20;
    aquarex.attack1Description = "Splash: 15-20 damage";
    aquarex.attack2Min = 10;
    aquarex.attack2Max = 28;
    aquarex.attack2Description = "Wave: 10-28 damage";
    aquarex.attack3Min = 11;
    aquarex.attack3Max = 15;
    aquarex.attack3Description = "Refresh: 11-15 heal";
    aquarex.initialHealth = 110;
    aquarex.fainted = false;

    infernosaur.monsterName = "Infernosaur";
    infernosaur.monsterType = "Fire";
    infernosaur.currentHealth = 90;
    infernosaur.attack1Min = 18;
    infernosaur.attack1Max = 23;
    infernosaur.attack1Description = "Spark: 18-23 damage";
    infernosaur.attack2Min = 15;
    infernosaur.attack2Max = 33;
    infernosaur.attack2Description = "Ignite: 15-33 damage";
    infernosaur.attack3Min = 6;
    infernosaur.attack3Max = 10;
    infernosaur.attack3Description = "Rekindle: 6-10 heal";
    infernosaur.initialHealth = 90;
    infernosaur.fainted = false;

    pterowind.monsterName = "Pterowind";
    pterowind.monsterType = "Wind";
    pterowind.currentHealth = 100;
    pterowind.attack1Min = 18;
    pterowind.attack1Max = 20;
    pterowind.attack1Description = "Ruffle: 18-20 damage";
    pterowind.attack2Min = 15;
    pterowind.attack2Max = 30;
    pterowind.attack2Description = "Sky Dive: 15-30 damage";
    pterowind.attack3Min = 6;
    pterowind.attack3Max = 12;
    pterowind.attack3Description = "Nest: 6-12 heal";
    pterowind.initialHealth = 100;
    pterowind.fainted = false;

    aquarexButton.innerText = ("Aquarex:\nType: " + aquarex.monsterType + "\nHealth: " + aquarex.currentHealth + 
    						"\nAttacks:\n1. " + aquarex.attack1Description + "\n2. " + aquarex.attack2Description +
    						"\n3. " + aquarex.attack3Description); 
    infernosaurButton.innerText = ("Infernosaur:\nType: " + infernosaur.monsterType + "\nHealth: " + infernosaur.currentHealth + 
    						"\nAttacks:\n1. " + infernosaur.attack1Description + "\n2. " + infernosaur.attack2Description +
    						"\n3. " + infernosaur.attack3Description); 
    pterowindButton.innerText = ("Pterowind:\nType: " + pterowind.monsterType + "\nHealth: " + pterowind.currentHealth + 
    						"\nAttacks:\n1. " + pterowind.attack1Description + "\n2. " + pterowind.attack2Description +
    						"\n3. " + pterowind.attack3Description); 
}

function displayMonsters(){
	playerMessageText.innerText = "Which monster do you pick?";
	statusMessageText.innerText = "Score: " + score;
	enemyMessageText.innerText = "";
	attackMessageText.innerText = "";

	aquarexButton.innerText = ("Aquarex:\nType: " + aquarex.monsterType + "\nHealth: " + aquarex.currentHealth + 
    						"\nAttacks:\n1. " + aquarex.attack1Description + "\n2. " + aquarex.attack2Description +
    						"\n3. " + aquarex.attack3Description); 
    infernosaurButton.innerText = ("Infernosaur:\nType: " + infernosaur.monsterType + "\nHealth: " + infernosaur.currentHealth + 
    						"\nAttacks:\n1. " + infernosaur.attack1Description + "\n2. " + infernosaur.attack2Description +
    						"\n3. " + infernosaur.attack3Description); 
    pterowindButton.innerText = ("Pterowind:\nType: " + pterowind.monsterType + "\nHealth: " + pterowind.currentHealth + 
    						"\nAttacks:\n1. " + pterowind.attack1Description + "\n2. " + pterowind.attack2Description +
    						"\n3. " + pterowind.attack3Description); 
	aquarexButton.style.display = "inline-block";
	infernosaurButton.style.display = "inline-block";
	pterowindButton.style.display = 'inline-block';
	
	attack1Button.style.display = 'none';
	attack2Button.style.display = 'none';
	attack3Button.style.display = 'none';
	inventoryButton.style.display = 'none';
	newGameButton.style.display = 'none';
	continueButton.style.display = 'none';
	quitButton.style.display = 'none';
}

function displayAttacks(monster){
	aquarexButton.style.display = "none";
	infernosaurButton.style.display = "none";
	pterowindButton.style.display = 'none';
	newGameButton.style.display = 'none';
	continueButton.style.display = 'none';
	quitButton.style.display = 'none';

	attack1Button.style.display = 'inline-block';
	attack2Button.style.display = 'inline-block';
	attack3Button.style.display = 'inline-block';
	inventoryButton.style.display = 'block';

	playerMessageText.innerText += "\nPick " + monster.monsterName + "'s move or open inventory: ";
	statusMessageText.innerText = "Score: " + score;
	enemyMessageText.innerText = "";
	attackMessageText.innerText = "";

	attack1Button.innerText = monster.attack1Description;
	attack2Button.innerText = monster.attack2Description;
	attack3Button.innerText = monster.attack3Description;
}

aquarexButton.addEventListener('click', function(){
	playerMessageText.innerText = "Aquarex, go!";
	playerMonster = aquarex;
	displayAttacks(aquarex);
});

infernosaurButton.addEventListener('click', function(){
	playerMessageText.innerText = "Infernosaur, go!";
	playerMonster = infernosaur;
	displayAttacks(infernosaur);
});

pterowindButton.addEventListener('click', function(){
	playerMessageText.innerText = "Pterowind, go!";
	playerMonster = pterowind;
	displayAttacks(pterowind);
});

attack1Button.addEventListener('click', function(){
	playerAttack(1);
});

attack2Button.addEventListener('click', function(){
	playerAttack(2);
});

attack3Button.addEventListener('click', function(){
	playerAttack(3);
});

function monsterAttack() {
	if(!enemyMonster.fainted){
		let pick = Math.floor(Math.random() * 3);
		if (pick == 0)
		{
			playerMonster.takeDamage(enemyMonster.attack1());
			updateHealth();
		}
		else if(pick == 1)
		{
			playerMonster.takeDamage(enemyMonster.attack2());
			updateHealth();
		}
		else
		{
			enemyMonster.attack3();
		}
		enemyMessageText.innerText = "\n" + enemyMonster.monsterName + 
									"'s health: " + enemyMonster.currentHealth;
	}
	else
	{
		enemyMessageText.innerText = "\n" + enemyMonster.monsterName + 
									"'s health: " + enemyMonster.currentHealth;
		storyMessageText.innerText = "Your " + playerMonster.monsterName + 
									" defeated " + enemyMonster.monsterName + "!";
		displayScore(10);
		encounterOver();
	}
}

function playerAttack(attack){
	if(!playerMonster.fainted){
		if (attack == 1) {
			enemyMonster.takeDamage(playerMonster.attack1());
		}
		else if (attack == 2) {
			enemyMonster.takeDamage(playerMonster.attack2());
		}
		else
		{
			playerMonster.attack3();
			updateHealth();
		}
		playerMessageText.innerText = "\n" + playerMonster.monsterName +
									"'s health: " + playerMonster.currentHealth;
		monsterAttack();
	}
	else
	{
		playerMessageText.innerText = "\n" + playerMonster.monsterName +
									"'s health: " + playerMonster.currentHealth;
		
		storyMessageText.innerText = "Your " + playerMonster.monsterName + 
									" was defeated by " + enemyMonster.monsterName + ".";
		displayScore(-10);
		encounterOver();
	}
}

function updateHealth() {
	if (playerMonster.monsterName == "Aquarex") {
		aquarex.currentHealth = playerMonster.currentHealth;
	}
	else if (playerMonster.monsterName == "Infernosaur") {
		infernosaur.currentHealth = playerMonster.currentHealth;
	}
	else if (playerMonster.monsterName == "Pterowind") {
		pterowind.currentHealth = playerMonster.currentHealth;
	}
}

function displayScore(scoreAdjust) {
	if(score + scoreAdjust <= 0){
		score = 0;
	}
	else
	{
		score += scoreAdjust;
	}
	statusMessageText.innerText = "Score: " + score;
}

function encounterOver() {
	aquarexButton.style.display = 'none';
	infernosaurButton.style.display = 'none';
	pterowindButton.style.display = 'none';
	inventoryButton.style.display = 'none';
	attack1Button.style.display = 'none';
	attack2Button.style.display = 'none';
	attack3Button.style.display = 'none';
	newGameButton.style.display = 'none';
	if(aquarex.fainted && infernosaur.fainted && pterowind.fainted) {
		statusMessageText.innerText += "\n" + "All your monsters have" +
					" fainted. You hurry to find your way home. Game Over.";
		quitButton.style.display = 'inline-block';
	}
	else {
		continueButton.style.display = 'inline-block';
		quitButton.style.display = 'inline-block';
	}
}

quitButton.addEventListener('click', function(){
	location.reload();
});

continueButton.addEventListener('click', function(){
	enemyMonster = randomMonster();
	storyMessageText.innerText = randomAdventure() + "\n" + randomStory() + "\nA wild " +
								enemyMonster.monsterName + " (" + enemyMonster.monsterType + 
								" type) appears!";
	statusMessageText.innerText = "Score: " + score;
	enemyMessageText.innerText = "";
	playerMessageText.innerText = "";
	attackMessageText.innerText = "";
	displayMonsters();
});

newGameSetup();
initiatePlayerMonsters();
