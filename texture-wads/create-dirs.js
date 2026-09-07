#!/usr/bin/env node

import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import util from 'util';

const file = readFileSync('./wads.txt');

const lines = file.toString().split('\n');

const sections = [];

let currentSection = '';

lines.forEach(line => {
	if (line.startsWith('[')) {
		currentSection = line.slice(1, -1);
		sections.push({ name: currentSection, textures: [] });
	} else if (line.includes('=')) {
		sections.filter(it => it.name == currentSection)[0].textures.push(
			{ texture: line.split('=')[0], source: line.split('=')[1] });
	} else if (line) {
		sections.filter(it => it.name == currentSection)[0].textures.push(
			{ texture: line, source: line });
	}
});

// console.log(util.inspect(sections, { showHidden: false, depth: null })); // uncomment to examine structure
// console.log(process.env.FOLDER_PREFIX); // uncomment to check env var parsing
const allTexturesPath = process.env.ALL_TEXTURES_PATH != null ? process.env.ALL_TEXTURES_PATH : 'src/';
sections.forEach(section => {
	//console.log(section); // uncomment to examine structure
	const folderName = process.env.FOLDER_PREFIX != null
		? process.env.FOLDER_PREFIX + section.name : section.name;
	if (!existsSync(folderName)) {
		mkdirSync(folderName);
	}
	section.textures.forEach(texture => {
		try{
			copyFileSync(allTexturesPath + texture.source, folderName + '/' + texture.texture);
		} catch (e)	{
			if (texture.source.includes("_fbr")){
				try{
					copyFileSync(allTexturesPath + texture.source.replace("_fbr", ""), folderName + '/' + texture.texture);
					console.warn(`wad=${section.name}: ${texture.source} not found, but ${texture.source.replace("_fbr", "")} was`)
					return
				} catch (e)	{
				}
			} else {
				try{
					copyFileSync(allTexturesPath + texture.source.replace(".png", "_fbr.png"), folderName + '/' + texture.texture);
					console.warn(`wad=${section.name}: ${texture.source} not found, but ${texture.source.replace(".png", "_fbr.png")} was`)
					return;
				} catch (e)	{

				}
			}
			console.warn(`wad=${section.name}: ${texture.source} not found`);
		}
	});
});

