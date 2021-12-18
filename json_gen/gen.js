const recipeTemplate = `{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        "SSS",
        "SSS",
        "SSS"
    ],
    "key": {
        "S": {
            "tag": "-=-input-=-"
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

function genModel(depth) {
    return applyTemplate(modelTemplate, {"texture": getItemName(depth), modid});
}

function genRecipe(depth) {
    return applyTemplate(recipeTemplate, {
        "input": getItem(depth - 1),
        "output": getItem(depth)
    });
}

const fs = require('fs');
const resources = "../src/main/resources"

function modelPath() { return `${resources}/assets/${modid}/models/item/`; };
function recipePath() { return `${resources}/data/${modid}/recipes/`; };

function writeModelToFile(depth) {
    let model = genModel(depth);
    let file = `${modelPath()}${getItemName(depth)}.json`;
    console.log(model);
    console.log(`Writing to ${file}...`);
    fs.writeFileSync(file, model);
    console.log(`Write complete!`);
}
  
function main() {
    for (let depth = 0; depth < depths.length; depth++) {
        writeModelToFile(depth);
        console.log("\n");
        console.log(genRecipe(depth));
        console.log("===================\n");
    }
}

main();