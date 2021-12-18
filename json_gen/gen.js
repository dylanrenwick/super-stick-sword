const recipeTemplate = `{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        "SSS",
        "SSS",
        "SSS"
    ],
    "key": {
        "S": {
            "item": "-=-input-=-"
        }
    },
    "result": {
        "item": "-=-output-=-",
        "count": 1
    }
}
`;
const modelTemplate = `{
    "parent": "item/generated",
    "textures": {
        "layer0": "-=-modid-=-:item/-=-texture-=-"
    }
}
`;

const modid = "supersticksword";
const depths = ["single", "double", "triple", "quadruple", "quintuple", "hextuple", "septuple", "octuple"];

const langRecordTemplate = `    "-=-type-=-.-=-modid-=-.-=-key-=-": "-=-val-=-",`;
const staticLangRecords = `    "item.${modid}.super_stick_sword": "Stick Sword"
`;

function applyTemplate(template, replace) {
    let applied = template.slice();
    for (let key in replace) {
        let templateRegex = new RegExp(`-=-${key}-=-`, 'g');
        applied = applied.replaceAll(templateRegex, replace[key]);
    }
    return applied;
}

function getItem(depth) {
    return depth >= 0
        ? `${modid}:${depths[depth]}_compressed_stick`
        : 'minecraft:stick';
}

function getItemName(depth) {
    return `${depths[depth]}_compressed_stick`;
}

function getEnglishName(depth) {
    let name = "Compressed Stick";
    if (depth > 0) {
        let depthName = depths[depth];
        depthName = depthName.substring(0, 1).toUpperCase() + depthName.substring(1);
        name = `${depthName}-${name}`;
    }
    return name;
}

function genModel(depth) {
    return applyTemplate(modelTemplate, {"texture": getItemName(depth), modid});
}

function genRecipe(depth) {
    return applyTemplate(recipeTemplate, {
        "input": getItem(depth - 1),
        "output": getItem(depth)
    });
}

function genLang(langFile, depth) {
    let row = applyTemplate(langRecordTemplate, {
        type: "item",
        key: getItemName(depth),
        val: getEnglishName(depth),
        modid
    });
    langFile.contents += row + "\n";
}

const fs = require('fs');
const resources = "../src/main/resources"

function modelPath() { return `${resources}/assets/${modid}/models/item/`; }
function recipePath() { return `${resources}/data/${modid}/recipes/`; }
function langPath() { return `${resources}/assets/${modid}/lang/`; }

function writeModelToFile(depth) {
    let model = genModel(depth);
    let file = `${modelPath()}${getItemName(depth)}.json`;
    write(file, model);
}

function writeRecipeToFile(depth) {
    let recipe = genRecipe(depth);
    let file = `${recipePath()}${getItemName(depth)}.json`;
    write(file, recipe);
}

function writeLangToFile(langFile) {
    let file = `${langPath()}${langFile.name}.json`;
    let contents = langFile.contents + staticLangRecords + "}\n";
    write(file, contents);
}

function write(path, data) {
    console.log(data);
    console.log(`Writing to ${path}...`);
    fs.writeFileSync(path, data);
    console.log(`Write complete!`);
}

function startLang() {
    return {
        name: "en_us",
        contents: "{\n",
    };
}
  
function main() {
    let langFile = startLang();

    for (let depth = 0; depth < depths.length; depth++) {
        writeModelToFile(depth);
        console.log("\n");
        writeRecipeToFile(depth);
        genLang(langFile, depth);
        console.log("===================\n");
    }

    writeLangToFile(langFile);
}

main();