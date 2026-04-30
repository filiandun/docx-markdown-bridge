import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { resolveFolderUri } from '../utils/resolveUri';

export async function createDocx(context: vscode.ExtensionContext, uri?: vscode.Uri) {
    const targetUri = await resolveFolderUri(uri);
    if (!targetUri) { return; }
    
    try {
        const stat = await fs.promises.stat(targetUri.fsPath);
        const folder = stat.isDirectory() ? targetUri.fsPath: path.dirname(targetUri.fsPath);

        const emptyDocxPath = context.asAbsolutePath('resources/empty.docx');
        const newDocxFile = path.join(targetUri.fsPath, ' .docx');
        
        await fs.promises.copyFile(emptyDocxPath, newDocxFile);
        
        const newDocxUri = vscode.Uri.file(newDocxFile);
        await vscode.commands.executeCommand("revealInExplorer", newDocxUri);
        await vscode.commands.executeCommand("renameFile", newDocxUri);
    }
    catch (err: any) {
        vscode.window.showErrorMessage(`DMB: Error: ${err.message || err}`);
    }
}