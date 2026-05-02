import * as path from 'path';
import * as vscode from 'vscode';

export async function resolveFileUri(uri?: vscode.Uri): Promise<vscode.Uri | undefined> {
	if (uri?.scheme === 'file') {
		return uri;
	}

	const editor = vscode.window.activeTextEditor;

	if (editor) {
		return editor.document.uri;
	}

	const uris = await vscode.window.showOpenDialog({
		canSelectFiles: true,
		canSelectFolders: false,
		canSelectMany: false,
	});

	return uris?.[0];
}

export async function resolveFolderUri(uri?: vscode.Uri): Promise<vscode.Uri | undefined> {
	if (uri?.scheme === 'file') {
		const stat = await vscode.workspace.fs.stat(uri);
		return stat.type === vscode.FileType.Directory ? uri : vscode.Uri.file(path.dirname(uri.fsPath));
	}

	const editor = vscode.window.activeTextEditor;
	if (editor) {
		return vscode.Uri.file(path.dirname(editor.document.uri.fsPath));
	}

	const uris = await vscode.window.showOpenDialog({
		canSelectFiles: false,
		canSelectFolders: true,
		canSelectMany: false,
	});

	return uris?.[0];
}