const { spawn } = require('child_process');

let shell;

function startuStreamer(opt) {
  if (shell) {
    return;
  }

  return new Promise((resolve, reject) => {
    const cmd = `ustreamer -d ${opt.device} -r ${opt.res} -f ${opt.fps} -p ${opt.stream_port} -s ${opt.ip_address} --exit-on-parent-death`; 
    shell = spawn('bash', ['-c', cmd]);

    shell.stdout.on('data', (data) => {
      console.log(data.toString('utf-8'));
    });

    shell.stderr.on('data', (data) => {
      const str = data.toString('utf-8');
      console.log(str);
      if (str.indexOf('Listening HTTP') > -1){ 
        console.log('ustreamer start')
        resolve(shell);
      }
    });

    shell.on('close', (code) => {
      reject(new Error(`ustreamer exited with code ${code}`));
    });
  });
}

module.exports.startuStreamer = startuStreamer;
