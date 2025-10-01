#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  copyFileSync, 
  mkdirSync, 
  existsSync, 
  readFileSync, 
  writeFileSync,
  readdirSync,
  statSync
} from 'fs';
import { execSync } from 'child_process';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const root = join(dirName, '..');



function CopyDirectory(source, destination) 
{
    if(!existsSync(destination))
    {
        mkdirSync(destination, {recursive: true});
    }

    const items = readdirSync(source);

    for (const item of items)
    {
        if(item === 'node_modules' || item === '.git' || item === 'bin') continue;

        const sourcePath = join(source, item);
        const destinationPath = join(destination, item);

        if(statSync(sourcePath).isDirectory())
        {
            CopyDirectory(sourcePath, destinationPath);
        }
        else
        {
            copyFileSync(sourcePath, destinationPath);
        }
    }
}

function CreateProject(projectName)
{
    const targettedDirectory = join(process.cwd(), projectName);

    if(existsSync(targettedDirectory))
    {
        console.error(`Directory ${projectName} already exists. Please choose a different project name.`);
        process.exit(1);
    }

    mkdirSync(targettedDirectory, {recursive: true});

    CopyDirectory(root, targettedDirectory);

    try
    {
        process.chdir(targettedDirectory);
        execSync('npm install', {stdio: 'inherit'});
        console.log(`Project ${projectName} created successfully!`);
    }
    catch(err)
    {
        console.log('Error during project setup:', err);
    }


}

const projectName = process.argv[2];

if(!projectName)
{
    console.error('Please provide a project name.');
    console.log('Need to use npx american-sound-vue-template <project-name>');
    process.exit(1);
}


CreateProject(projectName);

