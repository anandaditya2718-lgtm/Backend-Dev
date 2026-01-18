const os = require('os');
const fs = require('fs');

setInterval(() => {
    const cpu = os.cpus()[0].model;
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const platform = os.platform();

    const log = `
Time: ${new Date().toLocaleString()}
CPU: ${cpu}
Total Memory: ${totalMem}
Free Memory: ${freeMem}
Platform: ${platform}
-------------------------
`;

    fs.appendFile('system.log', log, (err) => {
        if (err) console.log(err);
    });

}, 5000);
