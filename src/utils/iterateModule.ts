import { readdirSync } from 'fs';
import { join } from 'path';

export const iterateModule = async (
    dirName: string,
    callback: (module: any) => void
) => {
    const files = readdirSync(join(__dirname, '..', dirName)).filter(
        (file) => !file.endsWith('.map')
    );

    for (const file of files) {
        const module = await import(
            join('file://', __dirname, '..', dirName, file)
        );
        console.log(`👌 Loaded: ${module.default.data.name}`);
        callback(module.default);
    }
};
