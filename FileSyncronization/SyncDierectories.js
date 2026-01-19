const fs = require("fs");
const path = require("path");
async function syncDirectories(sourceDir, targetDir) {
    try {
        await fs.promises.mkdir(targetDir, { recursive: true });
        const sourceFiles = await fs.promises.readdir(sourceDir);
        const targetFiles = new Set(await fs.promises.readdir(targetDir));
        for (const file of sourceFiles) {
            const srcPath = path.join(sourceDir, file);
            const tgtPath = path.join(targetDir, file);

            const stats = await fs.promises.stat(srcPath);

            if (stats.isFile() && !targetFiles.has(file)) {
                fs.createReadStream(srcPath)
                    .pipe(fs.createWriteStream(tgtPath))
                    .on("error", err => console.error("Sync Error:", err.message));

                console.log(`Copied: ${file}`);
            }
        }
        console.log("\nDirectory synchronization completed.");
    } catch (err) {
        console.error("Sync Failed:", err.message);
    }
}