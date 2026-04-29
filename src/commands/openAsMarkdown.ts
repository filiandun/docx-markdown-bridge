import * as vscode from 'vscode';
import * as path from 'path';

import { convertPandoc } from '../services/pandocService';
import { resolveUri } from '../utils/resolveUri';

export async function openAsMarkdown(uri?: vscode.Uri) {
    console.log('openAsMarkDown');
    
    const targetUri = await resolveUri(uri);
    if (!targetUri) { return; }
    
    const docxFilePath = targetUri!.fsPath;
    const mdFilePath = docxFilePath + ".md";

    try {
        await convertPandoc(docxFilePath, mdFilePath);

        const mdFileUri = vscode.Uri.file(mdFilePath);

        await vscode.commands.executeCommand('vscode.open', mdFileUri);

        vscode.window.showInformationMessage(`DMB: \'${path.basename(docxFilePath)}\' open as \'${path.basename(mdFilePath)}\'`);
    }
    catch (err: any) {
        vscode.window.showErrorMessage(`DMB: Error: ${err.message || err}`);
    }
}