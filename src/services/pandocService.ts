import { exec } from 'child_process';

import * as vscode from 'vscode';

export async function convertPandoc(inputFile:string, outputFile:string) {
    const cmd = `pandoc "${inputFile}" -o "${outputFile}"`;

    await runCommand(cmd);
}

function runCommand(cmd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(stderr || error.message));
                return;
            }
            resolve();
        });
    });
}