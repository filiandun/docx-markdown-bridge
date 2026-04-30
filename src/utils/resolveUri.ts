import * as vscode from 'vscode';

export async function resolveFileUri(uri?:vscode.Uri): Promise<vscode.Uri | undefined>  {
    if (uri) { return uri; } // uri будет null, если вызов происходит через command pallete (а не через menus)  
   
    const editor = vscode.window.activeTextEditor;

    if (editor) { // если редактор не дефолтный (кастомный с расширения? например), то editor будет null
        return editor.document.uri;
    }

    const uris = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false
    });

    return uris?.[0];
}

export async function resolveFolderUri(uri?: vscode.Uri): Promise<vscode.Uri | undefined> {
    if (uri) {
        const stat = await vscode.workspace.fs.stat(uri);
        return stat.type === vscode.FileType.Directory ? uri : vscode.Uri.file(uri.fsPath.substring(0, uri.fsPath.lastIndexOf("\\")));
    }

    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const fsPath = editor.document.uri.fsPath;
        return vscode.Uri.file(fsPath.substring(0, fsPath.lastIndexOf("\\")));
    }

    const uris = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
    });

    return uris?.[0];
}