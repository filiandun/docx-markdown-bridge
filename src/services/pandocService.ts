import { execFile } from 'child_process';

export async function convertPandoc(inputFile: string, outputFile: string) {
	await runPandoc([inputFile, '-o', outputFile]);
}

function runPandoc(args: string[]): Promise<void> {
	return new Promise((resolve, reject) => {
		execFile('pandoc', args, { windowsHide: true }, (error, _stdout, stderr) => {
			if (error) {
				reject(new Error(stderr || error.message));
				return;
			}

			resolve();
		});
	});
}
