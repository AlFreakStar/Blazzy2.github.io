// GLOBALS
var summonfxInterval, summaryDisplayTimeout;
var spiritOriginList = [];
var ccindex = 0;
var skipSummonfx = false;

// FUCTIONS
function onPageLoad() {
    var queryString = decodeURIComponent(window.location.search);
    var querySplit = queryString.split('&'); // split parameters
    var values = [];
    
    // get exact values of query
    for (var i = 0; i < querySplit.length; i++) {
        temp = querySplit[i].split('=');
        values[i] = temp[1];
    }

    // check values if they're correct
    // values are : [0] = banner, [1] = noOfRolls, [2] = bgNo
    if(!(values[0] == 'classic' || values[0] == 'limited')
            || !(values[1] == '1' || values[1] == '10')) {
        backToIndex();
    } else {
        // rename values to avoid confusion
        var banner = values[0];
        var noOfRolls = values[1];
        var bgNo = values[2];

        // change background
        changeBackground(bgNo);

        // start summon
        summonSpiritron(banner, noOfRolls);
    }
}

function backToIndex() {
    $('body').addClass('fadeOutDownBig');
    $('body').css('overflow', 'hidden');
    setTimeout(back, 1500);
}

function back() {
    window.location.href = "../index.html"
}

function changeBackground(bgNo) {
    var bgUrl = "url('../assets/images/bg/BG_" + bgNo + ".png')";
    $('body').css('background-image', bgUrl);

    // if background is to dark, lighten text
    var darkbgs = [3, 5, 8];
    if(darkbgs.includes(parseInt(bgNo))) {
        lightenTexts('#disclaimer');
        console.log("Changing text color...");
    }
}

function lightenTexts(element) {
    $(element).css('color', '#fff');
}

function autoOverflow() {
    $('body').css('overflow', 'auto');
}

function createElement(type, id, className, content, hierarchy, parent) 
{
    var element = document.createElement(type);
	element.setAttribute('id', id);
	element.setAttribute('class', className);
	element.innerHTML = content;

	if(hierarchy=='parent') // if element is parent, append straight
		document.body.appendChild(element);
	else if(hierarchy=='child') // if not, append to parent
		document.getElementById(parent).appendChild(element);
}

// SUMMON FUNCTIONS

function getBanner(banner) {
    // set arrays for banner
    var classic = [
		
        
		
		////////////////// 3* Servant Zone ////////////////////////////////////////
		
		
		
	// 3* Saber
		
		{"type": "Servant", "name": "Rance", "class": "Saber", "rarity": 3},
		{"type": "Servant", "name": "Luka", "class": "Saber", "rarity": 3},
		{"type": "Servant", "name": "Geralt of Rivia", "class": "Saber", "rarity": 3},
	// 3* Archer
		
		{"type": "Servant", "name": "Zoomer", "class": "Archer", "rarity": 3},
		{"type": "Servant", "name": "Joshua Graham", "class": "Archer", "rarity": 3},
	// 3* Lancer
		
		{"type": "Servant", "name": "Alucard", "class": "Lancer", "rarity": 3},
		{"type": "Servant", "name": "Drake Bell", "class": "Lancer", "rarity": 3},
		{"type": "Servant", "name": "Haze Stratos", "class": "Lancer", "rarity": 3},
	// 3* Caster
		
		
		{"type": "Servant", "name": "Kinzo Ushiromiya", "class": "Caster", "rarity": 3},
		{"type": "Servant", "name": "Sou Hiyori", "class": "Caster", "rarity": 3},
	// 3* Rider
		
		{"type": "Servant", "name": "Eri", "class": "Rider", "rarity": 3},
		{"type": "Servant", "name": "Arthur Morgan", "class": "Rider", "rarity": 3},
		{"type": "Servant", "name": "Boomer", "class": "Rider", "rarity": 3},
		
	// 3* Assassin
		
		{"type": "Servant", "name": "The Janitor", "class": "Assassin", "rarity": 3},
		{"type": "Servant", "name": "Hisoka", "class": "Assassin", "rarity": 3},
		
	// 3* Berserker
		
        {"type": "Servant", "name": "Koga Narushima", "class": "Berserker", "rarity": 3},
		
	// 3* Ruler
		
		
        {"type": "Servant", "name": "OP", "class": "Ruler", "rarity": 3},
		
	// 3* Avenger
		
		
        {"type": "Servant", "name": "Kevin Nash", "class": "Ruler", "rarity": 3},
		
		////////////////// 3* Servant Zone ////////////////////////////////////////
		
		
		
		////////////////// 4* Servant Zone ////////////////////////////////////////
		
	// 4* Saber
		
		{"type": "Servant", "name": "Rean Schwarzer", "class": "Saber", "rarity": 4},
		{"type": "Servant", "name": "Adam Jensen", "class": "Saber", "rarity": 4},
		
	// 4* Archer
	
		{"type": "Servant", "name": "EMIYA", "class": "Archer", "rarity": 4},
		
	// 4* Lancer
		
        {"type": "Servant", "name": "Makoto Yuki", "class": "Lancer", "rarity": 4},
		{"type": "Servant", "name": "Nagito Komaeda", "class": "Lancer", "rarity": 4},
		
	// 4* Caster
		
        {"type": "Servant", "name": "Raidou Kuzunoha", "class": "Caster", "rarity": 4},
		{"type": "Servant", "name": "Battler Ushiromiya (S1)", "class": "Caster", "rarity": 4},
		
	// 4* Rider
		
        {"type": "Servant", "name": "Fred Jones", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Tatsuya Suou", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Extra", "class": "Rider", "rarity": 4},
		{"type": "Servant", "name": "Miyao Mitake", "class": "Rider", "rarity": 4},
		
	// 4* Assassin
	
		{"type": "Servant", "name": "Agent 47", "class": "Assassin", "rarity": 4},
		
	// 4* Berserker
		
		
		{"type": "Servant", "name": "V Rage Guy", "class": "Berserker", "rarity": 4},
		
	// 4* Ruler
		
		
		{"type": "Servant", "name": "Vince McMahon", "class": "Ruler", "rarity": 4},
		
	// 4* Avenger
		
		{"type": "Servant", "name": "Nagito Komaeda (Alter)", "class": "Avenger", "rarity": 4},
		
		////////////////// 4* Servant Zone ////////////////////////////////////////
		
		
		
		
		////////////////// 5* Servant Zone ////////////////////////////////////////
		
	// 5* Saber
		
		
		{"type": "Servant", "name": "Vergil", "class": "Saber", "rarity": 5},	
		
	// 5* Archer
		
		{"type": "Servant", "name": "HUNK", "class": "Archer", "rarity": 5},	
	
	// 5* Lancer
		
		{"type": "Servant", "name": "Clownmaeda", "class": "Lancer", "rarity": 5},
		
	// 5* Caster
		
		
		{"type": "Servant", "name": "V", "class": "Caster", "rarity": 5},
		
	// 5* Rider
	
		{"type": "Servant", "name": "Red", "class": "Rider", "rarity": 5},
		
	// 5* Assassin
	
		{"type": "Servant", "name": "Agent 47 (BIG)", "class": "Assassin", "rarity": 5},
		
	// 5* Berserker
		
		{"type": "Servant", "name": "Hank J Wimbleton", "class": "Berserker", "rarity": 5},
		
	// 5* Ruler
		
		{"type": "Servant", "name": "Battler Ushiromiya (S2)", "class": "Ruler", "rarity": 5},
		
	// 5* Avenger
	
		{"type": "Servant", "name": "BANS", "class": "Avenger", "rarity": 5},
		
		////////////////// 5* Servant Zone ////////////////////////////////////////
		
		
	
		
		// 3 Star CE's
		
		{"type": "CE", "name": "Reasonable Explanation", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "Torque Observation", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Headcrank Kino", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Audience Pop", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Complex Doll", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "Joecoins", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "Junk", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "Autism Spin", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "Air Conditioning", "class": "CE", "rarity": 3},
		{"type": "CE", "name": "KWAB", "class": "CE", "rarity": 3},
		
		// 4 Star CE's
		
		
		{"type": "CE", "name": "Pure Strikes", "class": "CE", "rarity": 4},
		{"type": "CE", "name": "Extraction Point", "class": "CE", "rarity": 4},
		{"type": "CE", "name": "Shitpost", "class": "CE", "rarity": 4},
		{"type": "CE", "name": "Seething", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "NET Truck", "class": "CE", "rarity": 4},
		// 5 Star CE's
		
		{"type": "CE", "name": "Valued Briefcase", "class": "CE", "rarity": 5},
		{"type": "CE", "name": "Deadly Word", "class": "CE", "rarity": 5},
		{"type": "CE", "name": "The Final Rumble", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "7-Year Obsession", "class": "CE", "rarity": 5}
    ];
    var limited = [
        {"type": "Servant", "name": "Gilgamesh", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Sakata Kintoki", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Okita", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Scathach", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Mysterious Heroine X", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Brynhild", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Nero Claudius (Bride)", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Ryougi Shiki (Saber)", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Amakusa Shirou", "class": "Ruler", "rarity": 5},
        {"type": "Servant", "name": "Edmond Dantes", "class": "Avenger", "rarity": 5},
        {"type": "Servant", "name": "Jeanne d'Arc (Alter)", "class": "Avenger", "rarity": 5},
        {"type": "Servant", "name": "Iskandar", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Shuten-Douji", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Minamoto-no-Raikou", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Leonardo Da Vinci", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Tamamo-no-Mae", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Altria Pendragon", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Marie Antoinette", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Anne Bonny & Mary Read (Archer)", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Martha", "class": "Ruler", "rarity": 4},
        {"type": "Servant", "name": "Mordred", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Kiyohime", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Illyasviel von Einzbern", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Cleopatra", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Ishtar", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Merlin", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Elisabeth Bathory (Brave)", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Oda Nobunaga", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Chloe von Einzbern", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Jeanne d'Arc Alter Santa Lily", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Altria Pendragon (Santa Alter)", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Sakata Kintoki", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Elisabeth Bathory (Halloween)", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Holy Grail", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Ryougi Shiki", "class": "Assassin", "rarity": 4},
        {"type": "Servant", "name": "Scathach", "class": "Assassin", "rarity": 4}
    ];

    limited = limited.concat(classic);

    // return banner
    return (banner=='classic') ? classic : limited;
}

function separatePool(summonPool) {
    var servantPool = [];
    var cePool = [];

    var servantCount = 0, ceCount = 0;
    for(var i = 0; i < summonPool.length; i++) {
        if(summonPool[i].type == "Servant") {
            servantPool[servantCount] = summonPool[i];
            servantCount++;
        } else if(summonPool[i].type == "CE") {
            cePool[ceCount] = summonPool[i];
            ceCount++;
        }
    }

    return {"servants": servantPool, "ces": cePool};
}

function summonSpiritron(banner, noOfRolls) {
    // get summon pool from banner type
    var summonPool = getBanner(banner);

    // separate pool
    var separatedPool = separatePool(summonPool);
    var servantPool = separatedPool.servants;
    var cePool = separatedPool.ces;

    // if roll is not yolo, get guaranteed place in result
    var position = 99;
    if(noOfRolls > 1) {
        position = Math.floor(Math.random() * 9);
        console.log("Guaranteed: Summon #" + (position + 1) );
        console.log(" ");
    }

    // determine card type and rarity
    var typeAndRarity = [];
    for(var i = 0; i < noOfRolls; i++) {
        var guaranty = false;
        if(position == i) { 
            guaranty = true;
        }

        console.log("Summon #" + (i + 1));
        typeAndRarity[i] = rollCard(guaranty);
    }

    // summon spirit origins
    var spiritOrigins = [];
    for(var i = 0; i < noOfRolls; i++) {
        if(typeAndRarity[i].type == "Servant") {
            spiritOrigins[i] = rollSpiritOrigin(typeAndRarity[i].rarity, servantPool);
        } else if(typeAndRarity[i].type == "CE") {
            spiritOrigins[i] = rollCraftEssence(typeAndRarity[i].rarity, cePool);
        }
    }

    console.log("Summon Details");
    for(var i = 0; i < noOfRolls; i++) {
        console.log((i + 1) + " : " + spiritOrigins[i].name + ", " + spiritOrigins[i].rarity + "*"
            + " " + spiritOrigins[i].type);
    }
    console.log(" ");

    // display result
    displaySummon(spiritOrigins);

    console.log("Welcome to fgoSaltFlush! I made this for myself because " +
        "I like rolling, I'm just so unlucky irl that fake rolls desalinate me." +
        " Anyway, I hope that's the case with you too! Hope you had fun!");
    console.log(" ");
    console.log("Please note that fgoSaltFlush is not accurate. I tried to make it as close as possible, " +
        "but I think it'll never be 100% similar to F/GO.");
    console.log("I just rely on Math.random().");
}

function rollCard(guaranty) {
    var cardType = ""; var rarity = 0;
    var rng = Math.random();
    console.log("Random Number: " + rng);
    
    var rngDec = rng;
    if(guaranty) {
        if((rngDec -= 0.01) < 0) {
            cardType = "Servant";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SSR");
            console.log(" ");
        } else if((rngDec -= 0.03) < 0) {
            cardType = "Servant";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SR");
            console.log(" "); 
        } else if((rngDec -= 0.04) < 0) {
            cardType = "CE";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SSR");
            console.log(" ");
        } else {
            cardType = "CE";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("[Since Servant/CE R are excluded in guaranteed, " +
                        "I added the 80% to CE SR giving it 92% chance of dropping.]");
            console.log(rng + " - 0.92 = " + (rng -= 0.92));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SR");
            console.log(" ");
        }
    } else {
        if((rngDec -= 0.01) < 0) {
            cardType = "Servant";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SSR");
            console.log(" ");
        } else if((rngDec -= 0.03) < 0) {
            cardType = "Servant";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SR");
            console.log(" ");
        } else if((rngDec -= 0.40) < 0) {
            cardType = "Servant";
            rarity = 3;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant R");
            console.log(" ");
        } else if((rngDec -= 0.04) < 0) {
            cardType = "CE";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SSR");
            console.log(" ");
        } else if((rngDec -= 0.12) < 0) {
            cardType = "CE";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.12 = " + (rng -= 0.12));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SR");
            console.log(" ");
        } else {
            cardType = "CE";
            rarity = 3;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.12 = " + (rng -= 0.12));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("CE R?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE R");
            console.log(" ");
        }
    }
    
    return {"type": cardType, "rarity": rarity};
}

function rollSpiritOrigin(rarity, pool) {
    var spiritOrigin = "";

    if(rarity == 5) { // 5 star
        var fiveStar = splitRarity(pool, 5);
        var originNo = fetchOrigin(fiveStar);

        spiritOrigin = fiveStar[originNo];
    } else if(rarity == 4) { // 4 star
        var fourStar = splitRarity(pool, 4);
        var originNo = fetchOrigin(fourStar);

        spiritOrigin = fourStar[originNo];
    } else if(rarity == 3) { // 3 star
        var threeStar = splitRarity(pool, 3);
        var originNo = fetchOrigin(threeStar);

        spiritOrigin = threeStar[originNo];
    }

    return spiritOrigin;
}

function rollCraftEssence(rarity, pool) {
    var craftEssence = "";

    if(rarity == 5) { // 5 star
        var fiveStar = splitRarity(pool, 5);
        var originNo = fetchOrigin(fiveStar);

        craftEssence = fiveStar[originNo];
    } else if(rarity == 4) { // 4 star
        var fourStar = splitRarity(pool, 4);
        var originNo = fetchOrigin(fourStar);

        craftEssence = fourStar[originNo];
    } else if(rarity == 3) { // 3 star
        var threeStar = splitRarity(pool, 3);
        var originNo = fetchOrigin(threeStar);

        craftEssence = threeStar[originNo];
    }

    return craftEssence;
}

function splitRarity(pool, stars) {
    var starBasedPool = [];

    var poolCount = 0;
    for(i = 0; i < pool.length; i++) {
        if(pool[i].rarity == stars) {
            starBasedPool[poolCount] = pool[i];
            poolCount++;
        }
    }

    return starBasedPool;
}

function fetchOrigin(pool) {
    var max = pool.length - 1;
    var min = 0;
    
    return Math.floor(Math.random() * max) + min;
}

// ANIMATIONS
function displaySummon(spiritOrigins) {
    spiritOriginList = spiritOrigins;
    setTimeout(summonfx, 1500);
    summonfxInterval = setInterval(summonfx, 7900);

    if(spiritOriginList.length > 1) {
        summaryDisplayTimeout = setTimeout(displaySummary, 80000);
    } else {
        summaryDisplayTimeout = setTimeout(displaySummary, 8250);
    }
    
}

function portraitUrl(name) {
    var filename = name.split(' ').join('_');
    filename = filename.split('(').join('');
    filename = filename.split(')').join('');
    filename = filename.split(':').join('');
    filename = filename.split('/').join('_');
    filename = filename.split("'").join('');
    filename = filename.toLowerCase();
    return filename;
}

function summonfx() {
    flipClassCard(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class);
    setImage(spiritOriginList[ccindex].type, spiritOriginList[ccindex].class, 
        spiritOriginList[ccindex].name);
    setFrame(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class);
    setClassAndName(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class, spiritOriginList[ccindex].name);
    setTimeout(cardFadeOut(spiritOriginList.length), 200);
}

function flipClassCard(type, rarity, cclass) {
   var classCard = "../assets/images/frames";
   var spark = Math.floor(Math.random() * 100) + 1;
   if(type == "CE") {
       if(rarity > 3) {
           classCard = classCard.concat("/gold/back1.png");
           classCard = "url('" + classCard + "')";
       } else {
           classCard = classCard.concat("/silver/back1.png");
           classCard = "url('" + classCard + "')";
       }
   } else {
       if(rarity > 3) {
           spark -=  25; // will spark if 25 and below
           if(spark < 0) {
               classCard = classCard.concat("/silver/");
               classCard = classCard.concat(cclass.toLowerCase());
               classCard = classCard.concat(".png")
               classCard = "url('" + classCard + "')";

               $('.servant-card').css('background-image', classCard);
               $('.servant-card').addClass('flipInY');
               $('.servant-card').fadeIn(750, function() {
                   classCard = "../assets/images/frames";
                   classCard = classCard.concat("/gold/");
                   classCard = classCard.concat(cclass.toLowerCase());
                   classCard = classCard.concat(".png")
                   classCard = "url('" + classCard + "')";
                   $('.servant-card').removeClass('flipInY');
                   $('.servant-card').addClass('flash infinite');
                   $('.servant-card').css('background-image', classCard);
                   $('.servant-card').removeClass('infinite');
               })
               
               $('.servant-card').delay(1250).fadeOut(200);
               return;
            } else {
                classCard = classCard.concat("/gold/");
            }
       } else {
           classCard = classCard.concat("/silver/");
       }
       
       classCard = classCard.concat(cclass.toLowerCase());
       classCard = classCard.concat(".png")
       classCard = "url('" + classCard + "')";
   }

   $('.servant-card').removeClass('flash');
   $('.servant-card').css('background-image', classCard);
   $('.servant-card').addClass('flipInY');
   $('.servant-card').fadeIn(250);
   $('.servant-card').delay(1500).fadeOut(500);
}

function setImage(type, cclass, name) {
    var image = "../assets/images/summon";
    var filename = portraitUrl(name);

    if(type == "CE") {
        image = image.concat("/ce/portrait/" + filename + ".jpg");
        
        // adjust size
        $('.servant-portrait').css('height', '48.92vh');
    } else {
        image = image.concat("/servants/portrait/" + cclass.toLowerCase());
        image = image.concat("/" + filename + ".png");

        // adjust size
        $('.servant-portrait').css('height', '48vh');
    }
    image = "url('" + image + "')";

    $('.servant-portrait').css('background-image', image);
    $('.servant-portrait').delay(2500).fadeIn(300);
    $('.servant-portrait').delay(2750).fadeOut(500);
}

function setFrame(type, rarity) {
    var frame = "../assets/images/frames";

    if(type == "CE") {
        if(rarity > 3) {
            frame = frame.concat("/gold/essence_card_0");
        } else {
            frame = frame.concat("/silver/essence_card_0");
        }

        frame = frame.concat(rarity);
        frame = frame.concat(".png");
        frame = "url('" + frame + "')";

        $('.servant-frame').css('height', '48vh');
        $('.servant-frame').css('margin-top', '-47.9vh');
    } else {
        if(rarity > 3) {
            frame = frame.concat("/gold/card_0");
        } else {
            frame = frame.concat("/silver/card_0");
        }

        frame = frame.concat(rarity + ".png");
        frame = "url('" + frame + "')";

        $('.servant-frame').css('height', '48vh');
        $('.servant-frame').css('margin-top', '-48vh');
    }

    $('.servant-frame').css('background-image', frame);
    $('.servant-frame').delay(2500).fadeIn(300);
    $('.servant-frame').delay(2750).fadeOut(500);
}

function setClassAndName(type, rarity, cclass, name) {
    if(type == "CE") {
        if(name.length <= 20) {
            $('.class-name').text(name);
            $('.class-name').delay(2500).fadeIn(300);
            $('.class-name').delay(2750).fadeOut(500);
        } else {
            $('.servant-name').text(name);
            $('.servant-name').css('font-size', '2vh')
            $('.servant-name').css('margin-top', '-8vh')
            $('.servant-name').delay(2500).fadeIn(300);
            $('.servant-name').delay(2750).fadeOut(500);
        }
    } else {
        var classIcon = '../assets/images/frames/class/';

        if(rarity > 3) {
            classIcon = classIcon.concat(cclass.toLowerCase() + "_gold.png");
            classIcon = "url('" + classIcon + "')";
        } else {
            classIcon = classIcon.concat(cclass.toLowerCase() + "_silver.png");
            classIcon = "url('" + classIcon + "')";
        }

        // change class icon
        $('.servant-class').css('background-image', classIcon);
        $('.servant-class').delay(2500).fadeIn(300);
        $('.servant-class').delay(2750).fadeOut(500);

        // change class name
        $('.class-name').text(cclass);
        $('.class-name').delay(2550).fadeIn(300);
        $('.class-name').delay(2750).fadeOut(500);

        $('.servant-name').text(name);
        $('.servant-name').css('font-size', '1.8vh')
        $('.servant-name').css('margin-top', '-1.5vh')
        $('.servant-name').delay(2500).fadeIn(300);
        $('.servant-name').delay(2750).fadeOut(500);
    }
}

function cardFadeOut(noOfRolls) {
    ccindex++;
    $('#rolls').val(ccindex);

    if(ccindex >= noOfRolls) {
        ccindex = 0;
        clearInterval(summonfxInterval);
    }
}

function skipSummon() {
    $('#skipButton').prop('disabled', true);

    $('.servant-card').css('display', 'none');
    $('.servant-portrait').delay(2250).css('display', 'none');
    $('.servant-frame').delay(2250).css('display', 'none');
    $('.class-name').delay(2250).css('display', 'none');
    $('.servant-name').delay(2250).css('display', 'none');

    setTimeout(function() {
        clearInterval(summonfxInterval);
        clearTimeout(summaryDisplayTimeout);
        displaySummary();
    }, 8000);
    
}

function displaySummary() {
    for(var i = 0; i < spiritOriginList.length; i++) {
        var url = "", filename = "", cclass = "";
        if(spiritOriginList[i].rarity > 3) {
            // change thumb bg
            url = "../assets/images/frames/gold/gold_bg.png";
            $(".thumb-bg-" + (i + 1)).attr('src', url);
            $(".thumb-bg-" + (i + 1)).fadeIn(800);

            // change frame
            if(spiritOriginList[i].type == "Servant") {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/servants/thumb/";
                url = url + cclass.toLowerCase() + "/" + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/gold/servant.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);

                // change icon
                url = "../assets/images/frames/class/";
                url = url + cclass.toLowerCase() + "_" + "goldborder.png";
                $(".thumb-class-"+ (i + 1)).attr('src', url);
                $(".thumb-class-"+ (i + 1)).fadeIn(800);
            } else {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/ce/thumb/";
                url = url + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/gold/essence.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);
            }
        } else {
            // change thumb bg
            url = "../assets/images/frames/silver/silver_bg.png";
            $(".thumb-bg-" + (i + 1)).attr('src', url);
            $(".thumb-bg-" + (i + 1)).fadeIn(800);

            // change frame
            if(spiritOriginList[i].type == "Servant") {
                // change portrait
                element = ".thumb-portrait-"+ (i + 1);
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/servants/thumb/";
                url = url + cclass.toLowerCase() + "/" + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/silver/servant.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);

                // change icon
                url = "../assets/images/frames/class/";
                url = url + cclass.toLowerCase() + "_" + "silverborder.png";
                $(".thumb-class-"+ (i + 1)).attr('src', url);
                $(".thumb-class-"+ (i + 1)).fadeIn(800);
            } else {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/ce/thumb/";
                url = url + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/silver/essence.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);
            }
        }
    }

    $('.summon-panel').css('overflow', 'auto');

    createElement('p', 'rollAgain', 'w-50 btn animated slideInDown bg-danger mt-3 mx-auto text-white shadow-sm',
        "Roll Again", 'child', 'alertSpace');
    $('#rollAgain').click(function() {
        location.reload();
    });
    $('#rollAgain').addClass('show');
    resizeFrames();
}

function resizeFrames() {
    var width = window.screen.width;
    var height = window.screen.height;

    for(var i = 1; i <= 10; i++) {
        if(width == 375 && height == 812) {
            $('.thumb-frame-' + i).css('height', '11.6vh');
            $('.thumb-frame-' + i).css('margin-top', '-12vh');

            $('.thumb-class-' + i).css('height', '3vh');
            $('.thumb-class-' + i).css('width', '3vh');
            $('.thumb-class-' + i).css('margin-top', '-26vh');

            return;
        }

        if(width == 1024 && height == 1366) {
            $('.thumb-frame-' + i).css('height', '8vh');
            $('.thumb-frame-' + i).css('margin-top', '-8vh');

            $('.thumb-class-' + i).css('height', '2.5vh');
            $('.thumb-class-' + i).css('width', '2.5vh');
            $('.thumb-class-' + i).css('margin-top', '-16.6vh');

            return;
        }

        if(width <= 320) {
            $('.thumb-frame-' + i).css('height', '13vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-31vh');

            return;
        }
        
        if(width > 320 && width <= 375) {
            $('.thumb-frame-' + i).css('height', '14vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-32vh');

            return;
        }
        
        if(width > 375 && width <= 414) {
            $('.thumb-frame-' + i).css('height', '15vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-32vh');

            return;
        } 
        
        if(width > 414 && width <= 768) {
            $('.thumb-frame-' + i).css('height', '10vh');
            $('.thumb-frame-' + i).css('margin-top', '-11vh');

            $('.thumb-class-' + i).css('height', '3vh');
            $('.thumb-class-' + i).css('width', '3vh');
            $('.thumb-class-' + i).css('margin-top', '-22vh');

            return;
        }

        if(width > 768) {
            $('.thumb-frame-' + i).css('height', '14vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-29.6vh');

            return;
        }
    }
}

// ROOT
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    onPageLoad();
    setTimeout(autoOverflow, 2000);
});