import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { resolveFolderUri } from '../utils/resolveUri';

export async function createDocx(context: vscode.ExtensionContext, uri?: vscode.Uri) {
	const targetUri = await resolveFolderUri(uri);
	if (!targetUri) {
		return;
	}

	try {
		const stat = await fs.promises.stat(targetUri.fsPath);
		const folder = stat.isDirectory() ? targetUri.fsPath : path.dirname(targetUri.fsPath);

		const emptyDocxPath = context.asAbsolutePath('resources/empty.docx');
		const newDocxFile = await createUniqueDocxPath(folder);

		await fs.promises.copyFile(emptyDocxPath, newDocxFile);

		const newDocxUri = vscode.Uri.file(newDocxFile);
		await vscode.commands.executeCommand('revealInExplorer', newDocxUri);
		await vscode.commands.executeCommand('renameFile', newDocxUri);
	} catch (err: any) {
		vscode.window.showErrorMessage(`DME: Error: ${err.message || err}`);
	}
}

async function createUniqueDocxPath(folder: string): Promise<string> {
	const baseName = 'new-document';

	for (let index = 0; index < 1000; index++) {
		const suffix = index === 0 ? '' : `-${index}`;
		const candidate = path.join(folder, `${baseName}${suffix}.docx`);

		try {
			await fs.promises.access(candidate);
		} catch {
			return candidate;
		}
	}

	throw new Error('DME: Unable to create a unique .docx file name');
}
